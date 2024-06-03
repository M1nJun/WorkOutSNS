import React from 'react';
import { Button, Card, CardContent, Typography, Grid, Avatar, CardHeader} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'dark-grey', // Dark background color
  color: '#fff',              // White text color
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[600]}`, // Adding a subtle border
  margin: 5,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledBio = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const UserProfileCard = ({ profile, notMe }) => {
  return (
    <StyledCard>
        <CardHeader
            avatar={
                <StyledAvatar>
                {profile.firstname.charAt(0)}{profile.lastname.charAt(0)}
                </StyledAvatar>
            }
            title={`${profile.firstname} ${profile.lastname}`}
            titleTypographyProps={{ align: 'center', variant: 'h6' }}
        />
        <CardContent>
            <Grid container spacing={1} alignItems="center">
                <StyledGridItem item xs={12}>
                <Typography variant="body1" align="center">
                    {profile.email}
                </Typography>
                </StyledGridItem>
                <Grid item xs={12}>
                <StyledBio variant="body2" align="center">
                    {profile.bio}
                </StyledBio>
                </Grid>
                {notMe?(<Button
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to="/UserProfilePage"
                state={{ profile: profile }} 
                startIcon={<VisibilityIcon />}
                  >
                  View Profile
                </Button>):(null)}

            </Grid>
        </CardContent>
  </StyledCard>
  );
};

export default UserProfileCard;
