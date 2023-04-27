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
      <button
        className={css.deleteBtn}
        onClick={handleDeleteContact}
      >
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
