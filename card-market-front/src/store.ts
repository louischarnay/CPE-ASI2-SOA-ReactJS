import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './stores/auth/authReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];