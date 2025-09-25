const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

// Define the prototype method OUTSIDE the constructor
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Add some books to library
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);

function displayBooks() {
  const container = document.getElementById('books-container');
  container.innerHTML = '';
  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <p>ID: ${book.id}</p>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
      <button class="toggle-read-btn" data-id="${book.id}">Toggle Read</button>
    `;
    container.appendChild(card);

    // Remove button event
    const removeBtn = card.querySelector('.delete-btn');
    removeBtn.addEventListener('click', function() {
      const bookId = this.getAttribute('data-id');
      removeBookFromLibrary(bookId);
      displayBooks();
    });

    // Toggle Read button event
    const toggleBtn = card.querySelector('.toggle-read-btn');
    toggleBtn.addEventListener('click', function() {
      const bookId = this.getAttribute('data-id');
      const book = myLibrary.find(b => b.id === bookId);
      if (book) {
        book.toggleRead();
        displayBooks();
      }
    });
  });
}

// function to remove book by ID
function removeBookFromLibrary(bookId) {
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function setupFormHandler() {
  const dialog = document.getElementById('book-dialog');
  const form = document.getElementById('book-form');
  const newBtn = document.getElementById('new-book-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  newBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = parseInt(form.pages.value, 10);
    const read = form.read.checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
    form.reset();
  });
}

displayBooks();
setupFormHandler();