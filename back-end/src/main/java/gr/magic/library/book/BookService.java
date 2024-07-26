package gr.magic.library.book;

import jakarta.annotation.Resource;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Resource
    private BooksRepository booksRepository;

    public List<Book> getAllBooks() {
        return IterableUtils.toList(booksRepository.findAll());
    }

    public String saveBook(Book book) {
        try {
            booksRepository.save(book);
            return "OK";
        } catch (DataIntegrityViolationException e) {
            return e.getMessage();
        }
    }

    public String deleteBook(int id) {
        Optional<Book> book = booksRepository.findById(id);

        if (book.isPresent()) {
            booksRepository.delete(book.get());

            return "OK";
        }

        return "Book not found";
    }
}
