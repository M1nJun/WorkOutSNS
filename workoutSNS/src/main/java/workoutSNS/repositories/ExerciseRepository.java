package workoutSNS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import workoutSNS.entities.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer>{

}
