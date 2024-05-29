package workoutSNS.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workoutSNS.dtos.PostDTO;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.entities.Exercise;
import workoutSNS.entities.Post;
import workoutSNS.entities.Profile;
import workoutSNS.entities.User;
import workoutSNS.repositories.ExerciseRepository;
import workoutSNS.repositories.PostRepository;
import workoutSNS.repositories.UserRepository;

@Service
public class PostService {
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ExerciseRepository exerciseRepository;
	
	public String save(PostDTO post) {
		
        Post newPost = new Post(post);
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(post.getUserID()));
		if(!maybeUser.isPresent()) 
			return "Bad Id";
		User user = maybeUser.get();
		newPost.setUser(user);
		
		Optional<Exercise> maybeExercise = exerciseRepository.findById(post.getExerciseID());
		Exercise exercise = maybeExercise.get();
		newPost.setExercise(exercise);
		postRepository.save(newPost);
		return newPost.getPostID().toString();
	}
}
