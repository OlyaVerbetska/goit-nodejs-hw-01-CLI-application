const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db/contacts.json");
function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      console.table(JSON.parse(data));
    })
    .catch((err) => console.log(err.message));
}

const [, , contactId, name, email, phone] = process.argv;

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contactWithId = JSON.parse(data).filter(
        (elem) => elem.id === parseInt(contactId)
      );
      console.table(contactWithId);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contactsUpdated = JSON.parse(data).filter(
        (elem) => elem.id !== parseInt(contactId)
      );

      fs.writeFile(contactsPath, JSON.stringify(contactsUpdated), "utf8");

      console.log(`Contact with id:${contactId} was deleted`);
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contactsList = JSON.parse(data);

      const newContact = {
        id: JSON.parse(data).length + 1,
        name: name,
        email: email,
        phone: phone,
      };
      const newList = [...contactsList, newContact];
      fs.writeFile(contactsPath, JSON.stringify(newList), "utf8");
      console.log(`New contact ${name} was added`);
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
