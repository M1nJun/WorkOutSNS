import { useState,useRef,useEffect,useContext } from "react";
import AuthContext from "../AuthContext";
import PostCard from "./PostCard";

function PostsFeed(){
    const [posts, setPosts] = useState([]);
    const jwt = useContext(AuthContext);

    //adding [jwt] as a dependency will make the useEffect re-run whenever the jwt is updated
    useEffect(() => {getPosts()},[jwt]);

    //when we get the posts, each post should have a property that displays the username of the person who made the post
    
    function getPosts(){
        // Fetch posts data using the JWT token
        fetch('http://localhost:8085/posts', {
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