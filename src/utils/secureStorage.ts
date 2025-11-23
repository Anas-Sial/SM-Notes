import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  IS_FIRST_TIME: 'is_first_time',
  LANGUAGE: 'language',
  THEME: 'theme',
  FCM_TOKEN: 'fcm_token',
} as const

export type StorageKeyType = keyof typeof STORAGE_KEYS

// Typed secure storage for app-specific keys
export const secureStorage = {
  async setItem(key: StorageKeyType, value: string) {
    try {
      await RNSecureStorage.setItem(STORAGE_KEYS[key], value, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    } catch (error) {
      console.log('Error storing value:', error)
    }
  },

  async getItem(key: StorageKeyType) {
    try {
      return await RNSecureStorage.getItem(STORAGE_KEYS[key])
    } catch (error) {
      console.log(`Error retrieving value: ${STORAGE_KEYS[key]}`, error)
      return null
    }
  },

  async removeItem(key: StorageKeyType) {
    try {
      await RNSecureStorage.removeItem(STORAGE_KEYS[key])
    } catch (error) {
      console.log('Error removing value:', error)
    }
  },

  async setObject(key: StorageKeyType, value: object) {
    try {
      const jsonValue = JSON.stringify(value)
      await RNSecureStorage.setItem(STORAGE_KEYS[key], jsonValue, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    } catch (error) {
      console.log('Error storing object:', error)
    }
  },

  async getObject<T>(key: StorageKeyType): Promise<T | null> {
    try {
      const jsonValue = await RNSecureStorage.getItem(STORAGE_KEYS[key])
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.log('Error retrieving object:', error)
      return null
    }
  },

  async clearAll() {
    try {
      await RNSecureStorage.clear()
    } catch (error) {
      console.log('Error clearing all:', error)
    }
  }
}

// Redux Persist compatible storage adapter (for any key)
export const reduxSecureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await RNSecureStorage.setItem(key, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED
      })
    } catch (error) {
      console.error('Error storing value in secure storage:', error)
      throw error
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      const value = await RNSecureStorage.getItem(key)
      return value
    } catch (error: any) {
      // Silently handle "does not exist" errors (normal on first app launch)
      if (error?.message?.includes('does not exist')) {
        return null
      }
      // Log other unexpected errors
      console.error('Error retrieving value from secure storage:', error)
      return null
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await RNSecureStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing value from secure storage:', error)
      throw error
    }
  },

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await RNSecureStorage.getAllKeys()
      return keys || []
    } catch (error) {
      console.error('Error getting all keys from secure storage:', error)
      return []
    }
  },

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      const promises = keys.map(async (key) => {
        try {
          const value = await RNSecureStorage.getItem(key)
          return [key, value] as [string, string | null]
        } catch (error: any) {
          // Silently handle "does not exist" errors
          if (error?.message?.includes('does not exist')) {
            return [key, null] as [string, string | null]
          }
          throw error
        }
      })
      return await Promise.all(promises)
    } catch (error) {
      console.error('Error in multiGet from secure storage:', error)
      return []
    }
  },

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      const promises = keyValuePairs.map(([key, value]) =>
        RNSecureStorage.setItem(key, value, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
      )
      await Promise.all(promises)
    } catch (error) {
      console.error('Error in multiSet to secure storage:', error)
      throw error
    }
  },

  async multiRemove(keys: string[]): Promise<void> {
    try {
      const promises = keys.map((key) => RNSecureStorage.removeItem(key))
      await Promise.all(promises)
    } catch (error) {
      console.error('Error in multiRemove from secure storage:', error)
      throw error
    }
  },

  async clear(): Promise<void> {
    try {
      await RNSecureStorage.clear()
    } catch (error) {
      console.error('Error clearing secure storage:', error)
      throw error
    }
  },
}
