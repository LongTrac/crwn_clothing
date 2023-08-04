import { BackgroundImg, Body, DirectoryItemContainer } from './directory-item.style.jsx'

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const path = `/shop/${title}`
    return (
        <DirectoryItemContainer>
            <BackgroundImg imgUrl={imageUrl}/>
            <Body to={path}  >
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>);

}

export default DirectoryItem