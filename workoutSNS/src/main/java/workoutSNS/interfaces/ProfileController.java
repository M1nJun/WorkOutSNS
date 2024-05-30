package workoutSNS.interfaces;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import workoutSNS.securities.workoutUserDetails;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.entities.Profile;
import workoutSNS.services.ProfileService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
	private ProfileService ps;
	
	public ProfileController(ProfileService ps) {
		this.ps = ps;
	}
	
	@PostMapping
	public ResponseEntity<String> save(Authentication authentication, @RequestBody ProfileDTO profile){
		workoutUserDetails details = (workoutUserDetails)authentication.getPrincipal();
		UUID id = UUID.fromString(details.getUsername());
		profile.setUserID(id.toString());
		String key = ps.save(profile);
        if (key.equals("Bad Id")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not generate key");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(key);
	}
	
	@GetMapping("/user")
	public ResponseEntity<ProfileDTO> findByUser(Authentication authentication) {
		workoutUserDetails details = (workoutUserDetails) authentication.getPrincipal();
		UUID id = UUID.fromString(details.getUsername());
		Profile profile = ps.findByUser(id.toString());
		ProfileDTO result = new ProfileDTO(profile);
		return ResponseEntity.ok().body(result);
	}
	
}
