package wa.waback.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RModel {
    private String title;
    private String content;
    private String author;
    private String category;

}
