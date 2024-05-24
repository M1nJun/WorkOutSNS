package workoutSNS.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workoutSNS.repositories.UserRepository;
import workoutSNS.entities.User;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.entities.Profile;
import workoutSNS.repositories.ProfileRepository;

@Service
public class ProfileService {
	@Autowired
	ProfileRepository profileRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public String save(ProfileDTO profile) {
		// Find existing profiles with the same userID
		Optional<User> u = userRepository.findById(UUID.fromString(profile.getUserID()));
        Profile existingProfile = profileRepository.findByUser(u.get());
        
        if (existingProfile != null) {
            profileRepository.delete(existingProfile); // Use delete() instead of deleteAll()
        }
        
        Profile newProfile = new Profile();
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(profile.getUserID()));
		if(!maybeUser.isPresent()) 
			return "Bad Id";
		User user = maybeUser.get();
		newProfile.setUser(user);
			    
		newProfile.setFirstname(profile.getFirstname());
		newProfile.setLastname(profile.getLastname());
		newProfile.setEmail(profile.getEmail());
		newProfile.setBio(profile.getBio());
		profileRepository.save(newProfile);
		return newProfile.getProfileID().toString();
	}
	
	public Profile findByUser(String id){
		Optional<User> u = userRepository.findById(UUID.fromString(id));
		if(u.isPresent())
			return profileRepository.findByUser(u.get());
		return new Profile();
	}
}
