import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactslist.module.css';
class Contacts extends Component {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.contacts.map(({ name, id, number }) => (
          <li key={id} className={styles.listItems}>
            {name}: <span>{number}</span>
            <button
              type="submit"
              className={styles.listItemsBtn}
              onClick={() => this.props.deleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Contacts;

Contacts.protoTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
