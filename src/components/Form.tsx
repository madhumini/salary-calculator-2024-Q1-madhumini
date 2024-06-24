"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBasicSalary,
  addEarning,
  addDeduction,
  resetForm,
  removeEarning,
  removeDeduction,
} from "../Redux/salarySlice";
import { styled } from "styled-components";
import { persistor } from "../Redux/store";
import Image from "next/image";
import { mobile } from "@/responsive";

const FormContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  min-height: 87vh;
  border-radius: 6px;
  position: relative;
  padding: 25px;

  ${mobile({
    padding: "10px",
    margin: "10px",
    flex: 1,
    justifyContent: "center",
    width: "85%",
    minHeight: "50vh",
  })};
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  ${mobile({
    marginBottom: "7px",
    flexDirection: "column",
    gap: "10px",
    position: "relative",
    border: "1px solid",
    borderColor: "lightgray",
    padding: "50px 10px 10px 10px",
  })};
`;
const ResetButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 20px;
  ${mobile({ right: "4px", top: "4px" })};
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  flex: start;
  width: max-content;
  height: 40px;
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const RemoveButton = styled.button`
  border: none;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  ${mobile({ position: "absolute", top: "3px", right: "5px" })};
`;
const Span = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0052ea;
  margin: 4px;
  line-height: 20px;
  ${mobile({ lineHeight: "10px", fontSize: "12px" })};
`;
const AddToCalculationSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0052ea;
  margin: 4px;
  line-height: 20px;
  ${mobile({ lineHeight: "10px", fontSize: "12px" })};
`;
const SmallSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #757575;
  margin: 0px 0px 8px 0px;
  line-height: 20px;
  ${mobile({ lineHeight: "10px", fontSize: "10px", marginBottom: "10px" })};
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 4px;
  line-height: 32px;
  letter-spacing: -0.02px;
  ${mobile({ fontSize: "16px" })};
`;
const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 20px 0px 10px 0px;
  line-height: 24px;
  letter-spacing: -0.1px;
  ${mobile({ lineHeight: "10px", fontSize: "14px" })};
`;
const Input = styled.input`
  width: 356px;
  height: 48px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px 12px 15px;
  border-radius: 4px;
  margin-right: 8px;
  ${mobile({ width: "270px", height: "30px" })};
`;
const TypeInput = styled.input`
  width: 212px;
  height: 48px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px 12px 15px;
  border-radius: 4px;
  margin-right: 8px;
  ${mobile({ width: "250px", height: "30px" })};
`;
const ValueInput = styled.input`
  width: 136px;
  height: 48px;
  border: 1px solid #e0e0e0;
  padding: 12px 15px 12px 15px;
  border-radius: 4px;
  margin-right: 8px;
  ${mobile({ width: "250px", height: "30px" })};
`;
const Label = styled.label`
  display: flex;
  align-items: center;
`;
const BasicSalaryLabel = styled.label`
  ${mobile({ gap: "8px" })};
`;
const CheckboxSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  line-height: 24px;
  ${mobile({ fontSize: "14px" })};
`;
const CheckboxGroup = styled.div`
  display: flex;
  width: 145px;
  height: 32px;
  align-items: center;
  gap: 16px;
  ${mobile({ width: "300px", height: "30px", marginLeft: "30px" })};
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 24px;
  height: 24px;
  border: 1px solid #e0e0e0;
  margin-right: 8px;
`;

const Form: React.FC = () => {
  interface Earning {
    type: string;
    amount: number;
    epf: boolean;
  }

  interface Deduction {
    type: string;
    amount: number;
  }

  const dispatch = useDispatch();
  const [basicSalary, setBasicSalaryValue] = useState(0);
  const [earnings, setEarnings] = useState<Earning[]>([
    { type: "", amount: 0, epf: false },
  ]);
  const [deductions, setDeductions] = useState<Deduction[]>([
    { type: "", amount: 0 },
  ]);

  const earningButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const earningSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const deductionButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const deductionSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleBasicSalaryChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setBasicSalaryValue(parsedValue);
      dispatch(setBasicSalary(parsedValue));
    } else {
      setBasicSalaryValue(0); // or set it to an empty string if you prefer
    }
  };

  const handleAddEarning = () => {
    setEarnings([...earnings, { type: "", amount: 0, epf: false }]);
  };

  const handleAddDeduction = () => {
    setDeductions([...deductions, { type: "", amount: 0 }]);
  };

  const handleEarningChange = (
    index: number,
    field: keyof Earning,
    value: string | number | boolean
  ) => {
    if (earningSpanRefs.current[index]!.innerHTML === "Added to calculation") {
      earningSpanRefs.current[index]!.innerHTML = "Add to calculation";
      earningButtonRefs.current[index]!.classList.remove("disabled");
    }
    const newEarnings = earnings.slice();
    const parsedValue =
      field === "amount" ? parseFloat(value as string) : value;
    newEarnings[index] = { ...newEarnings[index], [field]: parsedValue };
    setEarnings(newEarnings);
  };

  const handleAddEarningToCalculation = (index: number) => {
    const newEarnings = [...earnings];
    dispatch(addEarning({ index, earning: newEarnings[index] }));

    if (earningSpanRefs.current[index]) {
      earningSpanRefs.current[index]!.innerHTML = "Added to calculation";
    }
    if (earningButtonRefs.current[index]) {
      earningButtonRefs.current[index]!.classList.add("disabled");
    }
  };

  const handleDeductionChange = (
    index: number,
    field: keyof Deduction,
    value: string | number
  ) => {
    if (
      deductionSpanRefs.current[index]!.innerHTML === "Added to calculation"
    ) {
      deductionSpanRefs.current[index]!.innerHTML = "Add to calculation";
      deductionButtonRefs.current[index]!.classList.remove("disabled");
    }
    const newDeductions = [...deductions];
    const parsedValue =
      field === "amount" ? parseFloat(value as string) : value;
    newDeductions[index] = { ...newDeductions[index], [field]: parsedValue };
    setDeductions(newDeductions);
  };

  const handleAddDeductionToCalculation = (index: number) => {
    const newDeductions = [...deductions];
    dispatch(addDeduction({ index, deduction: newDeductions[index] }));

    if (deductionSpanRefs.current[index]) {
      deductionSpanRefs.current[index]!.innerHTML = "Added to calculation";
    }
    if (deductionButtonRefs.current[index]) {
      deductionButtonRefs.current[index]!.classList.add("disabled");
    }
  };

  const handleReset = () => {
    setEarnings([]);
    setDeductions([]);
    setBasicSalaryValue(0);
    dispatch(resetForm());
    persistor.purge(); // Clear the persisted state
  };

  const handleRemoveEarning = (index: number) => {
    const updatedEarnings = [...earnings];
    updatedEarnings.splice(index, 1);
    setEarnings(updatedEarnings);
    dispatch(removeEarning(index));
  };

  const handleRemoveDeduction = (index: number) => {
    const updatedDeductions = [...deductions];
    updatedDeductions.splice(index, 1);
    setDeductions(updatedDeductions);
    dispatch(removeDeduction(index));
  };

  return (
    <FormContainer>
      <ResetButton onClick={handleReset}>
        <Image src="/ResetIcon.png" width={21} height={18} alt="Reset Icon" />
        <Span>Reset</Span>
      </ResetButton>
      <Title>Calculate Your Salary</Title>
      <BasicSalaryLabel>
        <SubTitle>Basic Salary</SubTitle>
        <Input
          placeholder="Basic Salary"
          type="number"
          value={basicSalary === 0 ? "" : basicSalary}
          onChange={(e) => handleBasicSalaryChange(e.target.value)}
        />
      </BasicSalaryLabel>
      <SubTitle>Earnings</SubTitle>
      <SmallSpan>Allowance, Fixed Allowance, Bonus and etc.</SmallSpan>
      {earnings.map((earning, index) => (
        <InputGroup key={index}>
          <TypeInput
            type="text"
            placeholder="Type"
            value={earning.type}
            onChange={(e) => handleEarningChange(index, "type", e.target.value)}
          />
          <ValueInput
            type="number"
            placeholder="Amount"
            value={earning.amount === 0 ? "" : earning.amount}
            onChange={(e) =>
              handleEarningChange(index, "amount", e.target.value)
            }
          />
          <CheckboxGroup>
            <RemoveButton onClick={() => handleRemoveEarning(index)}>
              <Image
                src="/RemoveIcon.png"
                width={12}
                height={12}
                alt="Remove Icon"
              />
            </RemoveButton>
            <Label>
              <Checkbox
                type="checkbox"
                checked={earning.epf}
                onChange={(e) =>
                  handleEarningChange(index, "epf", e.target.checked)
                }
              />
              <CheckboxSpan>EPF/ETF</CheckboxSpan>
            </Label>
          </CheckboxGroup>
          <Button
            onClick={() => handleAddEarningToCalculation(index)}
            ref={(el) => (earningButtonRefs.current[index] = el)}
          >
            <Image src="/AddIcon.png" width={24} height={24} alt="Add Icon" />

            <AddToCalculationSpan
              ref={(el) => (earningSpanRefs.current[index] = el)}
            >
              Add To Calculation
            </AddToCalculationSpan>
          </Button>
        </InputGroup>
      ))}
      <Button onClick={handleAddEarning}>
        <Image src="/AddIcon.png" width={24} height={24} alt="Add Icon" />

        <Span>Add New Allowance</Span>
      </Button>

      <SubTitle>Deductions</SubTitle>
      <SmallSpan>Salary Advances, Loan Deductions and all</SmallSpan>
      {deductions.map((deduction, index) => (
        <InputGroup key={index}>
          <TypeInput
            type="text"
            placeholder="Type"
            value={deduction.type}
            onChange={(e) =>
              handleDeductionChange(index, "type", e.target.value)
            }
          />
          <ValueInput
            type="number"
            placeholder="Amount"
            value={deduction.amount === 0 ? "" : deduction.amount}
            onChange={(e) =>
              handleDeductionChange(index, "amount", e.target.value)
            }
          />
          <RemoveButton onClick={() => handleRemoveDeduction(index)}>
            <Image
              src="/RemoveIcon.png"
              width={12}
              height={12}
              alt="Remove Icon"
            />
          </RemoveButton>
          <Button
            onClick={() => handleAddDeductionToCalculation(index)}
            ref={(el) => (deductionButtonRefs.current[index] = el)}
          >
            <Image src="/AddIcon.png" width={24} height={24} alt="Add Icon" />

            <AddToCalculationSpan
              ref={(el) => (deductionSpanRefs.current[index] = el)}
            >
              Add To Calculation
            </AddToCalculationSpan>
          </Button>
        </InputGroup>
      ))}
      <Button onClick={handleAddDeduction}>
        <Image src="/AddIcon.png" width={24} height={24} alt="Add Icon" />

        <Span>Add New Deduction</Span>
      </Button>
    </FormContainer>
  );
};

export default Form;
