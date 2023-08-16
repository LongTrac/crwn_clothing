import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { addCollectionAndDocuments, getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/categories.action";


const Shop = () => {
    const dispatch = useDispatch();

    //USE EFFECT FOR CATEGORIES CONTEXT
    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocument();

            dispatch(setCategoriesMap(categoryMap));
        }

        getCategoryMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            {/* path =":category"  ==> means that we can access the param 'category' inside of out Category component*/}
            <Route path=":category" element={<Category />} />

        </Routes>

    );
}

export default Shop;