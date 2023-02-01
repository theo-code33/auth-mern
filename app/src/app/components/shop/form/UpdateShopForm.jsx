import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ShopService from "../../../../src/services/shop.service";

const UpdateShopForm = ({shop}) => {
    const [credentials, setCredentials] = useState(shop)
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
            await ShopService.updateShop(shop._id ,credentials)
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
                defaultValue={credentials.name}
                onInput={handleChange}
            />
            <TextField 
                id="img-url-input"
                name='imgUrl'
                label="Image de la boutique"
                variant="outlined"
                defaultValue={credentials.imgUrl}
                onInput={handleChange}
            />
            <TextField 
                id="location-input"
                name='location'
                label="Adresse de la boutique"
                variant="outlined"
                defaultValue={credentials.location}
                onInput={handleChange}
            />
            <TextField 
                id="description-input"
                name='description'
                label="Description de la boutique"
                variant="outlined"
                multiline
                rows={4}
                defaultValue={credentials.description}
                onInput={handleChange}
            />
            <Button type='submit' variant='contained'>Modifier</Button>
            {success && <Typography>Boutique modifiée avec succés</Typography>}
            {error && <Typography>Une erreur est survenu. Veuillez réessayer ultérieurement</Typography>}
        
        </Box>

     );
}
 
export default UpdateShopForm
;