import React from "react";
import { Steps, Button, message } from "antd";
import SignUp from "../../component/signUp";
import Download from "../../component/download";
import SuccessfulWalet from "../../component/successfulWalet";

const Register = () => {
  const { Step } = Steps;

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First",
      content: <SignUp nextStep={next}/>,
      description: "STEP 1. Create password"
    },
    {
      title: "Second",
      content: <Download nextStep={next}/>,
      description: "STEP 2. Download keystore file"
    },
    {
      title: "Last",
      content: <SuccessfulWalet/>,
      description: "STEP 3. Well done"
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} description={item.description} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <div className="login-form"></div>
        {steps[current].content}
      </div>
    </>
  );
};

export default Register;
