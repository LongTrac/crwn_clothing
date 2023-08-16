import './categories.style.scss'
import { Route, Routes } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { setCurrentUser } from './store/user/user.action';
import { setCategoriesMap } from './store/categories/categories.action';
import { useDispatch } from 'react-redux';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { createUserDocFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { addCollectionAndDocuments, getCategoriesAndDocument } from "./utils/firebase/firebase.utils";



const App = () => {
    const dispatch = useDispatch();

    // USE EFFECT FOR USER REDUCER
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {

            //if sign-in/ sign-up: user will not be null ==> execute this block
            if (user) {
                //within this function, there is a block of code that check if the snapshot for the doc exist so either way we will get a valid docref 
                createUserDocFromAuth(user);
            }

            //this is for all cases including sign out ==> set user to null
            dispatch(setCurrentUser(user));
        })

        return unsubscribe;
    }, [])

    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path='shop/*' element={<Shop />} />            {/*shop is going to have a nested route inside that is why the path='shop/*'   */}
                    <Route path='auth' element={<Authentication />} />
                    <Route path='checkout' element={<Checkout />} />
                </Route>
            </Routes>
        </Fragment>


    );
}


export default App;
