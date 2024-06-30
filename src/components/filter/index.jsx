
import PropTypes from 'prop-types';
import styles from './filter.module.css';

const FilterContacts = ({ filter, filterEvcontacts }) => {
  return (
    <label htmlFor="filter" className={styles.filter}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        className={styles.filterInput}
        id="filter"
        value={filter}
        onChange={filterEvcontacts}
      />
    </label>
  );
};
export default FilterContacts;

FilterContacts.propTypes = {
  filter: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
};
