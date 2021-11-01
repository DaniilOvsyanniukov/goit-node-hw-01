const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const contactsPath = path.resolve('./db/contacts.json');
const chalk = require('chalk');

const listContacts = async() => {
  const contacts = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(contacts)

}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === Number(contactId))
  return contact
}

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId)
  const contacts= await listContacts()
  newContactList= contacts.filter(item => item.id !== Number(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
    return contact
  
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

