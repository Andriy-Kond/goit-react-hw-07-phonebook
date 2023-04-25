import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchContactsError,
  fetchContactsFetching,
  fetchContactsPending,
} from 'store/sliceAsyncThunk';

axios.defaults.baseURL = 'https://6440c6e5792fe886a895ac5b.mockapi.io/';

// * without createAsyncThunk():
export const fetchContactWithoutCreateAsyncThunk = () => {
  return async dispatch => {
    try {
      dispatch(fetchContactsPending());
      const response = await axios.get('/contacts');
      dispatch(fetchContactsFetching(response.data));
    } catch (error) {
      dispatch(fetchContactsError(error.massage));
    }
  };
};

// * with createAsyncThunk():
// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   // payloadCreator(arg, thunkAPI)
//   // arg (_) - значення, яке було передано операції під час виклику.Використовується, наприклад, для передачі ідентифікаторів об'єктів при видаленні, тексту нотаток при створенні, тощо.
//   // thunkAPI - об'єкт, який передається в асинхронний генератор екшену в redux-thunk. Містить властивості та методи доступу до стору, відправки екшенів, а також деякі додаткові.
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
