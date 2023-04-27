// ^ Без використання localStorage:
import { configureStore } from '@reduxjs/toolkit';
import sliceFilterReducer from './sliceFilter';
import sliceAsyncThunkReducer from './sliceAsyncThunk';

export default configureStore({
  reducer: {
    // Задаємо будь-яке ім'я:
    storeFilter: sliceFilterReducer,
    storeAsyncThunk: sliceAsyncThunkReducer,
  },
});
