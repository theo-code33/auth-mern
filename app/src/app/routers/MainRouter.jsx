import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../src/context/UserContext";
import AuthPage from "../pages/auth/AuthPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateShop from "../pages/shop/CreateShop";
import ShopList from "../pages/shop/ShopList";
import ShopListUser from "../pages/shop/ShopListUser";
import ShopSingle from "../pages/shop/ShopSingle";
import Account from "../pages/user/Account";
import ProtectedRoute from "./ProtectedRoute";

const MainRouter = () => {
    const { user } = useContext(UserContext);

    return ( 
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shops" element={<ShopList />} />
                <Route path="/shop/:id" element={<ShopSingle />} />
                <Route path="*" element={<NotFoundPage />} />
                
                {!user && <Route path="/auth" element={<AuthPage />} />}

                <Route path="/account" element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route path="/create-shop" element={
                    <ProtectedRoute>
                        <CreateShop />
                    </ProtectedRoute>
                }
                />
                <Route path="/my-shops" element={
                    <ProtectedRoute>
                        <ShopListUser />
                    </ProtectedRoute>
                }
                />

            </Routes>
        </>
     );
}
 
export default MainRouter;