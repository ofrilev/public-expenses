import styled from "styled-components";
import { LogosInterface } from "./logos/logosInterface";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PagesIds } from "./SideBar";

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 20px;
  white-space: nowrap;
`;
const NameWrapper = styled.div`
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  text-align: left;
`;
export const Item = (
  pageId: PagesIds,
  IconLogo: React.FC<LogosInterface>,
  pageName: string,
  linkTo: string,
  setChosenItem: React.Dispatch<React.SetStateAction<PagesIds>>,
  chosenItem: PagesIds
) => {
  const [color, setColor] = useState(pageId == chosenItem ? "black" : "white");
  const hoverBlack = "rgba(0, 0, 0, 0.6)";
  useEffect(() => {
    setColor(pageId == chosenItem ? "black" : "white");
  }, [chosenItem]);
  return (
    <Link
      to={`/${linkTo}`}
      style={{ textDecoration: "none" }}
      onClick={() => setChosenItem((prev) => (prev == pageId ? prev : pageId))}
    >
      <Wrapper
        onMouseEnter={() => setColor(hoverBlack)}
        onMouseLeave={() => setColor(pageId == chosenItem ? "black" : "white")}
      >
        <IconLogo color={color} width="24px" height="24px" />
        <NameWrapper style={{ color: color }}>{pageName}</NameWrapper>
      </Wrapper>
    </Link>
  );
};
