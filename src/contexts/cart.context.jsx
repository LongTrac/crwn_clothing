import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

//===================================================== HELPER METHODS ===========================================================================

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

//=================================================================================================================================================


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
    totalCartPrice: 0,
});

//---------------------------------------REDUCER------------------------------------------------------
export const CART_REDUCER_ACTION_TYPE = {
    SET_CART_ITEM: 'SET_CART_ITEM',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    console.log('state')
    console.log(state)

    switch (type) {
        case CART_REDUCER_ACTION_TYPE.SET_CART_ITEM:
            return ({
                ...state,
                ...payload
            });
        case CART_REDUCER_ACTION_TYPE.SET_IS_CART_OPEN:
            return ({
                ...state,
                ...payload
            });
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }

}


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalCartPrice: 0,
}


export const CartProvider = ({ children }) => {
    // const [isCartOpen, setisCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [totalCartPrice, setTotalCartPrice] = useState(0);

    // useEffect(() => {
    //     setCartCount(cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0));
    // }, [cartItems]);

    // useEffect(()=>{
    //     setTotalCartPrice(cartItems.reduce((total, currentItem) => total + currentItem.quantity * currentItem.price , 0))
    // }, [cartItems])

    //===================================================== CART REDUCER ===========================================================================

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, cartCount, totalCartPrice } = state;

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, currentItem) => total + currentItem.quantity * currentItem.price, 0);

        dispatch(createAction(CART_REDUCER_ACTION_TYPE.SET_CART_ITEM,
            {
                cartItems: newCartItems,
                totalCartPrice: newCartTotal,
                cartCount: newCartCount
            }))
    }

    //===================================================== HELPER METHODS ===========================================================================
    //logic for this function: this product to add, is it already exist within the cart or you need to add a new one
    const addItemToCart = (productToAdd) => {
        //setCartItems(addCartItem(cartItems, productToAdd));       this is when using useState
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearProduct(cartItems, productToClear);
        updateCartItemReducer(newCartItems);
    }

    const setisCartOpen = (isCartOpen) => {
        dispatch(createAction(CART_REDUCER_ACTION_TYPE.SET_IS_CART_OPEN,{ isCartOpen: isCartOpen }));

    }

    //===================================================== CONTEXT EXPOSURE ===========================================================================
    const value = { isCartOpen, setisCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, clearItemFromCart, totalCartPrice };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}