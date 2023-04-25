import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'services/fetch';
// import { fetchContactWithoutCreateAsyncThunk } from 'services/fetch';

// ^ Рефакторінг у Redux

export const App = () => {
  const dispatch = useDispatch();

  // Частини стану:
  const {
    stateContacts: contacts,
    isLoading,
    error,
  } = useSelector(store => store.storeAsyncThunk);

  const str = JSON.stringify(contacts, null, 2);
  // console.log('App >> str:', str);

  // Виклик "операції":
  useEffect(() => {
    // * Without createAsyncThunk()
    dispatch(fetchContacts());
    // dispatch(fetchContacts());
  }, [dispatch]);

  // Повертаю розмітку:
  return (
    <div className={css.mainContainer}>
      <h1>Phonebook</h1>
      <UserForm />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />

      {/* Without createAsyncThunk() */}
      {isLoading && <p>Contact Loading...</p>}
      {error && <p>Error: {error}</p>}
      {contacts.length > 0 && <p>contacts: {str}</p>}
      {/* Without createAsyncThunk() */}
    </div>
  );
};

// src/redux/selectors.js;
// export const getTasks = state => state.tasks;
// export const getStatusFilter = state => state.filters.status;
