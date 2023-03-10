import { Link } from "react-router-dom";

const ShopItem = ({shop}) => {
    return ( 
        <div className="shop-item">
            <Link to={"/shop/" + shop._id}>
                <div className="shop-item__image">
                    <img src={shop.imgUrl} alt="shop item" />
                </div>
                <div className="shop-item__content">
                    <h3 className="shop-item__title">{shop.name}</h3>
                </div>
            </Link>
        </div>
     );
}
 
export default ShopItem;