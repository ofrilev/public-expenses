import { SharedUtils } from "shared-utils";

const { dbUtils, dataFormatter } = SharedUtils;
const { buildCategoriesHierarchy, getBusinessesSummary } = dataFormatter;
import { getMonthlyCategoryProgress } from "./Handlers/getMonthlyCategoryProgress";
import { setMonthlyCategoryProgress } from "./Handlers/setMonthlyCategoryProgress";
import { getCategoryMonthlyExpensesBreakDown } from "./Handlers/getCategoryMonthlyExpensesBreakDown";
import { getAvgCategoryExpenseByMonth } from "./Handlers/getAvgCategoryExpenseByMonth";
import { getCategories2 } from "./Handlers/getCategories";
import bodyParser from "body-parser";
import moment from "moment";
import cors from "cors";
import express, { Express } from "express";
import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {
  currentMonth,
  currentYear,
  getDateOfRecentMonths,
  monthDateObj,
} from "./Handlers/Common";
// import {main} from "./AddMonthExpenses/main";
// main()
const app: Express = express();
app.use(cors({ origin: `http://localhost:3000` }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function getCategoriesArray() {
  const categoriesObj = await dbUtils.getCategories();
  if (categoriesObj) {
    return categoriesObj.map(
      (categoryObj: { category: any }) => categoryObj.category
    );
  }
}

async function generateCategories() {
  const categoriesObjArray = await dbUtils.getCategories();
  if (categoriesObjArray) {
    const categoriesHierarchy = buildCategoriesHierarchy(categoriesObjArray);
    return categoriesHierarchy;
  }
}

async function generateExpensesList() {
  const lastSixMonth = getDateOfRecentMonths(6);
  const categories = await getCategoriesArray();
  if (categories) {
    const ExpensesList: { [month: string]: any } = {};
    for (let monthAndYearDate of lastSixMonth) {
      const name = moment(monthAndYearDate, "MM/YYYY").format("MMMM");
      const yearDate = monthAndYearDate.split("/")[1];
      const monthDate = monthAndYearDate.split("/")[0];
      const yearMonthDate = `${yearDate}-${monthDate}`;
      ExpensesList[name] = {};
      for (const category of categories) {
        ExpensesList[name][category] = await dbUtils.getCategoryMonthData(
          category,
          yearMonthDate
        );
      }
    }
    return ExpensesList;
  }
}

async function generateCategoryData() {
  let data: { [month: string]: any } = {};
  let monthData = await generateCategories();
  if (monthData) {
    const lastSixMonth = getDateOfRecentMonths(6);
    for (let monthAndYearDate of lastSixMonth) {
      const monthName = moment(monthAndYearDate, "MM/YYYY").format("MMMM");
      let categoryData = {};
      // @ts-ignore
      for (let category of Object.keys(monthData)) {
        let subCategoryData = {};
        // @ts-ignore
        for (let subCategory of Object.keys(monthData[category])) {
          const yearDate = monthAndYearDate.split("/")[1];
          const monthDate = monthAndYearDate.split("/")[0];
          const yearMonthDate = `${yearDate}-${monthDate}`;
          // @ts-ignore
          const categoryMonthData = await dbUtils.getCategoryMonthData(
            subCategory,
            yearMonthDate
          );
          if (categoryMonthData) {
            const totalCategoryAmount = categoryMonthData.reduce(
              (
                acc: any,
                expense: {
                  amount: any;
                }
              ) => acc + expense.amount,
              0
            );
            const businessesSummary = getBusinessesSummary(categoryMonthData);
            subCategoryData = {
              ...subCategoryData,
              [subCategory]: {
                ...businessesSummary,
                totalAmount: totalCategoryAmount,
              },
            };
          }
        }
        // @ts-ignore
        categoryData[category] = {
          ...subCategoryData,
          // @ts-ignore
          totalAmount: Object.values(subCategoryData).reduce(
            // @ts-ignore
            (
              acc: any,
              subCategory: {
                totalAmount: any;
              }
            ) => acc + subCategory.totalAmount,
            0
          ),
        };
      }
      monthData = {
        ...categoryData,
        // @ts-ignore
        totalAmount: Object.values(categoryData).reduce(
          // @ts-ignore
          (
            acc: any,
            subCategory: {
              totalAmount: any;
            }
          ) => acc + subCategory.totalAmount,
          0
        ),
      };
      data[monthName] = monthData;
    }
    return data;
  }
}

const generateNullCategoryExpenses = async (): Promise<any | []> => {
  const getNewNullCategoryExpenses = await dbUtils.getNewNullCategoryExpenses();

  // @ts-ignore
  return getNewNullCategoryExpenses?.length > 0
    ? // @ts-ignore
      getNewNullCategoryExpenses?.map((item) => {
        return (
          // @ts-ignore
          { ...item?.["data"] }
        );
      })
    : [];
};

// @ts-ignore
const updateBusinessesCategory = async (
  businessesAndCategory: any
  // @ts-ignore
): Promise<Response> => {
  let res;
  for (let businessCategory of businessesAndCategory) {
    // const escapedBusinessName = SharedUtils.dataFormatter.escapedString(businessCategory.business_name)
    res = await dbUtils.updateBusinessCategory(
      businessCategory.business_name,
      businessCategory.category
    );
    // if (res == Response.FAILED) {
    //     return Response.FAILED
    // }
  }
  // return Response.SUCCESS;
};
const updateExpenseCategory = async (
  expenseDate: string,
  expenseAmount: string,
  expenseBusinessName: string,
  newCategory: string
): Promise<Response> => {
  let res;
  res = await dbUtils.updateExpenseCategory(
    expenseDate,
    expenseAmount,
    expenseBusinessName,
    newCategory
  );
  // @ts-ignore
  return res;
};

// const categoryData = generateCategoryData();
// console.log(categoryData);

/**
 * @param {number} months - Number of months for which to generate data.
 * @returns {Array} - Array of monthly data, each containing a name (string), expense (number), and income (number).
 */
async function generateMonthData(months: number) {
  const monthData = [];
  const income = 1;
  for (let month = currentMonth - months; month <= currentMonth; month++) {
    const thisMonthDateObj = monthDateObj(currentYear, month);
    const yearDate = thisMonthDateObj.format("YYYY");
    const monthDate = thisMonthDateObj.format("MM");
    const name = thisMonthDateObj.format("MMMM");
    const yearMonthDate = `${yearDate}-${monthDate}`;
    const monthExpensesAmount = await dbUtils.getMonthTotalExpensesAmount(
      yearMonthDate
    );
    monthData.push({ name, monthExpensesAmount, income });
  }
  return monthData;
}

/**
 * @param {number} min - Minimum value of range.
 * @param {number} max - Maximum value of range.
 * @returns {number} - Random integer within the range (inclusive).
 */
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// @ts-ignore
app.get("/get-categories", async (req, res) => {
  const getCategories = await generateCategories();
  res.json(getCategories);
});

app.get("/get-categories-heirarchy", async (req, res) => {
  const getCategories = await generateCategories();
  res.json(getCategories);
});
app.get("/get/categories2", async (req, res) => {
  const getCategories = await getCategories2();
  res.json(getCategories);
});

// @ts-ignore
app.get("/month-data", async (req, res) => {
  const getMonthData = await generateMonthData(6);
  res.json(getMonthData);
});
// @ts-ignore
app.post("/set/business-category", async (req, res) => {
  let queryRes;
  const businessCategory = req.body;
  if (businessCategory) {
    queryRes = await updateBusinessesCategory(businessCategory);
  } else {
    res.json("wrong input");
  }
  res.json(queryRes);
});
app.post("/set/expense-category", async (req, res) => {
  let queryRes;
  const { expenseDate, expenseAmount, expenseBusinessName, newCategory } =
    req.body;

  if (expenseDate && expenseAmount && expenseBusinessName && newCategory) {
    queryRes = await updateExpenseCategory(
      expenseDate,
      expenseAmount,
      expenseBusinessName,
      newCategory
    );
  } else {
    res.json("wrong input");
  }
  res.json(queryRes);
});
app.post("/set/monthly-category-progress", async (req, res) => {
  res.json(await setMonthlyCategoryProgress(req));
});

// @ts-ignore
app.get("/category-data", async (req, res) => {
  // if (req.query?.categories) {
  const getCategoryData = await generateCategoryData();
  res.json(getCategoryData);
  // } else {
  //     res.json("error_message:invalid categories params");
  // }
});

app.get("/expenses-list", async (req, res) => {
  const getExpensesList = await generateExpensesList();
  res.json(getExpensesList);
  // expensesList[month][category]
});

app.get("/new-null-category-expenses", async (req, res) => {
  const getNewNullCategoryExpenses = await generateNullCategoryExpenses();
  res.json(getNewNullCategoryExpenses);
});

app.get("/monthly-category-progress", async (req, res) => {
  res.json(await getMonthlyCategoryProgress(req));
});

app.post("/monthly-category-expenses/breakdown", async (req, res) => {
  res.json(await getCategoryMonthlyExpensesBreakDown(req));
});
app.post("/avg-category-expenses-amount/by-month", async (req, res) => {
  res.json(await getAvgCategoryExpenseByMonth(req));
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server has stopped listening");
    process.exit(0); // Exit the process
  });
});
