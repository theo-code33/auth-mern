import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShopService from "../../../../src/services/shop.service";

const ActionsButton = ({id, setShops}) => {
    const handleDelete = async () => {
        try {
            await ShopService.deleteShop(id)
            setShops((prevShops) => prevShops.filter((shop) => shop._id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div className="actions-button-container">
            <Button variant="contained">
                <Link to={"/update-shop/" + id}>Modifier</Link>
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
                Supprimer
            </Button>
        </div>
     );
}
 
export default ActionsButton;