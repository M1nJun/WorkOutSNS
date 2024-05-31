package workoutSNS.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import workoutSNS.dtos.PostDTO;
import workoutSNS.dtos.ProfileDTO;

@Entity
@Table(name="posts")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postID;
	@ManyToOne
	@JoinColumn(name="userID")
	private User user;
	private LocalDate date;
	private String title;
	private String body;
	private String workout;
	private String subworkout;
	private String exercise;
	private int duration;
	private int calories;
	private String tips;
	@OneToMany(mappedBy="post")
	List<Tag> tags;
	
	@OneToMany
    private List<User> likes;
	
	public Post() {}
	
	public Post(PostDTO core) {
		date = LocalDate.now();
		title = core.getTitle();
		body = core.getBody();
		workout = core.getWorkout();
		subworkout = core.getSubworkout();
		exercise = core.getExercise();
		duration = core.getDuration();
		calories = core.getCalories();
		tips = core.getTips();
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

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public Integer getPostID() {
		return postID;
	}

	public void setPostID(Integer postID) {
		this.postID = postID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public List<User> getLikes() {
		return likes;
	}

	public void setLikes(List<User> likes) {
		this.likes = likes;
	}
	
	
	
}
