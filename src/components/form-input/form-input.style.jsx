import styled, {css} from 'styled-components' 

//$sub-color: grey;
// $main-color: black;
const subColor = 'grey'
const mainColor = 'black'

// @mixin shrinkLabel {
//   top: -14px;
//   font-size: 12px;
//   color: $main-color;
// } ==> convert to this below:

const shrinkLabelStyle = css`
    top: -14px;
    font-size: 12px;
    color: ${mainColor};
`

export const FormInputLabel = styled.label`
    color: $sub-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    //get the prop.shrink, if shrink is true, render shrinkLabelStyle
    ${({shrink})=> shrink && shrinkLabelStyle}

    /* dont need this anymore
     &.shrink {
      @include shrinkLabel();
    } */
`

export const Input = styled.input`
    background: none;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ ${FormInputLabel} {    // .form-input-label {
      //@include shrinkLabel();
      ${shrinkLabelStyle};
    }
`

export const Group = styled.div`
    position: relative;
    margin: 45px 0;
`

