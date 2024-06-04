import { useState,useRef,useEffect,useContext } from "react";
import AuthContext from "../AuthContext";
import PostCard from "./PostCard";

function PostsFeed(){
    const [posts, setPosts] = useState([]);
    const {jwt,setJwt} = useContext(AuthContext);

    //adding [jwt] as a dependency will make the useEffect re-run whenever the jwt is updated
    useEffect(() => {getPosts()},[jwt]);

    //get followings posts                                          
    function getPosts(){
        // Fetch posts data using the JWT token
        fetch('http://localhost:8085/post/followings/recent/posts', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((data) =>{
                console.log(data);
                setPosts(data)
            })
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