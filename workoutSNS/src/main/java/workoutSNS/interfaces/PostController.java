package workoutSNS.interfaces;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PathVariable;
import workoutSNS.dtos.PostDTO;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.entities.Post;
import workoutSNS.entities.Profile;
import workoutSNS.securities.workoutUserDetails;
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
		workoutUserDetails details = (workoutUserDetails)authentication.getPrincipal();
		UUID id = UUID.fromString(details.getUsername());
		post.setUserID(id.toString());
		String key = ps.save(post);
        if (key.equals("Bad Id")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not generate key");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(key);
	}
	
	@GetMapping(params= {"tag"})
	public ResponseEntity<List<PostDTO>> findByTag(@RequestParam(value="tag") String tag) {
		List<Post> posts = ps.findByTag(tag);
		List<PostDTO> results = new ArrayList<PostDTO>();
		for(Post p : posts) {
			results.add(new PostDTO(p));
		}
		return ResponseEntity.ok().body(results);
	}
	

	
	@GetMapping("/user/{id}/all")
	public ResponseEntity<List<PostDTO>> findAllPostByUser(Authentication authentication, @PathVariable String id){
		List<Post> posts = ps.findByUser(id.toString());
		List<PostDTO> result = new ArrayList<PostDTO>();
		for (Post p: posts) {
			result.add(new PostDTO(p));
		}
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/user/self/all")
	public ResponseEntity<List<PostDTO>> findAllPostSelf(Authentication authentication) {
		workoutUserDetails details = (workoutUserDetails) authentication.getPrincipal();
		UUID id = UUID.fromString(details.getUsername());
		List<Post> posts = ps.findByUser(id.toString());
		List<PostDTO> result = new ArrayList<PostDTO>();
		for (Post p: posts) {
			result.add(new PostDTO(p));
		}
		return ResponseEntity.ok().body(result);
	}
	
//	@GetMapping("/user/recent")
//	public ResponseEntity<PostDTO> find
	
}
