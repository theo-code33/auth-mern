import { Box } from "@mui/material";
import UserUpdateForm from "../../components/user/form/UserUpdateForm";

const Account = () => {
    return ( 
        <Box sx={{height: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>Account</h1>
            <UserUpdateForm/>
        </Box> 
    );
}
 
export default Account;