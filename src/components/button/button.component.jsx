
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