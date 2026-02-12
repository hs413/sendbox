package wa.waback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wa.waback.dto.RDto;
import wa.waback.service.RService;

@RestController
@RequiredArgsConstructor
public class RController {
    private final RService rService;

    @PostMapping("/r")
    public String create(
            @RequestBody RDto.Create body
    ) {

        return rService.create(body);

    }

}
