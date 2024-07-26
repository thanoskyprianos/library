package gr.magic.library.book;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class Book {
    @Id @GeneratedValue
    private int id;

    private String title;
    private String author;

    @Column(unique = true)
    private String isbn;
}
