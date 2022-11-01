const { Command } = require('commander');
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts.js');

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const list = await listContacts();
            console.log('List of your contacts:', list);
            break;

        case 'get':
            const contact = await getContactById(id);
            if (!contact) {
                return `Contact with ${id} not found`;
            }
            console.log('Wanted contact:', contact);
            break;

        case 'add':
            const addedContact = await addContact(name, email, phone);
            console.log('Added contact:', addedContact);
            break;

        case 'remove':
            const removedContact = await removeContact(id);
            console.log('Removed contact:', removedContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
