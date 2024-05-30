package workoutSNS.dtos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import workoutSNS.entities.Post;
import workoutSNS.entities.Tag;

public class PostDTO {
	private int postID;
	private String userID;
	private LocalDate date;
	private String title;
	private String body;
	private String workout;
	private String subworkout;
	private String exercise;
	private int duration;
	private int calories;
	private String tips;
	private List<String> tags;
	
	public PostDTO() {}
	
	public PostDTO(Post core) {
		postID = core.getPostID().intValue();
		userID = core.getUser().getUserID().toString();
		date = core.getDate();
		title = core.getTitle();
		body = core.getBody();
		workout = core.getWorkout();
		subworkout = core.getSubworkout();
		exercise = core.getExercise();
		duration = core.getDuration();
		calories = core.getCalories();
		tips = core.getTips();
		tags = new ArrayList<String>();
		List<Tag> tagList = core.getTags();
		for(Tag t : tagList) {
			tags.add(t.getTag());
		}
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

	public String getWorkout() {
		return workout;
	}

	public void setWorkout(String workout) {
		this.workout = workout;
	}

	public String getSubworkout() {
		return subworkout;
	}

	public void setSubworkout(String subworkout) {
		this.subworkout = subworkout;
	}

	public String getExercise() {
		return exercise;
	}

	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
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
