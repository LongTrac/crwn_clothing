import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../contexts/products.context";
import { useContext } from 'react';

import './shop.style.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext);

    return(
        <div className="products-container">
            {products.map((item)=>{
                return(
                    <ProductCard key={item.id} product={item}/>
                );
            })}
        </div>
    );
}

export default Shop;