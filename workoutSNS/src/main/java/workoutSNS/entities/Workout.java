package workoutSNS.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import workoutSNS.dtos.WorkoutDTO;

@Entity
@Table(name="workouts")
public class Workout {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer workoutID;
	private String name;
	@OneToMany(mappedBy="workout")
	private List<Subworkout> subworkouts;
	public Workout() {}
	
	public Workout(WorkoutDTO core) {
		
	}

	public Integer getWorkoutID() {
		return workoutID;
	}

	public void setWorkoutID(Integer workoutID) {
		this.workoutID = workoutID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Subworkout> getSubworkouts() {
		return subworkouts;
	}

	public void setSubworkouts(List<Subworkout> subworkouts) {
		this.subworkouts = subworkouts;
	}
	
	
	
}
