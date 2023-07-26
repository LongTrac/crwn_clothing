import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import { Fragment, useContext } from 'react';

import './shop.style.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    const titleArray = Object.keys(categoriesMap);
    return (
        <Fragment>
            {
                titleArray.map(title =>
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className="products-container">
                            {categoriesMap[title].map((item) => {
                                return (
                                    <ProductCard key={item.id} product={item} />
                                );
                            })}
                        </div>
                    </Fragment>
                )
            }


        </Fragment>
    );
}

export default Shop;