package workoutSNS.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.Profile;


public interface ProfileRepository extends JpaRepository<Profile,Integer> {

}
