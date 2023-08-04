import { DirectoryContainer } from './directory.style.jsx'
import DirectoryItem from '../directory-item/directory-item.component.jsx';

const Directory = ({ categories }) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => {
                return (
                    <DirectoryItem category={category} key={category.id} />
                );

            })})
        </DirectoryContainer>
    );
}

export default Directory