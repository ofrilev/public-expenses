import { Expenses } from "../../models/fetch/expense";
import { fetchData } from "../useFetch";

export type UnkownBusinessNames = {
  [business_name: string]: {
    data: [{ date: string; amount: number }];
  };
};
export const getUnkownBusinessName = async (): Promise<UnkownBusinessNames> => {
  let unkownBusinessNamesRes;
  const res = await fetchData<Expenses>("expenses?category=0&page_size=100");
  unkownBusinessNamesRes = res.expenses;
  let unkownBusinessName: UnkownBusinessNames = {};
  unkownBusinessNamesRes.map((item) => {
    const business_name = item.business_name;
    const date = item.date;
    const amount = item.amount;
    if (unkownBusinessName.hasOwnProperty(business_name)) {
      unkownBusinessName[business_name].data.push({ date, amount });
    } else {
      unkownBusinessName[business_name] = { data: [{ date, amount }] };
    }
  });
  return unkownBusinessName;
};
