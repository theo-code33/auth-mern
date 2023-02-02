import { AppBar, Box, List, ListItem, ListItemButton } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../src/context/UserContext"

const MainNavbar = () => {
    const { user, signout } = useContext(UserContext);

    return ( 
        <AppBar component="nav">
            <Box sx={{mr: "50px"}}>
                <List sx={{display: "flex", justifyContent: "flex-end"}}>
                    <ListItem disablePadding sx={{width: "max-content"}}>
                        <ListItemButton>
                            <Link to="/">Home</Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{width: "max-content"}}>
                        <ListItemButton>
                            <Link to="/shops">Shops</Link>
                        </ListItemButton>
                    </ListItem>
                    {!user && 
                        <>    
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton>
                                    <Link to="/auth">Signin</Link>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton>
                                    <Link to="/auth">Signup</Link>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                    {user && 
                        <>
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton>
                                    <Link to="/account">Account</Link>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton>
                                    <Link to="/my-shops">My shops</Link>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton>
                                    <Link to="/create-shop">Create shop</Link>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={{width: "max-content"}}>
                                <ListItemButton onClick={signout} sx={{ textAlign: 'center' }}>
                                    Logout
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                </List>
            </Box>
        </AppBar>
     );
}
 
export default MainNavbar;