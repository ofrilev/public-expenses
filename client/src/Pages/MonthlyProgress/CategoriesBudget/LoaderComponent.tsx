import LoaderGif from "../../../../consts/components/LoaderGif";
import { WidgetFrame, WidgetWrapper } from "../MonthlyBudget/StyledComponent";
import {
  PageWrapper,
  MonthCategoriesSection,
  ProgressSection,
} from "../StyledComponents";
import { BudgetGrid } from "./StyledComponents";

export const MonthlyProgressLoaderComponent = () => (
  <PageWrapper>
    <MonthCategoriesSection className="Monthsection">
      <WidgetFrame className="widgetFrame">
        <WidgetWrapper>
          <LoaderGif />
        </WidgetWrapper>
      </WidgetFrame>
      <BudgetGrid>
        <LoaderGif />
      </BudgetGrid>
    </MonthCategoriesSection>
    <ProgressSection>
      <LoaderGif />
    </ProgressSection>
  </PageWrapper>
);
