import { createContext, useState } from "react";

//helper method:
const addCartItem = (cartItems, productToAdd) => {
    // find id cart items contain the product

    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //if found increment the quantity and return this array
    if(existingItem){
        return (
            //map thru the cart Items array, if it is the product to be affected, then return a new obj with the quantity modified, if not then return gud ol item
            cartItems.map((cartItem) => 
                 cartItem.id === productToAdd.id ? 
                    {...cartItem, quantity: cartItem.quantity+1} :
                    cartItem)
        );
    }
    //return new array with new modification on the items
    return [...cartItems, {...productToAdd, quantity:1}];

}

//these are things that useContext can have access
export const CartContext = createContext({
    isCartOpen: false,
    setisCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},            //we dont want user to have acess to setCartItems so we will run it thru a specific method to help
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setisCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    //logic for this function: this product to add, is it already exist within the cart or you need to add a new one
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        console.log(cartItems);
    }
    const value = {isCartOpen,setisCartOpen,addItemToCart, cartItems};                           

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}