import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopService from "../../../src/services/shop.service";
import UpdateShopForm from "../../components/shop/form/UpdateShopForm";

const UpdateShop = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);

    const getShop = async () => {
        const response = await ShopService.getOneById(id);
        setShop(response);
    }

    useEffect(() => {
        getShop();
    },[])

    return ( 
        <>
            {shop &&
                <UpdateShopForm shop={shop}/>
            }
        </>
     );
}
 
export default UpdateShop;