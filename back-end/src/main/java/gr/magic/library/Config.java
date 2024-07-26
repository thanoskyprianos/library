package gr.magic.library;

import gr.magic.library.book.Book;
import gr.magic.library.book.BookService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnExpression( // call only when initializing table
        "'${spring.jpa.hibernate.ddl-auto}'.equals('create') or " +
        "'${spring.jpa.hibernate.ddl-auto}'.equals('create-drop')"
)
public class Config {
    @Resource
    private BookService bookService;

    @PostConstruct // create mock books
    public void init() {
        // ids will be set by db...
        Book b1 = new Book(0, "Harry Potter and the Deathly Hallows", "J.K.Rowling", "9780545010221");
        Book b2 = new Book(0, "The Hobbit", "J.R.R. Tolkien", "9780345339683");
        Book b3 = new Book(0, "1984", "George Orwell", "9781328869333");

        bookService.saveBook(b1);
        bookService.saveBook(b2);
        bookService.saveBook(b3);
    }
}
