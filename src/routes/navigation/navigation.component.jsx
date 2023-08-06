import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { NavContainer, NavLinksContainer, NavLink, LogoContainer } from './navigation.styles.jsx'

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const { isCartOpen } = useContext(CartContext);

    console.log(currentUser)
    return (
        <Fragment>
            <NavContainer>

                <LogoContainer to='/'>
                    <div>
                        <CrwnLogo className="logo" />
                    </div>
                </LogoContainer>


                <NavLinksContainer>
                    <NavLink  to='/shop'>
                        SHOP
                    </NavLink>

                    {currentUser ? (
                        <>
                            {currentUser.displayName && <div> HELLO {currentUser.displayName.toUpperCase()} </div>}
                            <NavLink as={'span'} onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}

                    <CartIcon />
                </NavLinksContainer>

                {
                    // equivalent with this statement: isCartOpen && <CartDropdown/>  
                    //<==> this statement basically is a == statement but it will return the last thing if the condition turn true
                    isCartOpen ? <CartDropdown /> : null

                }

            </NavContainer>

            <Outlet />

        </Fragment>
    );
}

export default Navigation;