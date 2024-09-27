import LoaderGif from "../../../consts/components/LoaderGif";
import { Widget } from "../../components/widget/Widget";
import {
  FirstGridItem,
  ForthGridItem,
  GridWrapper,
  SecondGridItem,
  StyledGrid,
  ThirdGridItem,
} from "./StyledComponents";

export const DashboardLoaderComponent = () => (
  <GridWrapper>
    <StyledGrid>
      <FirstGridItem>
        <Widget title="Monthly Expense Summary">
          <div
            style={{
              height: "190px",
              position: "relative",
              top: "59px",
              paddingLeft: "40px",
              paddingBottom: "17.84px",
            }}
          >
            <LoaderGif />
          </div>
        </Widget>
      </FirstGridItem>
      <SecondGridItem>
        <Widget title="Categories Breakdown" height={314} width={401}>
          <LoaderGif />
        </Widget>
      </SecondGridItem>
      <ThirdGridItem>
        <Widget title="Sub-Categories Breakdown" height={314} width={401}>
          <LoaderGif />
        </Widget>
      </ThirdGridItem>
      <ForthGridItem>
        <Widget title="Monthly Comparison insight" height={314} width={401}>
          <LoaderGif />
        </Widget>
      </ForthGridItem>
    </StyledGrid>
  </GridWrapper>
);
