import React from 'react';
import { Link } from 'react-router-dom'; 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
//className={navigationMenuTriggerStyle()}

import "../styles/Navbar.css";



 
const Navbar = () => {
  return (
    <NavigationMenu className="sidebar">
      <NavigationMenuItem>
        <Link to="/">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Account</NavigationMenuTrigger>
        <NavigationMenuContent>
          <Link to="/profile">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
          </Link>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link to="/search">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Search</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link to="/newPost">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>New Post</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default Navbar;
