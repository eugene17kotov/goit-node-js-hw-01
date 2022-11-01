const path = require('path');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        return contactsList;
    } catch (err) {
        console.error(err);
    }
}

async function getContactById(contactId) {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        const contactById = contactsList.find(
            contact => contact.id === contactId.toString()
        );

        return contactById || null;
    } catch (err) {
        console.error(err);
    }
}

async function removeContact(contactId) {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        const stringedContactId = contactId.toString();

        const indexRemovedContact = contactsList.findIndex(
            contact => contact.id === stringedContactId
        );

        console.log(contactId);

        console.log(indexRemovedContact);

        if (indexRemovedContact === -1) {
            return null;
        }

        const [removedContact] = contactsList.splice(indexRemovedContact, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contactsList), 'utf8');

        return removedContact;
    } catch (err) {
        console.error(err);
    }
}

async function addContact(name, email, phone) {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        const newContact = { id: uuid(), name, email, phone };

        contactsList.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contactsList), 'utf8');

        return contactsList[contactsList.length - 1];
    } catch (err) {
        console.error(err);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
