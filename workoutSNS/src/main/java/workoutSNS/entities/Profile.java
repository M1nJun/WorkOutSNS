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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import workoutSNS.dtos.ProfileDTO;


@Entity
@Table(name="profiles")
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileID;
	
	@OneToOne
	@JoinColumn(name="user")
	private User user;
	
	private String fullname;
	private String email;
	private String phone;
	private String bio;
	
	public Profile() {}

	public Profile(ProfileDTO core) {
		fullname=core.getFullname();
		email = core.getEmail();
		phone = core.getPhone();
		bio = core.getBio();
	}

	public Integer getProfileID() {
		return profileID;
	}

	public void setProfileID(Integer profileID) {
		this.profileID = profileID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}
	
	
	
	

}
