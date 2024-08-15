"use client";
import React, { useState } from "react";
import { Input, InputProps } from "@/frontend/components/ui/input";
import { Button } from "@/frontend/components/ui/button";

type InputWithActionProps = InputProps & {
  actionLabel?: string;
  handleAction?: Function;
  initialValue?: any;
};

const InputWithAction = ({
  className,
  type,
  actionLabel,
  handleAction,
  initialValue,
  ...props
}: InputWithActionProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onAction = () => {
    handleAction && handleAction(inputValue);
  };
  return (
    <div className="relative w-full">
      <Input value={inputValue} onChange={handleChange} {...props} />
      {handleAction && (
        <Button
          onClick={onAction}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-none"
          type="button"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

InputWithAction.displayName = "InputWithAction";
export default InputWithAction;
