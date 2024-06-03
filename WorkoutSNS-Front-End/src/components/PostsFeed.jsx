import { useState,useRef,useEffect,useContext } from "react";
import AuthContext from "../AuthContext";
import PostCard from "./PostCard";

function PostsFeed(){
    const [posts, setPosts] = useState([]);
    const jwt = useContext(AuthContext);
    const [followers,setFollowers] = useState([]);
    const [followings,setFollowings]=useState([]);

    //adding [jwt] as a dependency will make the useEffect re-run whenever the jwt is updated
    useEffect(() => {getPosts()},[jwt]);


    function getFollowings(){
        // Fetch posts data using the JWT token
        fetch('http://localhost:8085/user/getFollowings', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFollowings(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }

    function getFollowers(){
        // Fetch posts data using the JWT token
        fetch('http://localhost:8085/user/getFollowers', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFollowers(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }

    //get their posts                                          
    function getPosts(){
        // Fetch posts data using the JWT token
        fetch('http://localhost:8085/post', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }

    return(
        <>
        <div>
            <h2>Posts Feed</h2>
            <ul>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </ul>
        </div>
        </>
    );
};

export default PostsFeed;