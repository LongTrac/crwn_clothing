import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.style.jsx'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckout = () => {
        const path = `Checkout`
        navigate(path);
    }


    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    !cartItems.length
                        ? <EmptyMessage> Your cart is empty</EmptyMessage>
                        : cartItems.map((item) => {
                            return (<CartItem key={item.id} cartItem={item} />);
                        })
                }
            </CartItems>
            <Button onClick={goToCheckout} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;