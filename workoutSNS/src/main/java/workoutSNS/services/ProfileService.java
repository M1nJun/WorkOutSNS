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
		 // Find existing profiles with the same email
        List<Profile> existingProfiles = profileRepository.findByEmail(profile.getEmail());
        
        // Need to change logic: consider userID as a factor to empty out the row.
        // or if the user that is posting right now is the person who is the owner of the email, then allow to delete.
        // Delete the existing profiles
        if (!existingProfiles.isEmpty()) {
            profileRepository.deleteAll(existingProfiles);
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
