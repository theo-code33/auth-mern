import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { UserContext } from "../../../../src/context/UserContext"
import TokenService from '../../../../src/services/token.service';
import UserService from "../../../../src/services/user.service"

const UserUpdateForm = () => {
    const { user, setUser } = useContext(UserContext)
    const [credentials, setCredentials] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
    })
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
            const response = await UserService.update(credentials)
            console.log("response => ", response);
            TokenService.setTokenInLocalStorage(response.accessToken)
            const user = TokenService.getUserFromLocalToken()
            setUser(user)
            setSuccess(true)
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }



    return ( 
        <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                id="email-input"
                name='email'
                label="Email"
                variant="outlined"
                type="email"
                onInput={handleChange}
            />
            <TextField 
                id="firstName-input"
                name='firstName'
                label="Prénom"
                variant="outlined"
                defaultValue={credentials.firstName}
                onInput={handleChange}
            />
            <TextField 
                id="lastName-input"
                name='lastName'
                label="Nom"
                variant="outlined"
                defaultValue={credentials.lastName}
                onInput={handleChange}
            />
            <TextField 
                id="current-password-input"
                name='currentPassword'
                label="Mot de passe Actuel"
                variant="outlined"
                type="password"
                onInput={handleChange}
            />
            <TextField 
                id="new-password-input"
                name='newPassword'
                label="Nouveau mot de passe"
                variant="outlined"
                type="password"
                onInput={handleChange}
            />
            <Button type='submit' variant='contained'>Envoyer</Button>
            {success && <Typography>Modification effectuée avec succés</Typography>}
            {error && <Typography>Une erreur est survenu. Veuillez réessayer ultérieurement</Typography>}
            
        </Box>
     );
}
 
export default UserUpdateForm;