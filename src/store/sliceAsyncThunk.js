import { addContact, deleteContact, fetchContacts } from '../services/fetch';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const initialState = {
  stateContacts: [],
  isLoading: false,
  error: null,
};

// * Для скорочення коду extraReducers:
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// & під кожен fullFilled своя функція:
const fetchHandleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.stateContacts = action.payload;
};

const addHandleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.stateContacts.push(action.payload);
};

const deleteHandleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.stateContacts.findIndex(
    contact => contact.id === action.payload.id
  );
  state.stateContacts.splice(index, 1);
};
// * /Для скорочення коду extraReducers

// Оптимізація для скорочення назви у масиві функції isAnyOf([], callback)
// Створюємо масив з імен і додаємо до кожного якийсь статус, в залежності від ситуації
const namesArr = [fetchContacts, addContact, deleteContact];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceAsyncThunk = createSlice({
  name: 'fetchContacts',
  initialState,

  // ~ Новий метод: 'builder callback' notation
  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.pending, handlePending) // переніс у isAnyOf
      .addCase(fetchContacts.fulfilled, fetchHandleFulfilled)
      // .addCase(fetchContacts.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(addContact.pending, handlePending) // переніс у isAnyOf
      .addCase(addContact.fulfilled, addHandleFulfilled)
      // .addCase(addContact.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(deleteContact.pending, handlePending) // переніс у isAnyOf
      .addCase(deleteContact.fulfilled, deleteHandleFulfilled)
      // .addCase(deleteContact.rejected, handleRejected) // переніс у isAnyOf
      // isAnyOf працює як логічне АБО. Приймає масив.
      // Читається так: якщо хтось з перелічених з масиву, то роби колбек після коми

      // ??? Чомусь не працює!
      // ! Uncaught TypeError: matcher is not a function
      // .addMatcher(
      //   isAnyOf(
      //     [fetchContacts.pending, addContact.pending, deleteContact.pending],
      //     handlePending
      //   )
      // );
      // ??? Чомусь не працює!
      // ! Uncaught TypeError: matcher is not a function
      // .addMatcher(
      //   isAnyOf(
      //     [
      //       fetchContacts.rejected,
      //       addContact.rejected,
      //       deleteContact.rejected,
      //     ],
      //     handleRejected
      //   )
      // )

      // ??? З цим записом чомусь працює!!!
      .addMatcher(isAnyOf(...addStatusToName('pending'), handlePending))

      // ??? А цей запис чомусь не працює!
      // ! Uncaught TypeError: Cannot read properties of undefined (reading 'payload') --- sliceAsyncThunk.js:18 - тобто йде виклик з rejected, коли його йти не має.
      .addMatcher(isAnyOf(...addStatusToName('rejected'), handleRejected));
  },
});

export default sliceAsyncThunk.reducer;
