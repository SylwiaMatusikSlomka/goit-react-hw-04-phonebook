import { useEffect, useState } from 'react';
import ContactsForm from './contactsform';
import Contacts from './contactslist';
import FilterContacts from './filter';

export const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const saveData = localStorage.getItem('contacts');
    const parseData = JSON.parse(saveData);
    setContacts(parseData);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, isMounted]);

  const validateNumber = number => {
    if (!number) {
        return false;
    }

    var regex = /^[0-9]+$/;
    if (!regex.test(number)) {
        return false;
    }

    return true;
  }

  const validateFullName = fullName => {
    if (!fullName) {
        return false;
    }

    var regex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+ [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/;

    if (!regex.test(fullName)) {
        return false;
    }

    return true;
}

  const addContacts = async data => {
    if(validateNumber(data.number)){
      if(validateFullName(data.name)){
        await setContacts(prevContacts => [...prevContacts, data]);
      }else{
        return alert(`${data.name} is not correct NAME!`);
      }
    }else{
      return alert(`${data.number} is not correct NUMBER!`);
    }
  };

  const filterContacts = name => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };
  
  const filterEvcontacts = ev => {
    setFilter(ev.target.value);
    filterContacts(ev.target.value);
  };

  const deleteContact = async id => {
    await setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm addContacts={addContacts} filterContacts={filterContacts} />
      <div>
        <h2>Contacts</h2>
        <FilterContacts filter={filter} filterEvcontacts={filterEvcontacts} />
        <Contacts
          contacts={filterContacts(filter)}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};
export default App;
