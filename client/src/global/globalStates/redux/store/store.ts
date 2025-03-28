import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { MonthDataBreakDown } from "../../../../models/expensesCategoryWidget/pieChart";
import { MonthlyProgres } from "../../../../models/fetch/monthlyProgress";
import { CategoriesObj } from "../../../../models/models";
import { getMonthData } from "../../../../utils/fetch/getMonthData";
import { getMonthlyProgress } from "../../../../utils/fetch/getMonthlyProgress";
import { getUnkownBusinessName, UnkownBusinessNames } from "../../../../utils/fetch/getUnkownBusinessName";


// Action Types
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const UPDATE_DATA = "UPDATE_DATA";
// Action Creators
const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

const fetchDataSuccess = (data: Partial<DataState["data"]>) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const updateData = (data:Partial<DataState["data"]>) => ({
  type: UPDATE_DATA,
  payload: data,
})

const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Async Action Creators (Thunks)
export const fetchUnkownBusinessName = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(fetchDataRequest());
    try {
      const data = await getUnkownBusinessName();
      dispatch(fetchDataSuccess({ unkownBusinessName: data }));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const fetchMonthlyProgress = (categories: CategoriesObj[], cache?: boolean) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(fetchDataRequest());
    try {
      const data = await getMonthlyProgress(categories, cache);
      dispatch(fetchDataSuccess({ monthlyProgress: data }));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message as string));
    }
  };
};

export const fetchMonthlyData = (categories: CategoriesObj[]) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(fetchDataRequest());
    try {
      const data = await getMonthData(categories);
      dispatch(fetchDataSuccess({ monthlyExpenses: data }));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};


// Initial State
interface DataState {
  loading: boolean;
  data: {
    monthlyExpenses: MonthDataBreakDown[] | undefined;
    monthlyProgress: MonthlyProgres[] | undefined;
    unkownBusinessName: UnkownBusinessNames | undefined;
  };
  error: string;
}

const initialState: DataState = {
  loading: false,
  data: {
    monthlyExpenses: undefined,
    monthlyProgress: undefined,
    unkownBusinessName: undefined,
  },
  error: "",
};

// Reducer
const dataReducer = (state = initialState, action: any): DataState => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload }, // Merge with existing data
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case UPDATE_DATA:
        return {
          ...state,
          data: {
            ...state.data,
            ...Object.keys(action.payload).reduce((acc:any, key) => {
              const currentValue = state.data[key as keyof DataState["data"]];
              const newValue = action.payload[key];
  
              if (Array.isArray(currentValue) && Array.isArray(newValue)) {
                acc[key] = [...currentValue, ...newValue];
              } else if (typeof currentValue === "object" && typeof newValue === "object") {
                acc[key] = { ...currentValue, ...newValue };
              } else {
                acc[key] = newValue;
              }
              return acc;
            }, {} as Partial<DataState["data"]>),
          },
        };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  data: dataReducer,
});

// Create the Redux store with thunk middleware
const store = configureStore({
  reducer: rootReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

export default store;
