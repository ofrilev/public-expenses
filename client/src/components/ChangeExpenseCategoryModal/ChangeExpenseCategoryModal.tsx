import  {FC, useState} from 'react';
import {useCategoriesContext} from "../categoriesContext/CategoriesContext";
import {
    SubmitButtonWrapper,
    BusinessNamesWrapper,
    ButtonWrapper,
    CategoriesWrapper,
    SubCategoriesWrapper,
} from "../SetBusinessCategoryModal/StyledComponent";
import { postReq } from '../../utils/useFetch';

interface IChangeExpenseCategoryModal {
    amount: number;
    businessName: string;
    date: string;
    closeModal: () => void;
}

export const ChangeExpenseCategoryModal: FC<IChangeExpenseCategoryModal> = ({
    closeModal,
    businessName,
    date,
    amount,
}: IChangeExpenseCategoryModal) => {
    const {categoriesContext} = useCategoriesContext()
    const categories = Object.keys(categoriesContext).map((category) => category);
    const [subCategories, setSubcategories] = useState<string[]>([])
    const [chosenCategory, setChosenCategory] = useState<string>("")


    const onChosenCategoryClick = (subCategory: string) => {
        setChosenCategory(subCategory)
    };

    const onCategoryClick = (category: string) => {
        //@ts-ignore
        const change = Object.keys(categoriesContext[category]).map((subCategory) => subCategory)
        setSubcategories(change)
    }

    const handleSubmit = () => {
        postReq(`/set/expense-category`, {
            expenseDate: date,
            expenseAmount: amount,
            expenseBusinessName: businessName,
            newCategory: chosenCategory
            //@ts-ignore
        }).then((res) =>
            console.log(res.toString())
        ).finally(() => closeModal())
    };

    // @ts-ignore
    return (
        <>
            <h2>{"Change expense category"}</h2>
            <BusinessNamesWrapper>
                <div>
                    {businessName}
                </div>
                <div>Date: {date}</div>
                <div>Amount: {amount}</div>
            </BusinessNamesWrapper>
            <div>
                <CategoriesWrapper>

                    {categories.map((category, index) => (
                        <button
                            style={chosenCategory === category ? {backgroundColor: `hsl(0, 0%, 55%)`} : {}}
                            key={index} onClick={() => onCategoryClick(category)}>
                            {category}
                        </button>
                    ))}
                </CategoriesWrapper>
                {subCategories &&
                    <SubCategoriesWrapper>
                        {subCategories?.map((subCategory, index) => (
                            <button
                                key={index}
                                style={subCategory === chosenCategory ? {color: `hsl(0, 0%, 60%)`} : {}}
                                onClick={() => onChosenCategoryClick(subCategory)}>
                                {subCategory}
                            </button>
                        ))}
                    </SubCategoriesWrapper>}
            </div>
            <ButtonWrapper>
                <SubmitButtonWrapper>
                    {chosenCategory && <button onClick={() => handleSubmit()}> Submit!</button>}
                </SubmitButtonWrapper>
            </ButtonWrapper>
        </>
    );

};

