import { useEffect } from "react";
import { useState } from "react";
import ShopService from "../../../src/services/shop.service";
import ActionsButton from "../../components/shop/actions/ActionsButton";
import ShopItem from "../../components/shop/ShopItem";

const ShopListUser = () => {
    const [shopList, setShopList] = useState([]);

    const getShops = async () => {
        const response = await ShopService.getShopByUser();
        setShopList(response);
    }
    useEffect(() => {
        getShops();
    },[])
    return ( 
        <section>
            <h1>Shop List User</h1>
            {shopList && shopList.map((shop) => (
                <div>
                    <ShopItem key={shop._id} shop={shop} />
                    <ActionsButton id={shop._id} setShops={setShopList}/>
                </div>
            ))}
        </section>
     );
}
 
export default ShopListUser;