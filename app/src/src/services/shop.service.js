import instance from "./api.service";

const getAll = async () => {
    const response = await instance.get('/shops');
    return response.data;
}

const getShopByUser = async () => {
    const response = await instance.get('/user-shops');
    return response.data;
}

const createShop = async (credentials) => {
    const response = await instance.post('/shops', credentials);
    return response.data;
}
const getOneById = async (id) => {
    const response = await instance.get(`/shop/${id}`);
    return response.data;
}

const ShopService = {
    getAll,
    getShopByUser,
    createShop,
    getOneById
}

export default ShopService;