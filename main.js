var form = document.getElementById('addForm')
var itemList = document.getElementById('items')
form.addEventListener('submit', setItem)
form.addEventListener('submit', addItem)

//creating a function to show details on the page itself
function addItem(e){
    e.preventDefault();
    // Get Input value
    var newItem = document.getElementById('item').value;
    // Get description value
    var newdesc = document.getElementById('description').value;
    // Get Email value
    var email = document.getElementById('email').value;
    // Get Phone value
    var phone = document.getElementById('phone').value;
    // create a new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item'
    // Add text node with input value
    var space = ' '
    var bigSpace = ' - '
    li.appendChild(document.createTextNode('FullName: '+newItem));
    li.appendChild(document.createTextNode(space));
    li.appendChild(document.createTextNode(newdesc));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode('Email: '+email));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode("Phone Number: "+ phone));

    itemList.appendChild(li);
}

//creating function to add the items to localstorage
function setItem(e){
    e.preventDefault()
    // Get Input value
    var newItem = document.getElementById('item').value;
    var newdesc = document.getElementById('description').value;
    var emails = document.getElementById('email').value;
    var phones = document.getElementById('phone').value;
    // Retrieve the existing data from local storage or initialize an empty array
    let existingData = JSON.parse(localStorage.getItem(email)) || [];
    // Get description value
    let myObj = {
        firstName: newItem,
        lastName: newdesc,
        email: emails,
        phone: phones
    }
    existingData.push(myObj);

    // Store the updated array in local storage
    localStorage.setItem(emails, JSON.stringify(existingData));

    console.log('Array of objects added to local storage', existingData);
    
}