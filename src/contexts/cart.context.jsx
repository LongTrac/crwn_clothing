import { createContext, useEffect, useState } from "react";

//helper method:
//note : return new obj and not mutation of the old obj 
//Reason: if react see the old array, it will not re render components
const addCartItem = (cartItems, productToAdd) => {
    // find id cart items contain the product

    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //if found ==> increment the quantity and return this array
    if (existingItem) {
        return (
            //map thru the cart Items array, if it is the product to be affected, then return a new obj with the quantity modified, if not then return gud ol item
            cartItems.map((cartItem) =>
                cartItem.id === productToAdd.id ?
                    { ...cartItem, quantity: cartItem.quantity + 1 } :
                    cartItem)
        );
    }
    //return new array with newly added item
    return [...cartItems, { ...productToAdd, quantity: 1 }];

}

const removeCartItem = (cartItems, productToRemove) => {
    // find id cart items contain the product

    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );
    //if found ==> check if quantity === 1 if yes then fi;ter to remove
    if (existingItem.quantity === 1)
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);

    return (
        //map thru the cart Items array, if it is the product to be affected, then return a new obj with the quantity modified, if not then return gud ol item
        cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id ?
                { ...cartItem, quantity: cartItem.quantity - 1 } :
                cartItem)
    );
}

const clearProduct = (cartItems, productToClear) => {
        return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

//these are things that useContext can have access, we exposed them in line 43 
export const CartContext = createContext({
    isCartOpen: false,
    setisCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },            //we dont want user to have acess to setCartItems so we will run it thru a specific method to help
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    setCartCount: () => { },
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setisCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0));
    }, [cartItems]);
    //logic for this function: this product to add, is it already exist within the cart or you need to add a new one
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearProduct(cartItems, productToClear));
    }
    const value = { isCartOpen, setisCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, clearItemFromCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}