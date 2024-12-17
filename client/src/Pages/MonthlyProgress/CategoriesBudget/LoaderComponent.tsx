import LoaderGif from "../../../../consts/components/LoaderGif";
import { WidgetFrame, WidgetWrapper } from "../MonthlyBudget/StyledComponent";
import { PageWrapper } from "../../StyledComponents";
import { MonthCategoriesSection, ProgressSection } from "../StyledComponents";
import { BudgetGrid, CategoryBudgetWidget } from "./StyledComponents";

export const MonthlyProgressLoaderComponent = () => {
  const renderCategoriesWidgets = (categoriesLength: number) => {
    const widgets = [];
    for (let i = 0; i < categoriesLength; i++) {
      widgets.push(
        <CategoryBudgetWidget key={i} selected={false}>
          <LoaderGif />
        </CategoryBudgetWidget>
      );
    }
    return widgets;
  };
  return (
    <PageWrapper>
      <MonthCategoriesSection className="Monthsection">
        <WidgetFrame className="widgetFrame">
          <WidgetWrapper>
            <LoaderGif />
          </WidgetWrapper>
        </WidgetFrame>
        <BudgetGrid>{renderCategoriesWidgets(7)}</BudgetGrid>
      </MonthCategoriesSection>
      <ProgressSection
        style={{
          alignItems: "center",
          justifyContent: "start",
          height: "600px",
        }}
      >
        <LoaderGif />
      </ProgressSection>
    </PageWrapper>
  );
};
