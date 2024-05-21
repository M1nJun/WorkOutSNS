package workoutSNS.repositories;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.User;

public interface UserRepository extends JpaRepository<User,UUID>{
	List<User> findByUsername(String username);
}