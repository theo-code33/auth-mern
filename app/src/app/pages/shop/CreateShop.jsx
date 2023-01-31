import { Box, TextField, Typography } from "@mui/material";
import CreateShopForm from "../../components/shop/form/CreateShopForm";

const CreateShop = () => {
    return ( 
        <Box>
            <Typography variant="h1">Créer votre shop</Typography>
            <CreateShopForm />
        </Box>
     );
}
 
export default CreateShop;