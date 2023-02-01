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
                    <img src={shop.imgUrl} alt="shop item" />
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