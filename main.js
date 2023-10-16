var form = document.getElementById('addForm')
form.addEventListener('submit', setItem)
function setItem(e){
    e.preventDefault()
    // Get Input value
    var newItem = document.getElementById('item').value;
    // Get description value
    var newdesc = document.getElementById('description').value;
    localStorage.setItem(newItem, newdesc)
    console.log('value is added to localStorage')
}