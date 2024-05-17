package workoutSNS.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workoutSNS.dtos.PostDTO;
import workoutSNS.entities.Post;
import workoutSNS.entities.User;
import workoutSNS.repositories.PostRepository;
import workoutSNS.repositories.UserRepository;


@Service
public interface PostService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PostRepository postRepository;
	
	
	public String save (PostDTO post) {
		Optional<User> maybeUser = userRepository.findById(UUID.fromString(post.getUser()));
		if(!maybeUser.isPresent()) 
			return "Bad Id";
		User user = maybeUser.get();
		
		Post newPost = new Post(post);
		newPost.setUser(user);
		postRepository.save(newPost);
		
//		for(String t : auction.getTags()) {
//			Tag newTag = new Tag();
//			newTag.setAuction(newAuction);
//			newTag.setTag(t);
//			tagRepository.save(newTag);
//		}
//		return newAuction.getAuctionid().toString();
		return "Created";
	}
	
	public Post findById(UUID id) {
		return postRepository.findById(id).get();
	}

}
