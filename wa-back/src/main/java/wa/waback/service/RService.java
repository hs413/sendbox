package wa.waback.service;

import org.springframework.stereotype.Service;
import wa.waback.dto.RDto;
import wa.waback.model.RModel;

@Service
public class RService {

    public String create(RDto.Create body) {
        RModel model = RModel.builder()
                .title(body.getTitle())
                .content(body.getContent())
                .author(body.getAuthor())
                .category(body.getCategory())
                .build();
        return "";
    }
}
