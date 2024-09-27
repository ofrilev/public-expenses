import {fetchService} from "./fetchService";
const endpoint ="https://easy.co.il/n/jsons/bizlist";

export const getCategoryEazy =  async (businessName: string): Promise<any>  => {
    const res =  await fetchService(`https://easy.co.il/n/jsons/bizlist?q=${businessName}`);
    if (res.data && res.data?.bestsubcat) {
        return res.json().bestsubcat;
    }
}
