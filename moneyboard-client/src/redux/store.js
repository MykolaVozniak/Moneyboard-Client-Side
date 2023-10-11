import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState // Додаємо початковий стан з localStorage
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;