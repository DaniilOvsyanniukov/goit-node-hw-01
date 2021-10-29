const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { takeCoverage } = require('v8');
const contactsPath = path.resolve('./db/contacts.json');

const getData = async() => {
  let data= null
  try {
    data = await fs.readFile(contactsPath, 'utf8')
  } catch (error) {
    data ={}
  }
  if (data === void 0) {
    console.log('unknown command')
    return 
  }
  const contacts = JSON.parse(data)
  return contacts
  
}

const listContacts = async () => {
  const contacts =  await getData()
    return contacts
}

const getContactById = async (contactId) => {
    const contacts =  await getData()
    const contact = contacts.find(item => item.id === Number(contactId))
  if (contact === void 0) {
    message = `no contact by id ${contactId}`
    console.log(`no contact by id ${contactId}`)
    return message
  }
    return contact
}

const removeContact = async(contactId) => {
   const contacts =  await getData()
    const delContact = contacts.filter(item => item.id !== Number(contactId))
  if (delContact === void 0) {
    message = `no contact by id ${contactId}`
    console.log(`no contact by id ${contactId}`)
    return message
  }
  await fs.writeFile(contactsPath, JSON.stringify(delContact, null, 2))
    return await getData()
  
}

const addContact = async (name, email, phone) => {
  const contacts = await getData()
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

