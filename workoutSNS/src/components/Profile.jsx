import { useState,useRef,useEffect,useContext } from "react";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
function Profile() {
    useEffect(() => {getProfile()},[]);
    let nameInput = useRef();
    let interestsInput = useRef();

    const jwt = useContext(AuthContext);
    const [profile,setProfile] = useState();
    

    function getProfile() {
        const headers = {"Authorization" : "Bearer "+jwt};
        fetch("http://localhost:8085/profile", {method:"GET",headers:headers}).then(silentJSON)
            .then(response=>{setProfile(response)});
    }
    function updateProfile() {
        const headers = {"Authorization" : "Bearer "+jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {fullname:nameInput.current.value,interests:interestsInput.current.value};
        fetch("http://localhost:8085/profile/update", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Profile updated."));
    }
    function createProfile() {
        const headers = {"Authorization" : "Bearer "+jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {fullname:nameInput.current.value,interests:interestsInput.current.value};
        fetch("http://localhost:8085/profile/create", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Profile created."));
    }

    if(jwt.length == 0)
        return (
            <p>You are not logged in to your account.</p>
        );
    else if(profile)
        return (
            <>
            <h4>Edit your profile</h4>
            <p>Your name: <input type="text" ref={nameInput} defaultValue={profile.fullname} /></p>
            <p>Your interests: <input type="text" ref={interestsInput} defaultValue={profile.interests}/></p>
            <p><button onClick={updateProfile}>Update Profile</button></p>
            </>
        );
    else
        return (
            <>
            <h4>Create your profile</h4>
            <p>Your name: <input type="text" ref={nameInput} /></p>
            <p>Your interests: <input type="text" ref={interestsInput} /></p>
            <p><button onClick={createProfile}>Create Profile</button></p>
            </>
        );
}

export default Profile;