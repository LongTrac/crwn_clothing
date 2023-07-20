import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import './navigation.styles.scss'

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation">

                <Link className="logo-container" to='/'>
                    <div>
                        <CrwnLogo className="logo" />
                    </div>
                </Link>


                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>

                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    )}

                    <CartIcon/>
                </div>

                {
                    // equivalent with this statement: isCartOpen && <CartDropdown/>  
                    //<==> this statement basically is a == statement but it will return the last thing if the condition turn true
                    isCartOpen ? <CartDropdown /> :null

                }        

            </div>

            <Outlet />

        </Fragment>
    );
}

export default Navigation;