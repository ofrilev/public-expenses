import { connectToDb, subBaseConnect, newPool } from "./connectToDb";
import { transactionObj } from "../excelUtils/excelFileScarpingUtils";
import { Client, QueryResult } from "pg";
import { getCategoryEazy } from "../3rdParties/eazyData";

export enum Response {
  FAILED = "failed",
  SUCCESS = "success",
}
interface ExpenseDetail {
  date: string;
  amount: number;
}

interface BusinessExpense {
  business_name: string;
  breakDown: ExpenseDetail[];
}

export type ExpenseOutput = BusinessExpense[];

class ClientDbClass {
  private static client: Client;
  private static pool = newPool();
  private supbase = subBaseConnect();
  static getClientQuery = async (
    queryString: string,
    values: any = undefined
  ): Promise<QueryResult | number | any[] | any> => {
    if (!this.client) {
      this.client = connectToDb();
    }
    try {
      console.log(subBaseConnect.toString());
      const res = await this.client.query(queryString, values);
      if (res.command) {
        if (res.command === "SELECT") return res.rows;
        if (
          res.command === "UPDATE" ||
          res.command === "INSERT" ||
          res.command === "DELETE"
        )
          return res.rowCount;
      }
      return [];
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  static getCategories = async (): Promise<
    undefined | { parent: number; id: number; category: string }[]
  > => {
    let categories = null;
    categories = await this.getClientQuery("SELECT * from categories;");
    if (categories) {
      return categories;
    }
  };

  static getBusinessCategory = async (businessName: string): Promise<any> => {
    let category = null;
    if (!businessName.includes("'")) {
      const res = await this.getClientQuery(
        `SELECT category FROM business WHERE business_name = '${businessName}';`
      );
      if (res.length > 0) {
        category = res[0].category;
      }
    }

    return category;
  };
  static getMonthExpenses = async (monthDate: string) => {
    let res;
    res = await this.getClientQuery(
      `SELECT *  FROM expenses where date like '%${monthDate}%'`
    );
    if (res.length > 0) {
      return res;
    }
  };
  static getMonthTotalExpensesAmount = async (monthDate: string) => {
    let res;
    res = await this.getClientQuery(
      `SELECT SUM (amount) FROM expenses where date :: text ~~ '%${monthDate}%'`
    );
    if (res.length > 0) {
      return Math.round(res[0]?.sum);
    }
  };

  static getMonthCategoryTotalExpensesAmount = async (
    monthDate: string,
    category: string
  ) => {
    let res;
    res = await this.getClientQuery(
      `SELECT SUM (amount) FROM expenses where date :: text ~~ '%${monthDate}% AND category= (SELECT id FROM categories WHERE category = '${category}')`
    );
    if (res.length > 0) {
      return Math.round(res[0]?.sum);
    }
  };

  static getCategoryMonthData = async (
    category: string,
    monthDate: string
  ): Promise<
    | [
        {
          business_name: string;
          date: string;
          amount: number;
        }
      ]
    | undefined
  > => {
    let res = null;
    const categoryRes = await this.getClientQuery(
      `SELECT id FROM categories WHERE category = '${category}'`
    );
    if (categoryRes && categoryRes[0]) {
      const categoryId = categoryRes[0]?.id;
      res = await this.getClientQuery(
        `SELECT business_name, TO_CHAR(date, 'DD-MM-YYYY') as date, amount FROM expenses JOIN categories as cat on cat.id = expenses.category WHERE date :: text ~~ '%${monthDate}%' and expenses.category='${categoryId}'`
      );
    }
    return res;
  };

  static getNewNullCategoryExpenses = async (): Promise<
    { data: ExpenseOutput } | null | undefined
  > => {
    let res;
    // res = await this.getClientQuery('SELECT DISTINCT business_name, TO_CHAR(date, \'DD-MM-YYYY\') as date, amount FROM expenses WHERE category IS NULL')
    res = await this.getClientQuery(
      "WITH grouped AS (SELECT business_name," +
        "json_agg(json_build_object('date', date, 'amount', amount)) AS breakDown\n" +
        "    FROM expenses WHERE category IS NULL\n" +
        "    GROUP BY business_name\n" +
        ")\n" +
        "\n" +
        "SELECT\n" +
        "    json_build_object('business_name', business_name, 'breakDown', breakDown) AS data\n" +
        "FROM grouped;"
    );
    if (res.length > 0) {
      return res;
    }
  };

  static getMonthlyProgress = async (
    date: string
  ): Promise<
    [{ category: string; date: string; goalAmount: number }] | undefined
  > => {
    let res;
    res = await this.getClientQuery(`SELECT 
        mp.amount as goal_Amount, 
        TO_CHAR(mp.date, 'DD-MM-YYYY') as date,
        result,
        (
          SELECT c.category
          FROM categories c
          WHERE c.id = mp.category
        ) AS category
      FROM 
        monthly_progress mp
      WHERE 
        mp.date::text LIKE '%${date}%'; 
      `);
    if (res.length > 0) {
      return res;
    }
  };

  static updateExpenses = (transactionObjArr: transactionObj[]) => {
    for (let transaction of transactionObjArr) {
      this.getClientQuery(
        " INSERT INTO expenses (business_name, date, amount, card_number, category) VALUES ($1, TO_DATE($2, 'DD-MM-YYYY'), $3, $4, $5)",
        [
          transaction.name,
          transaction.date,
          transaction.amount,
          transaction.cardNumber,
          transaction.category,
        ]
      );
    }
  };

  static getCategoryID = async (category: string) => {
    return await this.getClientQuery(
      `SELECT id FROM categories WHERE category = '${category}'`
    );
  };

  static updateBusinessCategory = async (
    business_name: string,
    category: string
  ): Promise<Response> => {
    let resBusinessUpdate;
    let expensesUpdate;
    let resBusinessInsert = undefined;
    const categoryRes = await this.getCategoryID(category);
    if (categoryRes && categoryRes[0]) {
      const categoryId = categoryRes[0]?.id;
      resBusinessUpdate = await this.getClientQuery(
        "UPDATE business SET category = $1 WHERE business_name = $2",
        [categoryId, business_name]
      );
      if (resBusinessUpdate == 0) {
        resBusinessInsert = await this.getClientQuery(
          "INSERT INTO business (business_name, category) VALUES ($1,$2)",
          [business_name, categoryId]
        );
      }
      expensesUpdate = await this.getClientQuery(
        "UPDATE expenses SET category = $1 WHERE business_name = $2",
        [categoryId, business_name]
      );
      if ((resBusinessInsert || resBusinessUpdate) && expensesUpdate) {
        return Response.SUCCESS;
      }
    }
    return Response.FAILED;
  };
  static updateLastUpdatedFileExpense = async (
    lastUpdatedExpenseDate: string,
    lastUpdatedExpenseBusinessName: string
  ): Promise<Response> => {
    let res;
    res = await this.getClientQuery(
      `UPDATE last_updated_expense SET date = ${lastUpdatedExpenseDate}, business_name = ${lastUpdatedExpenseBusinessName} `
    );
    if (res.length > 0) {
      return Response.SUCCESS;
    } else return Response.FAILED;
  };

  // @ts-ignore
  static updateExpenseCategory = async (
    expenseDate: string,
    expenseAmount: string,
    expenseBusinessName: string,
    newCategory: string
    //@ts-ignore
  ): Promise<Response> => {
    let res;
    const categoryRes = await this.getCategoryID(newCategory);
    if (categoryRes && categoryRes[0]) {
      const categoryId = categoryRes[0]?.id;
      res = await this.getClientQuery(
        "UPDATE expenses SET category = $1, special = 1 WHERE business_name=$2 AND amount=$3 AND date= TO_DATE($4, 'DD-MM-YYYY')",
        [categoryId, expenseBusinessName, expenseAmount, expenseDate]
      );
      if (res?.length > 0) {
        return Response.SUCCESS;
      } else return Response.FAILED;
    }
  };

  static getLastUpdatedFileExpense = async (): Promise<{
    date: string;
    business_name: string;
  }> => {
    let res;
    res = await this
      .getClientQuery(`SELECT business_name, TO_CHAR(date, 'DD-MM-YYYY') as date
            FROM expenses WHERE date = (SELECT MAX(date) FROM expenses)  order by id desc limit 1 ;`);
    if (res?.length > 0) {
      return res[0];
    }
    throw new Error("failed to get last updated expense");
  };

  static convertToDdMmYyyy(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  }

  static insertExpensesRows = async (rows: any[]) => {
    for (const row of rows) {
      const query = `INSERT INTO expenses  (business_name,date, category, card_number, amount, special) VALUES ($1, TO_DATE($2, 'DD-MM-YYYY'), $3, $4, $5, $6)`;
      const value = [
        row["business_name"],
        this.convertToDdMmYyyy(row["date"]),
        row["category"] == "" ? null : row["category"],
        row["cardNumber"],
        row["amount"],
        row["special"],
      ];
      await this.getClientQuery(query, value);
    }
  };
  static insertBusinessNameRows = (rows: any[]) => {
    for (const row of rows) {
      const query = `INSERT INTO business  (business_name, category) VALUES ($1, $2)`;
      const value = [
        row["business_name"],
        row["category"] == "" ? null : row["category"],
      ];
      this.getClientQuery(query, value);
    }
  };
}
export default ClientDbClass;
