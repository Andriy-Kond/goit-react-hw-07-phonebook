import { fetchContacts } from '../services/fetch';

const { createSlice } = require('@reduxjs/toolkit');

const sliceAsyncThunk = createSlice({
  name: 'fetchContacts',
  initialState: {
    stateContacts: [],
    isLoading: false,
    error: null,
  },

  // * without createAsyncThunk():
  // reducers: {
  //   fetchContactsPending(state, action) {
  //     state.isLoading = true;
  //   },

  //   fetchContactsFetching(state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.stateContacts = action.payload;
  //   },

  //   fetchContactsError(state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },

  // * with createAsyncThunk():
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.stateContacts = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// * without createAsyncThunk():
// export const {
//   fetchContactsPending,
//   fetchContactsFetching,
//   fetchContactsError,
// } = sliceAsyncThunk.actions;

export default sliceAsyncThunk.reducer;
