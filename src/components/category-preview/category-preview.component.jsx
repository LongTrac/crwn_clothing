import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.style.jsx'

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>

            <Title to={title}>
                {title.toUpperCase()}
            </Title>
            <Preview>
                {
                    products
                        .filter((_, index) => index < 5)      // _ means empty param
                        .map(product =>
                            <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;