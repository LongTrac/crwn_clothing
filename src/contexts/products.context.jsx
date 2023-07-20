import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setproducts] = useState(PRODUCTS);
    const value = {products};                           // we just want to display the product without modifying anything

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>

}