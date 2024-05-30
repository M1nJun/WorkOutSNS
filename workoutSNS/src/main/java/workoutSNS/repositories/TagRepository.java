package workoutSNS.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import workoutSNS.entities.Tag;

public interface TagRepository extends JpaRepository<Tag,Integer> {
	@Query("select t from Tag t where t.tag=:tag")
	List<Tag> findByTag(String tag);
}

