const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const contactsPath = path.resolve('./db/contacts.json');
const chalk = require('chalk');

const listContacts = async() => {
  let data= null
    data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
}

const getContactById = async (contactId) => {
    const contacts =  await listContacts()
    const contact = contacts.find(item => item.id === Number(contactId))
  if (contact === void 0) {
    const message = `no contact by id ${contactId}`
    console.log(chalk.red(message))
    return
  }
    return contact
}

const removeContact = async(contactId) => {
  const contact = await getContactById(contactId)
  if (contact === void 0) {
    return
  }
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return await listContacts()
  
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = {
    id: crypto.randomInt(0,100000),
    name,
    email,
    phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}
module.exports= {listContacts, getContactById, removeContact, addContact}

