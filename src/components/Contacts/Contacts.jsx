import css from './Contacts.module.css';

// ^ Рефакторінг у Redux
import { useDispatch, useSelector } from 'react-redux';
import { MarkupContacts } from './MarkupContacts';
import { selectContacts, selectError, selectFilter } from 'store/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'services/fetch';

export const Contacts = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  // Виклик "операції":
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Забираю лист контактів зі store Redux:
  // useSelector приймає функцію, яка приймає увесь store з Redux
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  // Фільтрація контактів:
  const filteredContacts = filter
    ? contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  // Рендер відфільтрованих контактів:
  return (
    <>
      {error && <h2>Error: {error}</h2>}

      {filteredContacts.length > 0 && (
        <ul className={css.list}>
          {filteredContacts.map(({ name, phone: number, id }) => {
            return (
              <MarkupContacts
                key={id}
                name={name}
                number={number}
                id={id}
              ></MarkupContacts>
            );
          })}
        </ul>
      )}
    </>
  );
};
