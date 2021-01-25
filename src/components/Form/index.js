import React from "react";
import { Input, Select, RadioGroup, RadioButton } from "./formElements";

const FormContext = React.createContext();
FormContext.displayName = "FormContext";

function Form({ onSubmit, ...rest }) {
  const [formValues, setFormValues] = React.useState({});

  const handleInputChange = React.useCallback((e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  function handleSumbit(e) {
    e.preventDefault();
    onSubmit(formValues);
  }

  const providerValue = {
    formState: formValues,
    handleInputChange,
  };

  return (
    <FormContext.Provider value={providerValue}>
      <form onSubmit={handleSumbit} {...rest} />
    </FormContext.Provider>
  );
}

function useForm() {
  const formContext = React.useContext(FormContext);
  if (formContext === undefined)
    throw new Error("useForm must be used within a FormProvider");
  return formContext;
}

export { Form, useForm, Input, Select, RadioGroup, RadioButton };
