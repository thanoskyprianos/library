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

// delete or edit book by id
list.addEventListener('click', async (e) => {
    var li = e.target.parentElement;

    var titleName = li.querySelector('.title-entry.title-name');
    var authorName = li.querySelector('.title-entry.author-name');
    var isbnName = li.querySelector('.title-entry.isbn-name');

    if (e.target.className == 'delete') {

        // id in database
        var dbId = li.getAttribute('db-id');

        await deleteBook(dbId);

        li.remove();
    } else if (e.target.classList.contains('title-entry')) {
        var submitBtn = li.querySelector('.submit');
        var cancelBtn = li.querySelector('.cancel');

        
        var titleInpt = document.createElement('input');
        var authorInpt = document.createElement('input');
        var isbnInpt = document.createElement('input');
        
        var titleValue = titleName.textContent;
        var authorValue = authorName.textContent;
        var isbnValue = isbnName.textContent;

        titleInpt.setAttribute('type', 'text');
        titleInpt.placeholder = titleValue;
        
        authorInpt.setAttribute('type', 'text');
        authorInpt.placeholder = authorValue;
        
        isbnInpt.setAttribute('type', 'text');
        isbnInpt.placeholder = isbnValue;

        titleName.style.display = 'none';
        authorName.style.display = 'none';
        isbnName.style.display = 'none';

        li.prepend(isbnInpt);
        li.prepend(authorInpt);
        li.prepend(titleInpt);

        submitBtn.style.visibility = 'visible';
        cancelBtn.style.visibility = 'visible';
    } else if (e.target.className == 'cancel') {
        isbnName.style.display = 'inline';
        authorName.style.display = 'inline';
        titleName.style.display = 'inline';

        var inpt = li.querySelectorAll('input');
        inpt.forEach((input) => input.remove());

        e.target.style.visibility = 'hidden';
        var submitBtn = li.querySelector('.submit');
        submitBtn.style.visibility = 'hidden';
    } else if (e.target.className == 'submit') {
        var inpt = li.querySelectorAll('input');

        // only update if at least one new value is set
        if (inpt[0].value || inpt[1].value || inpt[2].value) {
            var title = inpt[0].value ? inpt[0].value : inpt[0].placeholder;
            var author = inpt[1].value ? inpt[1].value : inpt[1].placeholder;
            var isbn = inpt[2].value ? inpt[2].value : inpt[2].placeholder;
    
            var book = new Book();
    
            book.setId(li.getAttribute('db-id'));
            book.setTitle(title);
            book.setAuthor(author);
            book.setISBN(isbn);
    
            await saveBook(book);    
            await updateList();
        }

        isbnName.style.display = 'inline';
        authorName.style.display = 'inline';
        titleName.style.display = 'inline';

        var inpt = li.querySelectorAll('input');
        inpt.forEach((input) => input.remove());

        e.target.style.visibility = 'hidden';
        var cancelBtn = li.querySelector('.cancel');
        cancelBtn.style.visibility = 'hidden';
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

// edit book
