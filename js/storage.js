const STORAGE_KEY = "BOOKSHELF_APP";

function isStorageAvailable() {
    return typeof Storage !== "undefined";
}

function saveBooks(books) {
    if (isStorageAvailable()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } else {
        alert("Browser Anda tidak mendukung localStorage.");
    }
}

function loadBooks() {
    if (isStorageAvailable()) {
        const storedBooks = localStorage.getItem(STORAGE_KEY);
        return storedBooks ? JSON.parse(storedBooks) : [];
    }
    return [];
}


  
