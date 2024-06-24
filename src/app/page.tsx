"use client";
import Form from "../components/Form";
import Details from "../components/Details";
import { styled } from "styled-components";
import { mobile } from "@/responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 100px;
  gap: 20px;

  ${mobile({
    margin: "5px",
    flexDirection: "column",
    gap: "5px"
  })};
`;


export default function Home() {
  return (
    <Container>
        <Form />
        <Details />
    </Container>
  );
}
