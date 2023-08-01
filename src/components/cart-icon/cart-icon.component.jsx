import {CartIconContainer, ItemCount, ShoppingBagIcon} from'./cart-icon.style.jsx'
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";



const CartIcon = () => {

    const { isCartOpen, setisCartOpen,cartCount } = useContext(CartContext);   

    const toggleIsCartOpen = () => {
        setisCartOpen(!isCartOpen);
    }


    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className='shopping-icon' />
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;