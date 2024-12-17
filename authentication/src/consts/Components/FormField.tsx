import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../colors";
import CheckedIcon from "../icons/checked";
const color = new Colors();

const ErrorField = styled.div`
  color: ${color.red[400]};
  text-wrap: nowrap;
  font-size: small;
  align-self: end;
`;

interface IFormField {
  element: JSX.Element | JSX.IntrinsicElements;
  isValid: boolean;
  unvalidMessage: string;
  shouldSeeMsg?: boolean;
  id?: string;
}

export const FormField: FC<IFormField> = (props: IFormField) => {
  // if (props.id == "name") {
  //   debugger;
  // }
  return (
    <>
      {props.element}
      {props.isValid && <CheckedIcon alignSelf="center" />}
      {!props.isValid && props.shouldSeeMsg && (
        <ErrorField>{props.unvalidMessage}</ErrorField>
      )}
    </>
  );
};
