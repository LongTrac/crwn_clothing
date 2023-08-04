import {CartItemContainer, Image, CartItemDetails}from'./cart-item.style.jsx'

const CartItem = ({cartItem}) => {
     const { name, quantity, imageUrl, price } = cartItem;

    return(
        <CartItemContainer>
            <Image src={imageUrl} alt={name}/>
            <CartItemDetails>

                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>

            </CartItemDetails>
        </CartItemContainer>);
}

export default CartItem;