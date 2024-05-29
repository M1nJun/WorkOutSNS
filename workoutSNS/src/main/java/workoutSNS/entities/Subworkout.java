package workoutSNS.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import workoutSNS.dtos.SubworkoutDTO;

@Entity
@Table(name="subworkouts")
public class Subworkout {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subworkoutID;
	@ManyToOne
	@JoinColumn(name="workoutID")
	private Workout workout;
	private String name;
	@OneToMany(mappedBy="subworkout")
	private List<Exercise> exercises;
	
	public Subworkout() {}
	
	public Subworkout(SubworkoutDTO core) {
		
	}

	public Integer getSubworkoutID() {
		return subworkoutID;
	}

	public void setSubworkoutID(Integer subworkoutID) {
		this.subworkoutID = subworkoutID;
	}

	public Workout getWorkout() {
		return workout;
	}

	public void setWorkout(Workout workout) {
		this.workout = workout;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(List<Exercise> exercises) {
		this.exercises = exercises;
	}

	
	
}