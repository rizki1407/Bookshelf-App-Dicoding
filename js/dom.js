function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${book.year}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button_list");
    buttonContainer.id = "buttonList";

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
    toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    toggleButton.addEventListener("click", () => toggleBookStatus(book.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.addEventListener("click", () => {
        const userConfirmed = window.confirm("Yakin mau di hapus?")
        if (userConfirmed) {
            deleteBook(book.id);
            alert("Yah udah dihapus")
        } else {
            alert("Ga jadi dihapus deh.")
        }
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Buku";
    editButton.setAttribute("data-testid","bookItemEditButton");
    editButton.addEventListener("click", () => editBook(book.id));

    buttonContainer.append(toggleButton, deleteButton, editButton);

    bookElement.append(title, author, year, buttonContainer);
    return bookElement;
}

function renderBooks() {
    const books = loadBooks();
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");

    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    books.forEach(book => {
        const bookElement = createBookElement(book);

        if (book.isComplete) {
            completeBookList.appendChild(bookElement);
        } else {
            incompleteBookList.appendChild(bookElement);
        }
    });
}

