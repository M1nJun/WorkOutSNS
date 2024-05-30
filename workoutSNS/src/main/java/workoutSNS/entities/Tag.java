package workoutSNS.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tags")
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tagID;
	
	@ManyToOne
	@JoinColumn(name="postID")
	private Post post;
	
	private String tag;
	
	public Tag() {}
	
	
	public Integer getTagID() {
		return tagID;
	}



	public void setTagID(Integer tagID) {
		this.tagID = tagID;
	}



	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	
	
	

}
