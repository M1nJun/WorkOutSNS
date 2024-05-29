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
import workoutSNS.dtos.ExerciseDTO;

@Entity
@Table(name="exercises")
public class Exercise {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseID;
	@ManyToOne
	@JoinColumn(name="subworkoutID")
	private Subworkout subworkout;
	private String name;
	@OneToMany(mappedBy="exercise")
	private List<Post> posts;
	
	public Exercise() {}
	
	public Exercise(ExerciseDTO core) {
		
	}

	public Integer getExerciseID() {
		return exerciseID;
	}

	public void setExerciseID(Integer exerciseID) {
		this.exerciseID = exerciseID;
	}

	public Subworkout getSubworkout() {
		return subworkout;
	}

	public void setSubworkout(Subworkout subworkout) {
		this.subworkout = subworkout;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
