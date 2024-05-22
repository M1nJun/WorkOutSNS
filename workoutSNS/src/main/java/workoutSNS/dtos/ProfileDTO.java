package workoutSNS.dtos;

import workoutSNS.entities.Profile;

public class ProfileDTO {
	private int profileID;
	private String userID;
	private String firstname;
	private String lastname;
	private String email;
	private String bio;
	
	public ProfileDTO() {}
	
	public ProfileDTO(Profile core) {
		profileID = core.getProfileID().intValue();
		userID = core.getUser().getUserID().toString();
		firstname = core.getFirstname();
		lastname = core.getLastname();
		email = core.getEmail();
		bio = core.getBio();
	}
	


	public int getProfileID() {
		return profileID;
	}

	public void setProfileID(int profileID) {
		this.profileID = profileID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

}
