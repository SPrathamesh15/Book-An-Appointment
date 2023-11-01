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
            // Removing corresponding userData from the localStorage
            var email = document.getElementById('email').value;
            var userData = JSON.parse(localStorage.getItem(email));
            if (userData) {
                // Updating the localStorage after deleting the user
                localStorage.removeItem(email);
            }
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
    
    axios.post("https://crudcrud.com/api/989bfbabc6634ee6966be6ef88ef3885/bookingAppointData"
    , userDetails)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> Something Went wrong!!!</h4>",
            console.log(err)
        })
    // localStorage.setItem(email, JSON.stringify(userDetails));

    console.log('User details added to crud crud!!', userDetails);
}
