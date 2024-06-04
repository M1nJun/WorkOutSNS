package workoutSNS.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workoutSNS.dtos.PostDTO;
import workoutSNS.dtos.ProfileDTO;
import workoutSNS.entities.Post;
import workoutSNS.entities.Profile;
import workoutSNS.entities.Tag;
import workoutSNS.entities.User;
import workoutSNS.repositories.PostRepository;
import workoutSNS.repositories.TagRepository;
import workoutSNS.repositories.UserRepository;

@Service
public class PostService {
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	TagRepository tagRepository;
	
	
	public String save(PostDTO post) {
		
        Post newPost = new Post(post);
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(post.getUserID()));
		if(!maybeUser.isPresent()) 
			return "Bad Id";
		User user = maybeUser.get();
		newPost.setUser(user);
		
		postRepository.save(newPost);
		
		for(String t : post.getTags()) {
			Tag newTag = new Tag();
			newTag.setPost(newPost);
			newTag.setTag(t);
			tagRepository.save(newTag);
		}
		return newPost.getPostID().toString();
	}
	
	public List<Post> findByUser(String id){
		Optional<User> u = userRepository.findById(UUID.fromString(id));
		if(u.isPresent())
			return postRepository.findByUser(u.get());
		return new ArrayList<Post>();
	}
	
	public List<Post> findByTag(String tag) {
		List<Post> results = new ArrayList<Post>();
		List<Tag> tags = tagRepository.findByTag(tag);
		for(Tag t: tags) {
			results.add(t.getPost());
		}
		return results;
	}
	
	public Post findRecentPostByUser(String id) {
	    Optional<User> user = userRepository.findById(UUID.fromString(id));
	    if (user.isPresent()) {
	        List<Post> posts = postRepository.findTopByUserOrderByDateDesc(user.get());
	        if (!posts.isEmpty()) {
	            return posts.get(0);
	        }
	    }
	    return null;
	}
	
	public List<Post> findRecentPostsOfFollowings(String id){
		User user = new User();
		Optional<User> maybeUser = userRepository.findById(UUID.fromString(id));
		if(!maybeUser.isPresent()) 
			return null;
		user = maybeUser.get();
		List<User> followings = user.getFollowings();
		List<Post> followingsPosts = new ArrayList<Post>();
		for (User f : followings) {
			List<Post> singleFollowingsPosts = postRepository.findTopByUserOrderByDateDesc(f);
			followingsPosts.addAll(singleFollowingsPosts);
		}
		return followingsPosts;
	}
	
	public String likePost(String postid, UUID userid) {
		Optional<User> user = userRepository.findById(userid);
		Optional<Post> post = postRepository.findById(Integer.parseInt(postid));
		Post likedPost = post.get();
		if (likedPost.getLikes().contains(user.get())) {
			return "user already liked the post";
		}
		likedPost.getLikes().add(user.get());
		postRepository.save(likedPost);
		return "like success";
	}
	
	public String countLike(String postid) {
		Optional<Post> post = postRepository.findById(Integer.parseInt(postid));
		return String.valueOf(post.get().getLikes().size());
	}
	
	public Boolean checkLike(String postid, UUID userid) {
		Optional<User> user = userRepository.findById(userid);
		Optional<Post> post = postRepository.findById(Integer.parseInt(postid));
		
		return post.get().getLikes().contains(user.get());

	}
}
