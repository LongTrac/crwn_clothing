import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CategoryTitle, CategoryContainer } from './category.style.jsx'
//import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCurrentCategoriesMap } from '../../store/categories/categories.selector.js';

const Category = () => {
    // this category is the param from the route in shop component
    const { category } = useParams();
    //const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCurrentCategoriesMap);
    const [products, setProduct] = useState(categoriesMap[category]);



    useEffect(() => {
        setProduct(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    // if product undefined dont render if it is then render the .map
                    products &&
                    products.map(
                        product => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </>

    );
}

export default Category;