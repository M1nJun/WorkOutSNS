package workoutSNS.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import workoutSNS.entities.User;
import workoutSNS.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Integer>{
	Profile findByUser(User user);
	
	@Query("SELECT p FROM Profile p WHERE " +
	           "LOWER(p.firstname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(p.lastname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(p.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	Optional<List<Profile>> findByKeyword(String keyword);
}
