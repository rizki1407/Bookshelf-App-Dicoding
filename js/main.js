let currentEditingBookId = null;

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();

  document.getElementById("bookForm").addEventListener("submit", event => {
      event.preventDefault();

      const title = document.getElementById("bookFormTitle").value;
      const author = document.getElementById("bookFormAuthor").value;
      const year = parseInt(document.getElementById("bookFormYear").value, 10);
      const isComplete = document.getElementById("bookFormIsComplete").checked;

      const newBook = {
          id: +new Date(),
          title,
          author,
          year,
          isComplete,
      };

      const books = loadBooks();
      books.push(newBook);
      saveBooks(books);
      renderBooks();
      document.getElementById("bookForm").reset();
  });

  document.getElementById("searchBook").addEventListener("submit", event => {
      event.preventDefault();
      
      const searchInput = document.getElementById("searchBookTitle")
      const query = searchInput.value.toLowerCase();
      const books = loadBooks();
      const searchResult = document.getElementById("searchResult");
      searchResult.innerHTML = "";

      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));

      if(filteredBooks.length === 0) {
        window.alert("Buku tidak ditemukan!")
        searchInput.value ="";
        return;
      }

      filteredBooks.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.setAttribute("data-bookid", book.id);

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Penulis: ${book.author}`;

        const year = document.createElement("p");
        year.textContent = `Tahun: ${book.year}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Hapus dari Pencarian";
        removeButton.className = "remove-button"
        removeButton.addEventListener("click", () => {
            searchResult.removeChild(bookElement); 
        });

        bookElement.appendChild(title);
        bookElement.appendChild(author);
        bookElement.appendChild(year);
        bookElement.appendChild(removeButton);

        searchResult.appendChild(bookElement);
      });
      searchInput.value ="";
  });
});

function toggleBookStatus(bookId) {
  const books = loadBooks();
  const book = books.find(book => book.id === bookId);

  if (book) {
      book.isComplete = !book.isComplete;
      saveBooks(books);
      renderBooks();
  }
}

function editBook(bookId) {
  const books = loadBooks();
  const book = books.find(book => book.id === bookId);

  if (book) {
      currentEditingBookId = bookId;

      document.getElementById("bookFormTitle").value = book.title;
      document.getElementById("bookFormAuthor").value = book.author;
      document.getElementById("bookFormYear").value = book.year;
      document.getElementById("bookFormIsComplete").checked = book.isComplete;
      saveBooks(books);
      renderBooks();
      deleteBook(book.id)
  }
}

function deleteBook(bookId) {
  let books = loadBooks();
  books = books.filter(book => book.id !== bookId);
  saveBooks(books);
  renderBooks();
}

document.getElementById('bookFormTitle').addEventListener('input', function() {
  this.value = this.value.toUpperCase();  // 
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  const playButton = document.getElementById("playMusicButton");

  playButton.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playButton.textContent = "Pause Music";
    } else {
      music.pause();
      playButton.textContent = "Play Music";
    }
  });
});


