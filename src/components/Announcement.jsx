import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  ${mobile({ height: "40px", fontSize: "11px", padding: "0px 3px" })}
`;

const Announcement = () => {
  return (
    <Container>
      Black Friday Sale! Upto 55% Off until 28th November, 2021. Free Shipping
      on Orders Over $50.
    </Container>
  );
};

export default Announcement;
