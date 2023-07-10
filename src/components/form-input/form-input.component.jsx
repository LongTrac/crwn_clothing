import './form-input.style.scss'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input"{...otherProps} />

            {
                //basically saying if no label was sent in here don;t render this label part 
                label ? (
                    <label className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>
                ) : null
            }

        </div>

    );

}

export default FormInput;