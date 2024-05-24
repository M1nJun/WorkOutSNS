package workoutSNS.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.User;
import workoutSNS.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Integer>{
	List<Profile> findByEmail(String email);
	Profile findByUser(User user);
}
