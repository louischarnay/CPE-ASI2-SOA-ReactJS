// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import globalReducer from './index'; // Importez globalReducer

// Créez le store Redux
const store = configureStore({
    reducer: globalReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Désactive la vérification des actions sérialisables pour redux-persist
        }),
});

// Créez persistor
const persistor = persistStore(store);

export { store, persistor };
