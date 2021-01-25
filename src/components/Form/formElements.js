import React from "react";
import { useForm } from ".";

function Input({ name, label, type = "text", id, ...rest }) {
  const { formState, handleInputChange } = useForm();

  const value = formState[name] ?? "";

  return (
    <div className="formField">
      <label htmlFor={id ?? name}>{label}</label>
      <input
        id={id ?? name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
    </div>
  );
}

function Select({ name, label, id, children, ...rest }) {
  const { formState, handleInputChange } = useForm();
  const value = formState[name] ?? "";

  return (
    <div className="formField">
      <label htmlFor={id ?? name}>{label}</label>
      <select
        name={name}
        id={id ?? name}
        value={value}
        onChange={handleInputChange}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

const RadioGroupContext = React.createContext();
RadioGroupContext.displayName = "RadioGroupContext";

function RadioGroup({ name, children }) {
  const providerValue = { name };

  return (
    <RadioGroupContext.Provider value={providerValue}>
      {children}
    </RadioGroupContext.Provider>
  );
}

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  if (context === undefined)
    throw new Error(
      "useRadioButton must be used within a RadioGroup component"
    );
  return context;
}

function RadioButton({ id, value, label }) {
  const { name } = useRadioGroup();
  const { handleInputChange } = useForm();

  return (
    <div>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={handleInputChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { Input, Select, RadioGroup, RadioButton };
