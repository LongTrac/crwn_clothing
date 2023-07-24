import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-item.style.scss'

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const { name, quantity, price, imageUrl } = cartItem

    const removeItemHandler = () => { removeItemFromCart(cartItem) }
    const addItemHandler = () => addItemToCart(cartItem)
    const clearItemHandler = () => { clearItemFromCart(cartItem) }

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="name">{name}</div>
            <div className="quantity">
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </div>
            <div className="price">{price}</div>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>

        </div>)
}

export default CheckoutItem;