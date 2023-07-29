import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            {/* path =":category"  ==> means that we can access the param 'category' inside of out Category component*/}
            <Route path=":category" element={<Category/>} />

        </Routes>

    );
}

export default Shop;