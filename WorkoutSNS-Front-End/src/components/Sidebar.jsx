// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { HomeIcon, SearchIcon } from 'lucide-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';

const Sidebar = () => {
  const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: '#000000',
  }));
  return (
    <Drawer variant="permanent"
    anchor="left"
    sx={{
      width: 180,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF', 
        color: '#000000', 
      },
    }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <StyledListItemIcon>
                <HomeIcon/>
            </StyledListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <StyledListItemIcon>
                <AccountCircleIcon></AccountCircleIcon>
            </StyledListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/search">
            <StyledListItemIcon>
                <SearchIcon></SearchIcon>
            </StyledListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/newPost">
            <StyledListItemIcon>
                <PostAddIcon></PostAddIcon>
            </StyledListItemIcon>
            <ListItemText primary="New Post" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
