async function getBooks() {
    var resp = await fetch('http://localhost:8080/books');
    var json = await resp.json();
    var books = await json.map((element) => new Book(element));

    return books;
}

async function saveBook(book) {
    var resp = await fetch('http://localhost:8080/books', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });

    console.log(resp);
}

async function deleteBook(id) {
    var resp = await fetch(`http://localhost:8080/books/${id}`, {method: "DELETE"});

    console.log(resp);
}