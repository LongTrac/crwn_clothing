import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.style.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckout = () => {
        const path = `Checkout`
        navigate(path);
    }
    

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((item) => {
                        return (<CartItem key={item.id} cartItem={item} />);
                    })
                }
            </div>
            <Button onClick={goToCheckout} >GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;