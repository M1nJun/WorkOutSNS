package workoutSNS.dtos;

import workoutSNS.entities.Post;

public class PostDTO {
	private String user;
	private String date;
	private String title;
	private String tagPeople;
	private String workoutType;
	private String subWorkoutType;
	private String exercise;
	private String caption;
	private String tips;
	private int duration;
	private int calories;
	
	public PostDTO() {}
	
	public PostDTO(Post core) {
		user = core.getUser().getUserID().toString();
		date = core.getDate();
		title = core.getTitle();
		tagPeople = core.getTagPeople();
		workoutType =core.getWorkoutType();
		subWorkoutType =core.getSubWorkoutType();
		exercise = core.getExercise();
		caption = core.getCaption();
		tips = core.getTips();
		duration = core.getDuration();
		calories = core.getCalories();	
		
	}
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTagPeople() {
		return tagPeople;
	}

	public void setTagPeople(String tagPeople) {
		this.tagPeople = tagPeople;
	}

	public String getWorkoutType() {
		return workoutType;
	}

	public void setWorkoutType(String workoutType) {
		this.workoutType = workoutType;
	}

	public String getSubWorkoutType() {
		return subWorkoutType;
	}

	public void setSubWorkoutType(String subWorkoutType) {
		this.subWorkoutType = subWorkoutType;
	}

	public String getExercise() {
		return exercise;
	}

	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
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
}
