var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Add a single event listener to handle form submission
form.addEventListener('submit', handleFormSubmission);

// delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem); // Add event listener for edit

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure? You want to delete this item?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}


function editItem(e) {
    if (e.target.classList.contains('editbutton')) {
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

function handleFormSubmission(e) {
    e.preventDefault();
    var newItem = document.getElementById('item').value;
    var newdesc = document.getElementById('description').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var li = document.createElement('li');
    li.className = 'list-group-item';

    var space = ' ';
    var bigSpace = ' - ';

    var fullName = 'FullName: ' + newItem;
    var emailText = 'Email: ' + email;
    var phoneText = 'Phone Number: ' + phone;

    li.appendChild(document.createTextNode(fullName));
    li.appendChild(document.createTextNode(space));
    li.appendChild(document.createTextNode(newdesc));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode(emailText));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode(phoneText));
    li.appendChild(document.createTextNode(space));

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    var editBtn = document.createElement('button'); // Create an edit button
    editBtn.className = 'editbutton';
    editBtn.appendChild(document.createTextNode('Edit'));

    li.appendChild(deleteBtn);
    li.appendChild(editBtn); // Append the edit button

    itemList.appendChild(li);

    var userDetails = {
        firstName: newItem,
        lastName: newdesc,
        emailId: email,
        phone: phone
    };
    
    axios.post("https://crudcrud.com/api/6c61e830b53c4bbe80f079d89ca6b129/bookingAppointData"
    , userDetails)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + 
            "<h3 style='color:red'> Something Went wrong!!!</h4>",
            console.log(err)
        })

    // Create a new list item
    var li = document.createElement('li');
    li.className = 'list-group-item';

    // Set the userId as a data attribute
    li.setAttribute('data-userId', userDetails.userId);
    // localStorage.setItem(email, JSON.stringify(userDetails));
    console.log('User details added to crud crud!!', userDetails);
}

document.addEventListener('DOMContentLoaded', handlePageLoad);

function handlePageLoad() {
    // Make a GET request to retrieve data
    axios.get("https://crudcrud.com/api/6c61e830b53c4bbe80f079d89ca6b129/bookingAppointData")
        .then((response) => {
            // Display the data on the screen and in the console
            showNewUserOnScreen(response.data);
        })
        .catch((err) => {
            console.error('Error while fetching data:', err);
        });
}

function showNewUserOnScreen(user) {
    for (var i = 0; i < user.length; i++) {
        var userId = user[i]._id
        
        var li = document.createElement('li');
        li.className = 'list-group-item';

        var space = ' ';
        var bigSpace = ' - ';
        li.appendChild(document.createTextNode(user[i].firstName));
        li.appendChild(document.createTextNode(space));
        li.appendChild(document.createTextNode(user[i].lastName));
        li.appendChild(document.createTextNode(bigSpace));
        li.appendChild(document.createTextNode(user[i].emailId));
        li.appendChild(document.createTextNode(bigSpace));
        li.appendChild(document.createTextNode(user[i].phone));
        li.appendChild(document.createTextNode(space));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        // Add an event listener to the delete button
        deleteBtn.addEventListener('click', function () {
            // Send a network request to delete the user with user[i]._id
            deleteUserFromServer(userId);
        });
        var editBtn = document.createElement('button'); // Create an edit button
        editBtn.className = 'editbutton';
        editBtn.appendChild(document.createTextNode('Edit'));

        li.appendChild(deleteBtn);
        li.appendChild(editBtn); // Append the edit button

        itemList.appendChild(li);
        // localStorage.setItem(email, JSON.stringify(userDetails));

        console.log('User details retrieved from crud crud!!', user[i]);
    }
}

function deleteUserFromServer(userId) {
    // Send an HTTP DELETE request to the server to delete the user with the specified ID.
    // You can use the Fetch API or another HTTP library for this.
    // Example using the Fetch API:

    fetch(`https://crudcrud.com/api/6c61e830b53c4bbe80f079d89ca6b129/bookingAppointData/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
            // User deleted successfully
            console.log('User deleted from the server.');
        } else {
            console.error('Failed to delete user from the server.');
        }
    })
    .catch(error => {
        console.error('Error while deleting user:', error);
    });
}


