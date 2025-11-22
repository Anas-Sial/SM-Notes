import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message'

import Routes from '@/navigation/Routes'
import store, { persistor } from "@/redux/store"
import { toastConfig } from '@/utils/toast'

const App = () => {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App