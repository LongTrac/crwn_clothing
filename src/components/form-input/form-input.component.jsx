import {FormInputLabel,Input,Group} from './form-input.style.jsx'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input{...otherProps} />

            {
                //basically saying if no label was sent in here don;t render this label part 
                label ? (
                    // reason why passing the length: if length = 0 ==> false else true
                    <FormInputLabel shrink={otherProps.value.length}> 
                        {label}
                    </FormInputLabel>
                ) : null
            }

        </Group>

    );

}

export default FormInput;