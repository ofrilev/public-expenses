import { Item } from "./Items";
import {
  ItemsWrapper,
  SideBarWrapper,
  StyledLogoWrapper,
} from "./StyledComponent";
import { AnimatedLogo } from "../../../consts/components/AnimatedLogo/AnimatedLogo";
import LogoutIcon from "./logos/logoutIcon";
import GraphIcon from "./logos/GraphIcon";
import CalendarIcon from "./logos/CalendarIcon";
import HomeIcon from "./logos/HomeIcon";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import UnkownBusinessCategories from "./UnkownBusinessCategories";

export enum PagesIds {
  Dashboard = 1,
  MonthlyExpense = 2,
  ExpensesTable = 3,
  Logout = 4,
}
type Props = {
  openModal: () => void;
};
export const SideBar = (props: Props) => {
  const [chosenItem, setChosenItem] = useState<PagesIds>(PagesIds.Dashboard);
  return (
    <SideBarWrapper>
      <StyledLogoWrapper>
        <AnimatedLogo />
        <UnkownBusinessCategories openModal={props.openModal} />
      </StyledLogoWrapper>
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
