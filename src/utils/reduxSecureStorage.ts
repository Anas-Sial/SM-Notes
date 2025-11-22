import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

// Redux Persist compatible storage adapter for rn-secure-storage
const reduxSecureStorage = {
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

export default reduxSecureStorage
