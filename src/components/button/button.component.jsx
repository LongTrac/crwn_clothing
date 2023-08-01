import {BaseButton, GoogleSignInButton, InvertedButton} from './button.style.jsx'

// there are 3 types of button
// the regular style 
// the google sign in style 
// the inverted style
export const BUTTON__TYPE_CLASS = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON__TYPE_CLASS.base) => {
    //switch statment shorthand: 
    //compare buttonType (default to be base button) to one of the 3 cases then return the appropriate
    return({
        [BUTTON__TYPE_CLASS.base] : BaseButton,
        [BUTTON__TYPE_CLASS.google] : GoogleSignInButton,
        [BUTTON__TYPE_CLASS.inverted] : InvertedButton
    }[buttonType])
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton{...otherProps}>
            {children}
        </CustomButton>
    );
}

export default Button;