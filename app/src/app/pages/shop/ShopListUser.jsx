import { useEffect } from "react";
import { useState } from "react";
import ShopService from "../../../src/services/shop.service";

const ShopListUser = () => {
    const [shopList, setShopList] = useState([]);

    const getShops = async () => {
        const response = await ShopService.getShopByUser();
        setShopList(response);
    }
    useEffect(() => {
        getShops();
        console.log(shopList);
    })
    return ( 
        <section>
            <h1>Shop List User</h1>

        </section>
     );
}
 
export default ShopListUser;