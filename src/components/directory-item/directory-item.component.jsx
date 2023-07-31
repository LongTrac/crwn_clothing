import { Link } from 'react-router-dom';
import './directory-item.style.scss'

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const path = `/shop/${title}`
    return (
        <div className="directory-item-container" >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <Link to={path} className="directory-item-body-container" >
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Link>
        </div>);

}

export default DirectoryItem