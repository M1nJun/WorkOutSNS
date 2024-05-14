package workoutSNS.entities;

import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(columnDefinition = "VARCHAR(45)")
	@JdbcTypeCode(SqlTypes.VARCHAR)
	private UUID userID;
	private String username;
	private String password;
//	@OneToMany(mappedBy="user")
//	List<Review> reviews;
//	@OneToMany(mappedBy="user")
//	List<Response> responses;
	
	public User() {}

	public UUID getUserID() {
		return userID;
	}

	public void setUserID(UUID userID) {
		this.userID = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
//	public List<Review> getReviews() {
//		return reviews;
//	}
//
//	public void setReviews(List<Review> reviews) {
//		this.reviews = reviews;
//	}

}