package wa.waback.dto;

import lombok.Getter;
import lombok.Setter;

public class RDto {

    @Getter
    @Setter
    public static class Create {
        private String title;
        private String category;
        private String content;
        private String author;
    }

}
