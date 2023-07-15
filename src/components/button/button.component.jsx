import './button.style.scss'

// there are 3 types of button
// the regular style 
// the google sign in style 
// the inverted style
const BUTTON__TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button
            className={`${BUTTON__TYPE_CLASS[buttonType]} button-container`}{...otherProps}>
            {children}
        </button>
    );
}

export default Button;