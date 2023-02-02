import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../../src/services/auth.service";

const ResetPasswordPage = () => {
    const [credentials, setCredentials] = useState({})
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {token} = useParams()

    const handleChange = (e) => {
        setError(false)
        setSuccess(false)
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await AuthService.resetPassword({token, ...credentials})
            setSuccess(true)
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }
    return ( 
        <Box>
            <Typography variant="h1">Réinitialiser votre mot de passe</Typography>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} component="form" onSubmit={handleSubmit}>
                <TextField 
                    id="password-input"
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                />
                <Button type='submit' variant='contained'>Envoyer</Button>
                {success && <Typography>Mot de passe modifié avec succés</Typography>}
                {error && <Typography>Une erreur est survenu. Veuillez réessayer ultérieurement</Typography>}
            </Box>
        </Box>
     );
}
 
export default ResetPasswordPage;