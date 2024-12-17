import { Expense } from "../../models/fetch/expense";
import { FetchRequest } from "../useFetch";
export type UnkownBusinessNames = {
  [business_name: string]: {
    data: [{ date: string; amount: number }];
  };
};
export const getUnkownBusinessName = async (): Promise<UnkownBusinessNames> => {
  let fetchedData:Expense[] = [];
  const request = new FetchRequest("expenses?category=0&page_size=100", fetchedData)
  // await request.fetchWithCach(`empty-businessName`)
  await request.fetchData()
  let unkownBusinessName: UnkownBusinessNames = {};
  if(request.response.status ==0 && request.response.data){
    request.response.data.forEach((item) => {
      const business_name = item.business_name;
      const date = item.date;
      const amount = item.amount;
      if (unkownBusinessName.hasOwnProperty(business_name)) {
        unkownBusinessName[business_name].data.push({ date, amount });
      } else {
        unkownBusinessName[business_name] = { data: [{ date, amount }] };
      }
    });
  }
  return unkownBusinessName;
};
