package gr.magic.library.book;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class BooksController {
    @Resource
    private BookService bookService;

    @Resource
    private BooksRepository booksRepository;

    @GetMapping("/books")
    public List<Book> all() {
        return bookService.getAllBooks();
    }

    @PostMapping("/books")
    public ResponseEntity<Map<String, String>> save(@RequestBody Book book) {
        String res = bookService.saveBook(book);

        // could do it with advices...
        if(!res.equals("OK")) {
            return ResponseEntity.badRequest().body(Map.of("message", res));
        }

        return ResponseEntity.ok(Map.of("message", "OK"));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable int id) {
        String res = bookService.deleteBook(id);

        // could do it with advices...
        if(!res.equals("OK")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", res));
        }

        return ResponseEntity.ok(Map.of("message", "OK"));
    }
}
