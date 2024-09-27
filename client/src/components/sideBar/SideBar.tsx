import { Item } from "./Items";
import { ItemsWrapper, SideBarWrapper } from "./StyledComponent";
import { AnimatedLogo } from "../../../consts/components/AnimatedLogo/AnimatedLogo";
import LogoutIcon from "./logos/logoutIcon";
import GraphIcon from "./logos/GraphIcon";
import CalendarIcon from "./logos/CalendarIcon";
import HomeIcon from "./logos/HomeIcon";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export enum PagesIds {
  Dashboard = 1,
  MonthlyExpense = 2,
  ExpensesTable = 3,
  Logout = 4,
}
export const SideBar = () => {
  const [chosenItem, setChosenItem] = useState<PagesIds>(PagesIds.Dashboard);
  return (
    <SideBarWrapper>
      <AnimatedLogo />
      <ItemsWrapper>
        <Outlet />
        {Item(
          PagesIds.Dashboard,
          HomeIcon,
          "Dashboard",
          "dashboard",
          setChosenItem,
          chosenItem
        )}
        {Item(
          PagesIds.MonthlyExpense,
          GraphIcon,
          "Monthly Expense",
          "monthly_expense",
          setChosenItem,
          chosenItem
        )}
        {Item(
          PagesIds.ExpensesTable,
          CalendarIcon,
          "Expense Table",
          "expenses_table",
          setChosenItem,
          chosenItem
        )}
        {Item(
          PagesIds.Logout,
          LogoutIcon,
          "Logout",
          "",
          setChosenItem,
          chosenItem
        )}
      </ItemsWrapper>
    </SideBarWrapper>
  );
};
