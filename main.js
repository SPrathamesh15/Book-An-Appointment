var form = document.getElementById('addForm')
form.addEventListener('submit', setItem)
function setItem(e){
    e.preventDefault()
    // Get Input value
    var newItem = document.getElementById('item').value;
    var newdesc = document.getElementById('description').value;
    // Get description value
    let myObj = {
        firstName: newItem,
        lastName: newdesc
    }
    let myObjstr = JSON.stringify(myObj)
    localStorage.setItem('myObj', myObjstr)
    let myObjdestr = JSON.parse(localStorage.getItem('myObj'))
    console.log('deseriliazed sting from localStorage' + myObjdestr)
    console.log('value is added to localStorage ' +myObjstr)
}