package workoutSNS.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.Post;
import workoutSNS.entities.User;

public interface PostRepository extends JpaRepository<Post, Integer>{
	List<Post> findByUser(User user);
	List<Post> findTopByUserOrderByDateDesc(User user);
}
