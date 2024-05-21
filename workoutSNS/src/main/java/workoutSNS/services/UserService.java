package workoutSNS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import workoutSNS.entities.User;
import workoutSNS.dtos.UserDTO;
import workoutSNS.repositories.UserRepository;

@Service
public class UserService {
	@Autowired 
	PasswordService passwordService;
  
	@Autowired
	UserRepository userRepository;
  
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
}