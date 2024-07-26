var Book = (() => {
    function Book(json) {
        if (json === undefined) {
            this.id = 0;
            return;
        }

        this.id = json.id;
        this.title = json.title;
        this.author = json.author;
        this.isbn= json.isbn;
    }

    // #region get set
    Book.prototype.getId = function() {
        return this.id;
    }

    Book.prototype.getTitle = function() {
        return this.title;   
    }

    Book.prototype.getAuthor = function() {
        return this.author;
    }

    Book.prototype.getISBN = function() {
        return this.isbn;
    }

    Book.prototype.setTitle = function(title) {
        this.title = title;
    }

    Book.prototype.setAuthor = function(author) {
        this.author = author;
    }

    Book.prototype.setISBN = function(isbn) {
        this.isbn = isbn;
    }
    // #endregion

    Book.prototype.getHTMLrepr = function() {
        var li = document.createElement('li');

        var title = document.createElement('span');
        var author = document.createElement('span');
        var isbn = document.createElement('span');
        var deleteBtn = document.createElement('span');

        title.classList.add('title-entry');
        author.classList.add('title-entry');
        isbn.classList.add('title-entry');
        deleteBtn.classList.add('delete');

        title.textContent = this.title + ' ';
        author.textContent = this.author + ' ';
        isbn.textContent = this.isbn;
        deleteBtn.textContent = 'delete'

        li.appendChild(title);
        li.appendChild(author);
        li.appendChild(isbn);
        li.appendChild(deleteBtn)

        return li;
    }

    return Book;
})();