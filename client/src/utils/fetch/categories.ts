import { CategoriesObj } from "../../models/models";
import {  FetchRequest } from "../useFetch";

export const fetchCategories = async (): Promise<CategoriesObj[]> => {
    let categoriesData: CategoriesObj[]  = []
    const request = new FetchRequest<CategoriesObj[]>("categories?sort=id&page_size=100", categoriesData)
    await request.fetchWithCach("categories")
    if (request.response.status != 1 && request.response.data){
        return request.response.data
    }
    return categoriesData
  };