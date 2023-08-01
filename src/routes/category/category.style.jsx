import styled from 'styled-components'

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 15px;
    row-gap: 50px;
`


export const CategoryTitle = styled.h2`
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 25px;
    cursor: pointer;
    text-align: center;
`