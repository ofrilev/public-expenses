import  {JSX} from "react";
import {DropDown, DropDownContent, DropDownItemWrapper, DropDownLabel, StyledDropDownItems} from "./StyledComponent";

import {ContextState} from "./expensesCategoryContext";
import { CategoryMonthlyExpenses, MonthlyData, CategoryMonthData } from "../../models/expensesCategoryWidget/pieChart";

interface IRenderDropDown {
    data: CategoryMonthlyExpenses | MonthlyData[] | CategoryMonthData[];
    dataName: string;
    updateState: (newState: Partial<ContextState>) => void;
    dropDownState: ContextState
}


export const renderDropDowns = (data: CategoryMonthlyExpenses | MonthlyData[] | CategoryMonthData[], dropDownState: ContextState, updateContextState: (newState: Partial<ContextState>) => void) => {
    const { month, category, subCategory, business_name } = dropDownState;
    return (
        <>
            {month && (
                <DropDownItemWrapper>
                    {RenderDropDown({
                        // @ts-ignore
                        data: Object.entries(data),
                        dataName: "month",
                        updateState: updateContextState,
                        dropDownState: dropDownState
                    })}
                    <div>
                        {month}
                    </div>
                </DropDownItemWrapper>
            )}
            {category && (
                <DropDownItemWrapper>
                    {RenderDropDown({
                        // @ts-ignore
                        data: Object.entries(data[month]["monthlyData"]),
                        dataName: "category",
                        updateState: updateContextState,
                        dropDownState: dropDownState
                    })}
                    <div>
                        {category}
                    </div>
                </DropDownItemWrapper>
            )}
            {subCategory && (
                <DropDownItemWrapper>
                    {RenderDropDown({
                        // @ts-ignore
                        data: Object.entries(data[month]["monthlyData"][category]["categoryMonthData"]),
                        dataName: "subCategory",
                        updateState: updateContextState,
                        dropDownState: dropDownState
                    })}
                    <div>
                        {subCategory}
                    </div>
                </DropDownItemWrapper>
            )}
            {business_name && (
                <DropDownItemWrapper>
                    {RenderDropDown({
                        // @ts-ignore
                        data: Object.entries(data[month][category][subCategory]),
                        dataName: "business_name",
                        updateState: updateContextState,
                        dropDownState: dropDownState
                    })}
                </DropDownItemWrapper>
            )}
        </>
    );
};


const handleDropDownClick = (item:string, dataName: string, dropDownState: ContextState, updateState: (newState: Partial<ContextState>) => void) => {
    if (dataName === 'month'){
        if (dropDownState.category){
            if (dropDownState.subCategory){
                updateState({category: undefined, subCategory: undefined, month: item})
                return;
            }
            updateState({category: undefined, month: item})
            return;
        }
    }
    if (dataName === 'category') {
        if (dropDownState.subCategory){
            updateState({subCategory: undefined, category: item})
            return;
        }
    }
    updateState({[dataName]: item})

}
// @ts-ignore
const RenderDropDown = ({data, dataName, updateState, dropDownState}: IRenderDropDown): JSX.Element => (
    <DropDown>
        <DropDownLabel>
            <div>{dataName}</div>
        </DropDownLabel>
        <DropDownContent>
            {
                data
                    // @ts-ignore
                    .filter(([item, itemData]) => item !== dataName && item !== "totalAmount")
                    // @ts-ignore
                    .map(([item, itemData]) => (
                        <StyledDropDownItems key={item} onClick={() => handleDropDownClick(item, dataName , dropDownState, updateState)}>
                            {item}
                        </StyledDropDownItems>
                    ))}
        </DropDownContent>
    </DropDown>
);

