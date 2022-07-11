import React from "react";
import "./test-component.scss";

interface iProps {
  text: string;
}

const TestComponent: React.FC<iProps> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default TestComponent;
