import { toast } from "react-hot-toast"
const { apiConnector } = require("../apiconnector");
const { catalogData } = require("../apis");

export async function getCatalogPageData(categoryId){
    let result = [];
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});

        // console.log("RESPOSE.............", response);
        
        if(!response?.data?.success){
            throw new Error("Could not fetch category page data");
        }

        result = response?.data;
    }

    catch(error){
        console.log("CATALOG PAGE DATA API ERROR......", error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId);
    return result;
}