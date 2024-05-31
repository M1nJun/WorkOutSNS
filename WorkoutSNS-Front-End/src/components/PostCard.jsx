import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import andrew from '../andrew.jpg';
import AddReactionIcon from '@mui/icons-material/AddReaction';

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
    
    const {
        title,
        tags,
        workout,
        subworkout,
        exercise,
        caption,
        tips,
        duration,
        calories
    } = post;

    //get userID

    const username = "me";


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
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                {notMe ? (
                    <IconButton aria-label="follow">
                        <AddReactionIcon />
                    </IconButton>
                ) : null}
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
