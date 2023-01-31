import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ShopService from "../../../../src/services/shop.service";

const CreateShopForm = () => {

    const [credentials, setCredentials] = useState({})
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setError(false)
        setSuccess(false)
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("credentials => ", credentials);
        try {
            await ShopService.createShop(credentials)
            setSuccess(true)
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    return ( 
        <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                id="name-input"
                name='name'
                label="Nom de la boutique"
                variant="outlined"
                onInput={handleChange}
            />
            <TextField 
                id="img-url-input"
                name='imgUrl'
                label="Image de la boutique"
                variant="outlined"
                onInput={handleChange}
            />
            <TextField 
                id="location-input"
                name='location'
                label="Adresse de la boutique"
                variant="outlined"
                onInput={handleChange}
            />
            <TextField 
                id="description-input"
                name='description'
                label="Description de la boutique"
                variant="outlined"
                multiline
                rows={4}
                onInput={handleChange}
            />
            <Button type='submit' variant='contained'>Créer</Button>
            {success && <Typography>Boutique créé avec succés</Typography>}
            {error && <Typography>Une erreur est survenu. Veuillez réessayer ultérieurement</Typography>}
            
        </Box>
     );
}
 
export default CreateShopForm;