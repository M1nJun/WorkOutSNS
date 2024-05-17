package workoutSNS.interfaces;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import workoutSNS.securities.JwtService;
import workoutSNS.entities.Profile;
import workoutSNS.entities.User;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.dtos.UserDTO;
import workoutSNS.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
	
	private UserService us;
	private JwtService jwtService;
	
	  public UserController(UserService us, JwtService jwtService) {
	        this.us = us;
	        this.jwtService = jwtService;
	    }
	  
	    @PostMapping("/login")
	    public ResponseEntity<String> checkLogin(@RequestBody UserDTO user) {
	        User result = us.findByNameAndPassword(user.getUsername(), user.getPassword());
	        if (result == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user name or password");
	        }
	        String token = jwtService.makeJwt(result.getUserID().toString());
	        return ResponseEntity.ok().body(token);
	    }
	    
	    @PostMapping
	    public ResponseEntity<String> save(@RequestBody UserDTO user) {
	        if (user.getUsername().isBlank() || user.getPassword().isBlank()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empty user name or password");
	        }

	        String key = us.save(user);
	        if (key.equals("Duplicate")) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this name already exists");
	        } else if (key.equals("Error")) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not generate key");
	        }
	        String token = jwtService.makeJwt(key);
	        return ResponseEntity.status(HttpStatus.CREATED).body(token);
	    }
	    
	    @PostMapping("/{id}/profile")
	    public ResponseEntity<String> saveProfile(@PathVariable UUID id,@RequestBody ProfileDTO profile) {
	    	String result = us.saveProfile(id,profile);
	    	if(result.equals("Bad Id"))
	    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user id");
	    	else if(result.equals("Duplicate"))
	    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate profile");
	    	else if (result.equals("Error")) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not store profile");
	        }
	    	return ResponseEntity.ok().body("Profile created");
	    }
	    
	    @GetMapping("/{id}/profile")
	    public ResponseEntity<ProfileDTO> getProfile(@PathVariable UUID id) {
	    	Profile result = us.findProfile(id);
	    	if(result == null) {
	    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    	}
	    	ProfileDTO response = new ProfileDTO(result);
	    	return ResponseEntity.ok().body(response);
	    }
}