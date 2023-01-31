import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopService from "../../../src/services/shop.service";

const ShopSingle = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);

    const fetchShop = async () => {
        const response = await ShopService.getOneById(id);
        setShop(response);
    }

    useEffect(() => {
        fetchShop();
    }, [])
    return (
        <>
        {shop && 
            <div className="shop-single">
                <div className="shop-single__image">
                    <img src="https://images.unsplash.com/photo-1611831920003-8b8b2b2b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="shop item" />
                </div>
                <div className="shop-single__content">
                    <h3 className="shop-single__title">{shop.name}</h3>
                    <p className="shop-single__location">{shop.location}</p>
                    <p className="shop-single__description">{shop.description}</p>
                </div>
            </div>
        }
        </>

     );
}
 
export default ShopSingle;