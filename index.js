const { Command } = require('commander');
const chalk = require('chalk');
const {listContacts, getContactById, removeContact, addContact} = require('./contacts')
const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
;(async ({ action, id, name, email, phone }) =>{
    try {
        
        switch (action) {
          case 'list':
                const contacnts = await listContacts()
                console.table(contacnts)
            break;
      
          case 'get':
            const getContact = await getContactById(id)
            if(getContact === void 0){ return }
                console.log(chalk.green('Your contact is find'))
                console.table(getContact)
            break;
      
          case 'add':
                const newContact = await addContact(name, email, phone)
                console.log(chalk.green('Add new contact'))
                console.table(newContact)
            break;
      
          case 'remove':
            const remContacts = await removeContact(id)
            if(remContacts === void 0){ return }
                console.log(chalk.red(`Contact with id:${id}was deleted`))
                console.table(remContacts)
            break;
      
          default:
            console.warn(chalk.red('31m Unknown action type!'));
        }
    } catch (error) {
        console.error(chalk.red(error.message))
    }
})(argv)
