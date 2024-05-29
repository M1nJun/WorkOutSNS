package workoutSNS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer>{

}
