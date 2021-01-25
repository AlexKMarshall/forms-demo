import React from "react";

const FormContext = React.createContext();
FormContext.displayName = "FormContext";

function Form({ onSubmit, ...rest }) {
  const [formState, setFormState] = React.useState({});

  const handleInputChange = React.useCallback((e) => {
    console.log(e.target.name, e.target.value);
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  function handleSumbit(e) {
    e.preventDefault();
    onSubmit(formState);
  }

  const providerValue = {
    formState,
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

function VanillaForm() {
  function handleSumbit(formState) {
    console.log(formState);
  }

  return (
    <Form className="stack" onSubmit={handleSumbit}>
      <FormInput name="name" label="Name:" />
      <FormInput name="nickname" label="Nickname:" />
      <FormInput name="email" label="Email:" />
      <FormSelect name="size" label="Size:">
        <option value="" disabled>
          Please select
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </FormSelect>
      <FormInput name="country" label="Country:" />
      <RadioGroup name="hasPet">
        <p>Do you have a pet?</p>
        <RadioButton id="hasPetYes" value="yes" label="I do" />
        <RadioButton id="hasPetNo" value="no" label="I don't" />
      </RadioGroup>

      <FormSelect name="petType" label="Type of pet:">
        <option value="">Please select</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </FormSelect>
      <button type="submit">Submit</button>
    </Form>
  );
}

function FormInput({ name, label, type = "text", id, ...rest }) {
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

function FormSelect({ name, label, id, children, ...rest }) {
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

function useRadioButton() {
  const context = React.useContext(RadioGroupContext);
  if (context === undefined)
    throw new Error(
      "useRadioButton must be used within a RadioGroup component"
    );
  return context;
}

function RadioButton({ id, value, label }) {
  const { name } = useRadioButton();
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

export { VanillaForm };
