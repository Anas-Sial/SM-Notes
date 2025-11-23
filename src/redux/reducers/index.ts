import { combineReducers, Action } from "redux"
import { persistReducer } from "redux-persist"
import { reduxSecureStorage } from "@/utils/secureStorage"
import auth, { AuthState } from "./auth"
import todos from "./todos"

export interface RootState {
  auth: AuthState
  todos: ReturnType<typeof todos>
}

const persistConfig = {
  key: 'root',
  storage: reduxSecureStorage,
  whitelist: ['todos'],
}

const appReducer = combineReducers({
  auth,
  todos,
})

const rootReducer = (state: RootState | undefined, action: Action<any>) => {
  return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer)