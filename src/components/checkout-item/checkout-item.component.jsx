import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton} from './checkout-item.style.jsx'

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const { name, quantity, price, imageUrl } = cartItem

    const removeItemHandler = () => { removeItemFromCart(cartItem) }
    const addItemHandler = () => addItemToCart(cartItem)
    const clearItemHandler = () => { clearItemFromCart(cartItem) }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>

        </CheckoutItemContainer>)
}

export default CheckoutItem;