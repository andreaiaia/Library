/* VARIABLES */
let myLibrary = [];

/* GENERATE LIBRARY */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let status = read ? 'read' : 'not read yet';
    return `${title} by ${author}, ${pages}, ${status}`;
  }
}

function addBookToLibrary() {
  const title = document.querySelector('#formTitle').value;
  const author = document.querySelector('#formAuthor').value;
  const pages = document.querySelector('#formPages').value;
  const read = document.querySelector('#formRead').checked;

  myLibrary.push(new Book(title, author, pages, read));
  save();
}

/* INTERACTING W/ LOCALSTORAGE */
function save() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function readLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}


/* DOM STUFF */

function render() {

  if (!localStorage.getItem('library')) {
    save();
  }

  readLocalStorage();

  for (let i in myLibrary) {
    let newRow = document.createElement('tr');
    let rowTitle = document.createElement('td');
    let rowAuthor = document.createElement('td');
    let rowPages = document.createElement('td');
    let rowRead = document.createElement('td');
    let deleteBtn = document.createElement('td');

    rowTitle.textContent = myLibrary[i].title;
    rowAuthor.textContent = myLibrary[i].author;
    rowPages.textContent = myLibrary[i].pages;

    rowRead.textContent = myLibrary[i].read ? 'read' : 'not read';

    deleteBtn.innerHTML = `<button type="button" class="delete mdi mdi-delete-forever" 
                            onclick="deleteRow(${i})"></button>`

    newRow.appendChild(rowTitle);
    newRow.appendChild(rowAuthor);
    newRow.appendChild(rowPages);
    newRow.appendChild(rowRead);
    newRow.appendChild(deleteBtn);

    document.querySelector('.books').appendChild(newRow);
  }
}

function deleteRow(index) {
  myLibrary.splice(index, 1);
  save();
  location.reload();
  return false;
}

function displayForm() {
  const contForm = document.querySelector('#contForm');
  contForm.classList.toggle('hide');
}

/* BTN LISTENERS */
const formBtn = document.querySelectorAll('.displayForm');
formBtn.forEach(btn => {btn.addEventListener('click', displayForm)});

render();