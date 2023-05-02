import React from "react";
import styled from "styled-components";
import Button from "../UI/button/Button";

export const Header = ({ login, logOutHandler }) => {
  return (
    <HeadersForms>
      {login && (
        <ButtonsHeader>
          <Button onClick={logOutHandler}>Logout</Button>
        </ButtonsHeader>
      )}
    </HeadersForms>
  );
};
const HeadersForms = styled.header`
  width: 100%;
  height: 80px;
  background-color: #ad9be9;
`;
const ButtonsHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-right: 20px;
  padding-top: 15px;
`;
