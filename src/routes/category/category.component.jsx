import './category.style.scss'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    // this category is the param from the route in shop component
    const { category } = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProduct] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProduct(categoriesMap[category]);
    },[category, categoriesMap])

    return(
        <div className='category-container'>
            { 
                // if product undefined dont render if it is then render the .map
                products && 
                products.map(
                    product => <ProductCard key={product.id} product={product}/>)
            }
        </div>
    );
}
    
export default Category;