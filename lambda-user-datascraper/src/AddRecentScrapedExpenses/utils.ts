export type transactionObj = {
  cardNumber: number;
  date: string;
  name: string;
  amount: string;
  category: string;
  subCategory?: string;
};
export function isFstFileDateGreaterThenSnd(
  filename1: string,
  filename2: string
) {
  const date1 = filename1.split("_")[0];
  const date2 = filename2.split("_")[0];

  const [day1, month1, year1] = date1.split("-");
  const [day2, month2, year2] = date2.split("-");

  const dateObj1 = new Date(`${year1}-${month1}-${day1}`);
  const dateObj2 = new Date(`${year2}-${month2}-${day2}`);

  if (dateObj1 > dateObj2) {
    return true;
  } else if (dateObj1 < dateObj2) {
    return false;
  }
}

export function difference(
  obj1: transactionObj[],
  obj2: transactionObj[]
): transactionObj[] {
  const obj3: transactionObj[] = [];

  for (const item1 of obj2) {
    const existsInObj1 = obj1.some(
      (item2) =>
        item1.cardNumber === item2.cardNumber &&
        item1.date === item2.date &&
        item1.name === item2.name &&
        item1.amount === item2.amount &&
        item1.category === item2.category &&
        item1.subCategory === item2.subCategory
    );

    if (!existsInObj1) {
      obj3.push(item1);
    }
  }
  return obj3;
}
