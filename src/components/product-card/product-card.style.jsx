import styled from 'styled-components'

export const ProductCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;
    &:hover {
      img {
        opacity: 0.7;
      }
  
      button {
        opacity: 0.85;
        display: flex;
      }
    }

    button{
        width: 100%;
        opacity: 0.7;
        position: absolute;
        top: 225px;
        display: none;
    }
    `

export const Img = styled.img`
    width: 85%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 5px;
`
export const Button = styled.button`
    width: 100%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
`
export const Footer = styled.div`
    width: 85%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`

export const Name = styled.span`
    width: 80%;
    margin-bottom: 15px;
    font-style: italic;
    font-weight: bold;
`

export const Price = styled.span`
    width: 20%;
    text-align: right;
`