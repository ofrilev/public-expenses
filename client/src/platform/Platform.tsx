import { Wrapper } from "./StyledComponents";
import { SideBar } from "../components/sideBar/SideBar";
import {
  NoPage,
  DashboardPage,
  ExpensesTablePage,
  MonthlyProgressPage,
} from "../pages/Page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FC, useState } from "react"; // Import Suspense
import { NewEmptyBusinessModal } from "../components/newEmptyBusinessModal/NewEmptyBusinessModal";
import { useSelector } from "react-redux";
import { RootState } from "../global/globalStates/store/store";

export const Platform: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { unkownBusinessName } = useSelector(
    (state: RootState) => state.data.data
  );
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <Wrapper id="wrapper">
      <BrowserRouter basename="/app">
        <SideBar openModal={openModal} />
        {unkownBusinessName && (
          <NewEmptyBusinessModal
            isOpen={isModalOpen}
            onClose={closeModal}
            data={unkownBusinessName}
          />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

// AppLayout: Handles page-level routing
const AppLayout: FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="monthly_expense" element={<MonthlyProgressPage />} />
      <Route path="expenses_table" element={<ExpensesTablePage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
