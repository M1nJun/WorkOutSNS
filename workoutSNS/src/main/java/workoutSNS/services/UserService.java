package workoutSNS.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workoutSNS.entities.Profile;
import workoutSNS.entities.User;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.dtos.UserDTO;
import workoutSNS.repositories.ProfileRepository;
import workoutSNS.repositories.UserRepository;

@Service
public class UserService {
	@Autowired 
	PasswordService passwordService;
  
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProfileRepository profileRepository;
  
	public String save(UserDTO user) {
		List<User> existing = userRepository.findByUsername(user.getUsername());
		if(existing.size() > 0)
			return "Duplicate";
    
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		String hash = passwordService.hashPassword(user.getPassword());
		newUser.setPassword(hash);
		userRepository.save(newUser);
		return newUser.getUserID().toString();
	}
  
	public User findByNameAndPassword(String name,String password) {
		List<User> existing = userRepository.findByUsername(name);
		if(existing.size() != 1)
			return null;
		User u = existing.get(0);
		if(passwordService.verifyHash(password, u.getPassword())) {
			u.setPassword("Undisclosed");
		} else {
			u = null;
		}
		return u;	
	}
	
	public String saveProfile(UUID userid,ProfileDTO profile) {
		Optional<User> maybeUser = userRepository.findById(userid);
		if(!maybeUser.isPresent())
			return "Bad Id";
		
		User user = maybeUser.get();
		if(user.getProfile() != null)
			return "Duplicate";
		
		Profile newProfile = new Profile(profile);
		newProfile.setUser(user);
		profileRepository.save(newProfile);
		
		return "Created";
	}
	
	public Profile findProfile(UUID userid) {
		Optional<User> maybeUser = userRepository.findById(userid);
		if(!maybeUser.isPresent())
			return null;
		
		return maybeUser.get().getProfile();
	}
}