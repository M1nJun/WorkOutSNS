import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';   
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import andrew from '../andrew.jpg';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from '@/AuthContext';
import { useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostCard = ({ post, notMe }) => {
    const {jwt,setJwt} = useContext(AuthContext);
    const [likesCount,setLikesCount]=useState(0);
    const [followStatus,setFollowStatus]=useState(false);
    const {
        title,
        tags,
        workout,
        subworkout,
        exercise,
        caption,
        tips,
        duration,
        calories,
        postID,
        userID
    } = post;

    const username = "me";

    useEffect(() => {
        getPostLikes();
        checkFollow();
    }, [jwt, postID, userID]);
    

    function checkFollow() {
        fetch(`http://localhost:8085/user/follow/check/${userID}`, {
            method: "GET",  
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then(response => response.json())
            .then(data => {
                setFollowStatus(data);  // Ensure the follow status is set correctly
            })
            .catch((error) => {
                console.log(error);
                alert("Check follow status failed");
            });
    }

    function postFollow(){
        fetch('http://localhost:8085/user/follow/'+userID, {
            method: "POST",
            headers: {
              "Authorization" : "Bearer "+ jwt,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => {
            if (response.ok) {
                setFollowStatus(true);
            }
            })
          .catch((error) => {
            console.log(error);
            alert("Login failed");
          });
    }

    function getPostLikes(){
        fetch('http://localhost:8085/post/'+postID+'/like/count', {
            method: "GET",
            headers: {
              "Authorization" : "Bearer "+ jwt,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
            })
            .then(data => {
                setLikesCount(data);
            })
          .catch((error) => {
            console.log(error);
            alert("Login failed");
          });
      }
        
        function postLikes(){
          fetch('http://localhost:8085/post/'+postID+'/like', {
            method: "POST",
            headers: {
              "Authorization" : "Bearer "+ jwt,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => {
            if (response.ok) {
                setLikesCount(likesCount + 1);
            }
            })
          .catch((error) => {
            console.log(error);
            alert("Login failed");
          });
        }


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username[0].toUpperCase()}
                    </Avatar>
                }
                title={title}              
            />
            <CardMedia
                component="img"
                height="194"
                image={andrew}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {caption}
                </Typography>
               
                {notMe && !followStatus ? (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={postFollow}
                    >
                        Follow
                    </Button>
                ) : notMe && followStatus ? (
                    <Typography variant="body2" color="text.secondary">
                        Followed <CheckCircleIcon style={{ color: 'green', verticalAlign: 'middle' }} />
                    </Typography>
                ) : null}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={postLikes}>
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {likesCount}
                </Typography>
              
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Workout Details:</Typography>
                    <Typography paragraph><strong>Tags:</strong> {tags.join(', ')}</Typography>
                    <Typography paragraph><strong>Workout Type:</strong> {workout}</Typography>
                    <Typography paragraph><strong>Sub-Workout Type:</strong> {subworkout}</Typography>
                    <Typography paragraph><strong>Exercise:</strong> {exercise}</Typography>
                    <Typography paragraph><strong>Duration:</strong> {duration} minutes</Typography>
                    <Typography paragraph><strong>Calories Burned:</strong> {calories}</Typography>
                    <Typography paragraph><strong>Tips:</strong> {tips}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default PostCard;
