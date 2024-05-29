package workoutSNS.dtos;

import java.time.LocalDate;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import workoutSNS.entities.Exercise;
import workoutSNS.entities.Post;
import workoutSNS.entities.Profile;
import workoutSNS.entities.Subworkout;
import workoutSNS.entities.User;
import workoutSNS.entities.Workout;

public class PostDTO {
	private int postID;
	private String userID;
	private LocalDate date;
	private String title;
	private String body;
//	private int workoutID;
//	private int subworkoutID;
	private int exerciseID;
	private int duration;
	private int calories;
	private String tips;
	
	public PostDTO() {}
	
	public PostDTO(Post core) {
		postID = core.getPostID().intValue();
		userID = core.getUser().getUserID().toString();
		date = core.getDate();
		title = core.getTitle();
		body = core.getBody();
		// turns out we don't need these because exercise will point back to those things
//		workoutID = core.getWorkout().getWorkoutID().intValue();
//		subworkoutID = core.getSubworkout().getSubworkoutID().intValue();
		exerciseID = core.getExercise().getExerciseID().intValue();
		duration = core.getDuration();
		calories = core.getCalories();
		tips = core.getTips();
	}

	public int getPostID() {
		return postID;
	}

	public void setPostID(int postID) {
		this.postID = postID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}


	public int getExerciseID() {
		return exerciseID;
	}

	public void setExerciseID(int exerciseID) {
		this.exerciseID = exerciseID;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getCalories() {
		return calories;
	}

	public void setCalories(int calories) {
		this.calories = calories;
	}

	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
	}
	
}
