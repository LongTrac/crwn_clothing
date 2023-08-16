//import { CategoriesContext } from "../../contexts/categories.context";
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCategoriesMap } from '../../store/categories/categories.selector';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    //const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCurrentCategoriesMap);

    const titleArray = Object.keys(categoriesMap);
    return (
        <div className="categories-preview-container">
            {
                titleArray.map(title => {
                    const products = categoriesMap[title]
                    return (
                        <Fragment key={title}>
                            <CategoryPreview title={title} products={products} />
                        </Fragment>
                    )

                }
                )
            }
        </div>
    );
}

export default CategoriesPreview;