import PropTypes from 'prop-types';
import css from './Contacts.module.css';

// ^ Рефакторінг у Redux
import { useDispatch } from 'react-redux';
import { deleteContact } from 'services/fetch';

export function MarkupContacts({ name, number, id }) {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.listItem}>
      {name}: {number}
      <button className={css.deleteBtn} onClick={handleDeleteContact}>
        Delete
      </button>
    </li>
  );
}

MarkupContacts.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

// ! RTK Query:
// import PropTypes from 'prop-types';
// import css from './Contacts.module.css';

// // ^ Рефакторінг у RTK Query
// import { useDeleteContactMutation } from 'store/contactsRTKQueryApi';

// export function MarkupContacts({ name, number, id }) {
//   // * При використанні RTK Query:
//   // & Хуки Query повертають об'єкт
//   // const data = useGetContactsQuery();
//   // console.log('UserForm >> data:', data);
//   // const { isLoading, data: contacts, isError } = useGetContactsQuery();

//   // & Хуки Mutation повертають масив
//   const [deleteContact, delInfo] = useDeleteContactMutation();
//   // console.log('MarkupContacts >> delInfo:', delInfo);
//   // delInfo - це об'єкт

//   const handleDeleteContact = async () => {
//     const del = await deleteContact(id);
//     console.log('handleDeleteContact >> del.data:', del.data);
//     return del;
//   };

//   return (
//     <li className={css.listItem}>
//       {name}: {number}
//       <button className={css.deleteBtn} onClick={handleDeleteContact}>
//         {delInfo.isLoading ? <b>Deleting...</b> : 'Delete'}
//       </button>
//     </li>
//   );
// }

// MarkupContacts.propTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
