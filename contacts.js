const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        if (!contactsList || !contactsList.length) return;

        console.log(contactsList);

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

        if (!contactsList || !contactsList.length) return;

        const contactById = contactsList.find(
            contact => contact.id === contactId.toString()
        );

        console.log(contactById);

        return contactById;
    } catch (err) {
        console.error(err);
    }
}

async function removeContact(contactId) {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        if (!contactsList || !contactsList.length) return;

        const indexRemovedContact = contactsList.findIndex(
            contact => contact.id === contactId.toString()
        );

        const [removedContact] = contactsList.splice(indexRemovedContact, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contactsList), 'utf8');

        console.log(removedContact);
    } catch (err) {
        console.error(err);
    }
}

async function addContact(name, email, phone) {
    try {
        const contactsList = JSON.parse(
            await fs.readFile(contactsPath, 'utf8')
        );

        if (!contactsList || !contactsList.length) return;

        const lastId = Number(contactsList[contactsList.length - 1].id);

        contactsList.push({ id: `${lastId + 1}`, name, email, phone });

        await fs.writeFile(contactsPath, JSON.stringify(contactsList), 'utf8');

        console.log(contactsList[contactsList.length - 1]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
