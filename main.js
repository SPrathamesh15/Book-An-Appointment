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
        var userData = JSON.parse(localStorage.getItem(email));

        if (userData) {
            // Populate the form fields with existing data
            document.getElementById('item').value = userData.firstName;
            document.getElementById('description').value = userData.lastName;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;

            // Remove the existing user data from local storage
            // localStorage.removeItem(email);

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
    
    axios.post("https://crudcrud.com/api/73e27e549e5c4c4cb7e36ac6ad5df5d5/bookingAppointData"
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


    // localStorage.setItem(email, JSON.stringify(userDetails));
    console.log('User details added to crud crud!!', userDetails);
}

document.addEventListener('DOMContentLoaded', handlePageLoad);

function handlePageLoad() {
    // Make a GET request to retrieve data
    axios.get("https://crudcrud.com/api/73e27e549e5c4c4cb7e36ac6ad5df5d5/bookingAppointData")
        .then((response) => {
            // Display the data on the screen and in the console
            showNewUserOnScreen(response.data);
        })
        .catch((err) => {
            console.error('Error while fetching data:', err);
        });
}

function showNewUserOnScreen(user) {
    document.getElementById('email').value = ''; // Fixed typos in getElementById and set value
    document.getElementById('item').value = ''; 
    document.getElementById('description').value = ''// Fixed typo in getElementById and set value
    document.getElementById('phone').value = ''; // Fixed typo in getElementById and set value

    // console.log(localStorage.getItem(user.emailId)); // Fixed getItem parameter
    
    if (localStorage.getItem(user.emailId) !== null) {
        removeUserFromScreen(user.emailId);
    }
    for (var i = 0; i < user.length; i++) {
        const parentNode = document.getElementById('items'); // Fixed typo in getElementById
        const childHTML = `<li class='list-group-item' id="${user[i]._id}">
        FirstName: ${user[i].firstName} - LastName: ${user[i].lastName} - Email: ${user[i].emailId} - Phone: ${user[i].phone}
        <button class= 'btn btn-danger btn-sm float-right delete' onclick="deleteUser('${user[i]._id}')">X</button>
        <button class = 'editbutton'onclick="editUserDetails(${user[i]._id}', '${user[i].firstName}', '${user[i].lastName}', '${user[i].phone}','${user[i].emailId}')">Edit</button>
    </li>`;  
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }
    
}

function editUserDetails(userId, firstName, lastName, phone, emailId){
    document.getElementById('email').value = emailId;
    document.getElementById('item').value = firstName;
    document.getElementById('description').value = lastName;
    document.getElementById('phone').value = phone;

    deleteUser(userId)
}
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/73e27e549e5c4c4cb7e36ac6ad5df5d5/bookingAppointData/${userId}`)
    .then((response) => {
        removeUserFromScreen(userId)
    })
    .catch((err) => err)
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('items');
    const childNodeTobeDeleted = document.getElementById(userId);
    if (childNodeTobeDeleted){
        parentNode.removeChild(childNodeTobeDeleted)
    }
}


