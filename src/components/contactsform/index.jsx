import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './contactsform.module.css';

const ContactsForm = ({ filterContacts, addContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChange = ev => {
    setName(ev.target.value);
  };
  const handlerChangeNumber = ev => {
    setNumber(ev.target.value);
  };

  const handlerSubmit = ev => {
    ev.preventDefault();
    const id = nanoid();
    if (filterContacts(name).length !== 0) {
      return alert(`${name} is already in contacts`);
    }
    addContacts({ name, number, id });
  };
  return (
    <form onSubmit={handlerSubmit} className={styles.form}>
      <label htmlFor="name" className={styles.formLabel}>
        Name
        <input
          onChange={handlerChange}
          value={name}
          type="text"
          className={styles.formInput}
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number" className={styles.formLabel}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="number"
          value={number}
          className={styles.formInput}
          onChange={handlerChangeNumber}
        />
      </label>
      <button type="submit" className={styles.formBtn}>
        Add contact
      </button>
    </form>
  );
};
export default ContactsForm;

ContactsForm.propTypes = {
  addContacts: PropTypes.func.isRequired,
  filterContacts: PropTypes.func.isRequired,
};
