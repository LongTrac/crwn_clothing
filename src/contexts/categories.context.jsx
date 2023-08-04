import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocument } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},              //using hashmap
});


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    //conmmented out because we dont want the thing to run and try to add the shop data evrytime we refresh the page
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])

    useEffect(()=>{
        const getCategoryMap = async () => {
            const categoryMap =  await getCategoriesAndDocument();

            setCategoriesMap(categoryMap);
        }

        getCategoryMap();
    },[]);


    const value = {categoriesMap};                           // we just want to display the product without modifying anything

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>

}