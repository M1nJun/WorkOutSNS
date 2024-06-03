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
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      <Link to="/profile">Profile</Link>{" "}
      <Link to="/search">Search</Link>{" "}
      <Link to="/newPost">New Post</Link>{" "}
    </nav>
  );
};

export default Navbar;

    // <NavigationMenu className="sidebar">
    //   <NavigationMenuItem>
    //     <NavigationMenuLink as={Link} to="/" className={navigationMenuTriggerStyle()}>
    //       Home
    //     </NavigationMenuLink>
    //   </NavigationMenuItem>

    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Account</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <NavigationMenuLink as={Link} to="/profile" className={navigationMenuTriggerStyle()}>
    //           Profile
    //         </NavigationMenuLink>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>

    //   <NavigationMenuItem>
    //     <NavigationMenuLink as={Link} to="/search" className={navigationMenuTriggerStyle()}>
    //       Search
    //     </NavigationMenuLink>
    //   </NavigationMenuItem>

    //   <NavigationMenuItem>
    //     <NavigationMenuLink as={Link} to="/newPost" className={navigationMenuTriggerStyle()}>
    //       New Post
    //     </NavigationMenuLink>
    //   </NavigationMenuItem>
    // </NavigationMenu>
