import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // importa el almacenamiento local


const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  loginResponse: null, 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_RESPONSE':
      return {
        ...state,
        loginResponse: action.payload,
      };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };