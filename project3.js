//Contact management system

const prompt = require("prompt-sync")();

function printInfo() {
  console.log("Contact Management System");
  console.log("-------------------------");
  console.log("1.Add a Contact");
  console.log("2.Delete a Contact");
  console.log("3.View  Contacts");
  console.log("4.Search Contacts");
  console.log("5.Exit");
}


function addContact() {
    const name = prompt("Name: ")
    const email = prompt("Email: ")
    const contact ={
        name: name,
        email: email
    }
    contacts.push(contact)
    console.log("Added!")
}

function deleteContact() {
    console.log("ContactIDs")
    for(let i=0; i<contacts.length; i++){
        const contact = contacts[i]
        console.log((i+1).toString() + ":", contact.name)
    }
    const number = parseInt(prompt("Enter an ID: "))
    if(isNaN(number) || number>contacts.length){
        console.log("Invalid.")
    }
    contacts.splice(number -1 , 1)
    console.log("Removed.")
}

function searchContacts() {
    const searchString = prompt("Search: ").toLowerCase()
    const result = [];

    for(let contact of contacts){
        if(contact.name.toLowerCase().includes(searchString)) result.push(contact)
    }
    listContacts(result)
    console.log()
}

function listContacts(contacts) {
    for(let contact of contacts){   //iterating by item
        console.log("############")
        console.log("Name: ",contact.name)
        console.log("Email: ",contact.email)
    }  

}


printInfo();

//creating a switch statment  to handle different operations

const contacts = [] 
let keepGoing = true;

while (keepGoing) {
  const number = prompt("Enter a Operation (1-5): ");
  console.log()

  switch (number) {
    case "1":
        addContact()
      break;

    case "2":
        deleteContact()
      break;

    case "3":
        listContacts(contacts)
        console.log()
      break;

    case "4":
        searchContacts()
      break;

    case "5":
      keepGoing = false;       //stop looping  
      break;

    default:
      console.log("Unknown.");
      break;
  }
}
