package workoutSNS.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import workoutSNS.entities.Post;

public interface PostRepository  extends JpaRepository<Post,UUID>{

}
