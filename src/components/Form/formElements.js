import React from "react";
import { useForm } from ".";

function getLabelContent(labelText, required) {
  return (
    <>
      {labelText}
      {required ? <span className="required">*</span> : null}
    </>
  );
}

function Input({ name, label, type = "text", id, required, ...rest }) {
  const { formValues, handleInputChange: formHandleChange } = useForm();
  const inputRef = React.useRef();

  const hasError = !inputRef.current?.validity.valid;

  function handleInputChange(e) {
    formHandleChange(e);
  }

  const value = formValues[name] ?? "";

  return (
    <div className="formField">
      <label htmlFor={id ?? name}>{getLabelContent(label, required)}</label>
      <input
        id={id ?? name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        required={required}
        ref={inputRef}
        {...rest}
      />
      {hasError ? <div className="field-error">There is an error</div> : null}
    </div>
  );
}

function Select({ name, label, id, children, required, ...rest }) {
  const { formValues, handleInputChange } = useForm();
  const value = formValues[name] ?? "";
  const selectRef = React.useRef();

  const hasError = !selectRef.current?.validity.valid;

  return (
    <div className="formField">
      <label htmlFor={id ?? name}>{getLabelContent(label, required)}</label>
      <select
        name={name}
        id={id ?? name}
        value={value}
        onChange={handleInputChange}
        required={required}
        ref={selectRef}
        {...rest}
      >
        {children}
      </select>
      {hasError ? <div className="field-error">There is an error</div> : null}
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

function RadioButton({ id, value, label, ...rest }) {
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
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { Input, Select, RadioGroup, RadioButton };
