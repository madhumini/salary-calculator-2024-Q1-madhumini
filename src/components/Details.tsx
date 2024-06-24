"use client";
import { mobile } from "@/responsive";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid lightgray;
  min-height: 87vh;
  border-radius: 6px;
  ${mobile({
    padding: "10px",
    margin: "10px",
    flex: 1,
    justifyContent: "center",
    width: "85%",
  })};
`;
const SubtitleContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
`;
const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #757575;
  margin: 20px 4px;
  ${mobile({ fontSize: "12px" })};
`;
const NetSalaryContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  padding: 3px 10px;
  min-height: 56px;
  margin: 20px 0px;
`;
const DetailsContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
`;
const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin: 4px;
  line-height: 24px;
  ${mobile({ lineHeight: "10px", fontSize: "14px" })};
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 4px;
  line-height: 32px;
  letter-spacing: -0.02px;
  ${mobile({ lineHeight: "20px", fontSize: "16px" })};
`;
const NetSalarySpan = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 4px;
  line-height: 24px;
  letter-spacing: -0.1px;
  ${mobile({ lineHeight: "10px", fontSize: "12px" })};
`;
const LastSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin: 25px 4px;
  line-height: 24px;
  ${mobile({ lineHeight: "10px", fontSize: "12px" })};
`;
const Details: React.FC = () => {
  const salaryState = useSelector((state: any) => state.salary);

  const calculateDetails = () => {
    const totalEarnings =
      salaryState?.basicSalary +
      salaryState?.earnings.reduce(
        (acc: number, earning: any) => acc + earning.amount,
        0
      );
    const totalEarningsForEPF =
      salaryState?.basicSalary +
      salaryState?.earnings
        .filter((earning: any) => earning?.epf)
        .reduce((acc: number, earning: any) => acc + earning?.amount, 0);
    const grossDeduction = salaryState?.deductions.reduce(
      (acc: number, deduction: any) => acc + deduction?.amount,
      0
    );
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;
    const consent = 25500;
    const taxPercentage =
      grossEarnings <= 100000
        ? 0
        : grossEarnings <= 141667
        ? 0.06
        : grossEarnings <= 183333
        ? 0.12
        : grossEarnings <= 225000
        ? 0.18
        : grossEarnings <= 266667
        ? 0.24
        : grossEarnings <= 308333
        ? 0.3
        : 0.36;
    const APIT = grossEarnings * taxPercentage - consent;
    const netSalary = grossEarnings - employeeEPF - APIT;
    const CTC = grossEarnings + employerEPF + employerETF;

    return {
      basicSalary: salaryState?.basicSalary,
      totalEarnings,
      totalEarningsForEPF,
      grossDeduction,
      grossEarnings,
      grossSalaryForEPF,
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      CTC,
    };
  };
  useEffect(() => {
    calculateDetails();
  }, []);
  const details = calculateDetails();

  return (
    <Container>
      <Title>Your Salary</Title>
      <SubtitleContainer>
        <Subtitle>Items</Subtitle>
        <Subtitle>Amount</Subtitle>
      </SubtitleContainer>
      <DetailsContainer>
        <Span>Basic Salary: </Span>
        <Span>{details.basicSalary ? details.basicSalary : 0}</Span>
      </DetailsContainer>
      <DetailsContainer>
        <Span>Gross Earnings: </Span>
        <Span>{details.grossEarnings ? details.grossEarnings : 0}</Span>
      </DetailsContainer>
      <DetailsContainer>
        <Span>
          Gross Deductions:{" "}
          {details.grossDeduction ? details.grossDeduction : 0}
        </Span>
      </DetailsContainer>
      <DetailsContainer>
        <Span>Employee EPF (8%): </Span>
        <Span>{details.employeeEPF ? details.employeeEPF : 0}</Span>
      </DetailsContainer>
      <DetailsContainer>
        <Span>APIT: </Span>
        <Span>{details.APIT ? details.APIT : 0}</Span>
      </DetailsContainer>
      <NetSalaryContainer>
        <NetSalarySpan>Net Salary (Take Home)</NetSalarySpan>
        <NetSalarySpan>
          {details.netSalary ? details.netSalary : 0}
        </NetSalarySpan>
      </NetSalaryContainer>
      <Subtitle>Contribution from the Employer</Subtitle>
      <DetailsContainer>
        <Span>Employer EPF (12%): </Span>
        <Span>{details.employerEPF ? details.employerEPF : 0}</Span>
      </DetailsContainer>
      <DetailsContainer>
        <Span>Employer ETF (3%): </Span>
        <Span>{details.employerETF ? details.employerETF : 0}</Span>
      </DetailsContainer>
      <DetailsContainer>
        <LastSpan>
          CTC (Cost to Company): </LastSpan><LastSpan>
          {details.CTC ? details.CTC : 0}
        </LastSpan>
      </DetailsContainer>
    </Container>
  );
};

export default Details;
