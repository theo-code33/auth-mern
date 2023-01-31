import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../src/context/UserContext"

const MainNavbar = () => {
    const { user, signout } = useContext(UserContext);

    return ( 
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shops">Shops</Link></li>
                {!user && 
                    <>    
                        <li><Link to="/auth">Signin</Link></li>
                        <li><Link to="/auth">Signup</Link></li>
                    </>
                }
                {user && 
                    <>
                        <li><Link to="/account">account</Link></li>
                        <li><Link to="/my-shops">Mes boutiques</Link></li>
                        <li><Link to="/create-shop">Créer une boutique</Link></li>
                        <li onClick={signout}>Logout</li>
                    </>
                }
            </ul>
        </nav>
     );
}
 
export default MainNavbar;