import { ProductCardContainer, Img, Footer, Name, Price } from './product-card.style.jsx'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON__TYPE_CLASS } from '../button/button.component'


const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product)
    }
    return (
        <ProductCardContainer >
            <Img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON__TYPE_CLASS.inverted}
                onClick={addProductToCart}>
                ADD TO CARD
            </Button>
        </ProductCardContainer>
    );
}

export default ProductCard