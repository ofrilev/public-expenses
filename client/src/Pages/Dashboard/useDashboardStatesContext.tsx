// import { createContext, useContext, useReducer } from "react";

// type DashboardState = {
//   month: number;
//   category: number;
// };

// type DashboardAction =
//   | { type: "SET_MONTH"; payload: number }
//   | { type: "SET_CATEGORY"; payload: number };

// const DashboardContext = createContext<{
//   dashboardState: DashboardState;
//   dispatch: React.Dispatch<DashboardAction>;
// } | null>(null);

// export const DashboardStatesProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [dashboardState, dispatch] = useReducer(reducer, {
//     month: 0,
//     category: 0,
//   });
//   return (
//     <DashboardContext.Provider value={{ dashboardState, dispatch }}>
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboardStatesContext = () => {
//   const context = useContext(DashboardContext);
//   if (!context) {
//     throw new Error("useDashboardStates must be used within DashboardProvider");
//   }
//   const { dashboardState, dispatch } = context;
//   const setSelectedMonth = (month: number) => {
//     dispatch({ type: "SET_MONTH", payload: month });
//   };
//   const setSelectedCategory = (category: number) => {
//     dispatch({ type: "SET_CATEGORY", payload: category });
//   };
//   return { dashboardState, setSelectedMonth, setSelectedCategory };
// };

// const reducer = (state: DashboardState, action: DashboardAction) => {
//   switch (action.type) {
//     case "SET_MONTH":
//       return { ...state, month: action.payload };
//     case "SET_CATEGORY":
//       return { ...state, category: action.payload };
//     default:
//       throw new Error();
//   }
// };
