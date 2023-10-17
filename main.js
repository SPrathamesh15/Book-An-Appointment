var form = document.getElementById('addForm')
var itemList = document.getElementById('items')
// set event
form.addEventListener('submit', setItem)
// Add event
form.addEventListener('submit', addItem)
// delete event
itemList.addEventListener('click', removeItem);
// edit event
itemList.addEventListener('click', editItem);

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        var email = document.getElementById('email').value;
        var userData = JSON.parse(localStorage.getItem(email));

        if (userData) {
            // Populate the form fields with existing data
            document.getElementById('item').value = userData.firstName;
            document.getElementById('description').value = userData.lastName;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;

            // Remove the existing user data from local storage
            localStorage.removeItem(email);

            // Remove the corresponding list item
            itemList.removeChild(li);
        }
    }
}



// Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure? You want to delete this item?')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
        // Removing corresponding userData from the localStorage
        var emails = document.getElementById('email').value;
        var userData = JSON.parse(localStorage.getItem(emails));
        if (userData){
            // updating the localStorage after deleting the user
            localStorage.removeItem(emails);
        }
      }
    }
  }

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
    // create del button element 
    var deleteBtn = document.createElement('button');
    // Add class to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    // create edit btn
    var editBtn = document.createElement('button');
    // add class to edit btn
    editBtn.className = 'btn btn-primary btn-sm float-right edit'
    // Append text node
    editBtn.appendChild(document.createTextNode('Edit'))
    
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
    // Append btn to li
    li.appendChild(deleteBtn);
    // append btn to li
    li.appendChild(editBtn)
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
    let existingData = JSON.parse(localStorage.getItem(emails)) || [];
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