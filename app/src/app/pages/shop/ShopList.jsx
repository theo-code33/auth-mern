import { useEffect, useState } from "react";
import ShopService from "../../../src/services/shop.service";
import ShopItem from "../../components/shop/ShopItem";

const ShopList = () => {
    const [shops, setShops] = useState([]);

    const fetchShops = async () => {
        const response = await ShopService.getAll();
        setShops(response);
    }
    useEffect(() => {
        fetchShops();
    }, [])
    return ( 
        <div>
            {shops && shops.map(shop => (
                <ShopItem key={shop.id} shop={shop} />
            ))}
        </div>
     );
}
 
export default ShopList;