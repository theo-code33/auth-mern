import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AuthService from "../../../src/services/auth.service";

const ForgotPasswordPage = () => {
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
        try {
            const response = await AuthService.forgotPassword(credentials)
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
                    id="email-input"
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={handleChange}
                />
                <Button type='submit' variant='contained'>Envoyer</Button>
                {success && <Typography>Email envoyé avec succés</Typography>}
                {error && <Typography>Une erreur est survenu. Veuillez réessayer ultérieurement</Typography>}
            </Box>
        </Box>
     );
}
 
export default ForgotPasswordPage;