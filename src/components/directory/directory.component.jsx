import './directory.style.scss'
import CategoryItem from '../category-item/category-item.component.jsx';
import React from 'react';

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => {
                return (
                    <CategoryItem category={category} key={category.id} />
                );

            })})
        </div>
    );
}

export default Directory