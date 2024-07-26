document.addEventListener('DOMContentLoaded', async () => {
    await updateList();
})

var list = document.querySelector('#book-list ul');

// fetch all books and update html ul list
async function updateList() {
    list.innerHTML = '';

    var books = await getBooks();

    books.forEach((book) => {
        list.appendChild(book.getHTMLrepr());
        
        // keep truck of database id
        var lis = list.querySelectorAll('li')
        lis[lis.length - 1].setAttribute('db-id', book.getId());
    })
}

// delete book by id
list.addEventListener('click', async (e) => {
    if (e.target.className == 'delete') {
        var li = e.target.parentElement;

        // id in database
        var dbId = li.getAttribute('db-id');

        await deleteBook(dbId);

        li.remove();
    }
});

// add book
const addForm = document.forms['add-book'];
addForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // don't reload page

    const title = addForm.querySelector('input[name ="title"]');
    const author = addForm.querySelector('input[name ="author"]');
    const isbn = addForm.querySelector('input[name ="isbn"]');

    var book = new Book();
    book.setTitle(title.value);
    book.setAuthor(author.value);
    book.setISBN(isbn.value);

    await saveBook(book);

    title.value = '';
    author.value = '';
    isbn.value = '';

    await updateList();
})

// search books
const searchBox = document.forms['search-books'].querySelector('input');
searchBox.addEventListener('keyup', (e) => {
    const term = searchBox.value.toLowerCase();

    const books = list.querySelectorAll('li');
    books.forEach((book) => {
        const title = (() => {
            var str = '';
            
            book.querySelectorAll('.title-entry').forEach((entry) => {
                str += entry.textContent;
            })

            return str;
        })().toLowerCase();

        if (!title.match(`.*${term}.*`)) {
            book.style.display = 'none';
        } else {
            book.style.display = 'block'
        }
    })
});