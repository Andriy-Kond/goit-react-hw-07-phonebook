// ^ Без використання localStorage:
import { configureStore } from '@reduxjs/toolkit';
// імпорт при експорті default дозволяє назвати цей редюсер як завгодно:
import slicePhoneReducer from './SlicePhoneBook';
import sliceFilterReducer from './sliceFilter';
import sliceAsyncThunkReducer from './sliceAsyncThunk';

export default configureStore({
  reducer: {
    // Задаємо будь-яке ім'я:
    storeContacts: slicePhoneReducer,
    storeFilter: sliceFilterReducer,
    storeAsyncThunk: sliceAsyncThunkReducer,
  },
});
