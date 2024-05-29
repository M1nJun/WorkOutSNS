package workoutSNS.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import workoutSNS.dtos.PostDTO;
import workoutSNS.services.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostController {
	private PostService ps;
	
	public PostController(PostService ps) {
		this.ps = ps;
	}
	
	@PostMapping
	public ResponseEntity<String> save(Authentication authentication, @RequestBody PostDTO post){
		String key = ps.save(post);
        if (key.equals("Bad Id")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not generate key");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(key);
	}
}
