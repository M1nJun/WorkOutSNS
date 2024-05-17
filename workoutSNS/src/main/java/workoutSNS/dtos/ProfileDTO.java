package workoutSNS.dtos;

import workoutSNS.entities.Profile;

public class ProfileDTO {
	private String user;
	private String fullname;
	private String email;
	private String phone;
	private String bio;
	
	public ProfileDTO() {}
	
	public ProfileDTO(Profile core) {
		user = core.getUser().getUserID().toString();
		fullname = core.getFullname();
		email = core.getEmail();
		phone = core.getPhone();
		bio = core.getBio();
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
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
