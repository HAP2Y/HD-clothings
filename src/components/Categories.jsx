import styled from "styled-components";
import {categories} from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  background-color: #f4f4f9;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item}/>
      ))}
    </Container>
  );
};

export default Categories;
