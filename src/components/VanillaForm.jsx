import React from "react";

import { Form, Input, Select, RadioGroup, RadioButton, useForm } from "./Form";

function VanillaForm() {
  function handleSumbit(formValues) {
    console.log(formValues);
  }

  return (
    <Form className="stack" onSubmit={handleSumbit}>
      <FormDetails />
    </Form>
  );
}

function FormDetails() {
  const { formValues } = useForm();

  return (
    <>
      <Input name="name" label="Name" required />
      <Input name="nickname" label="Nickname" />
      <Input name="email" label="Email" required type="email" />
      <Select name="size" label="Size">
        <option value="" disabled>
          Please select
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </Select>
      <Input name="country" label="Country" />
      <RadioGroup name="hasPet">
        <p>Do you have a pet?</p>
        <RadioButton id="hasPetNo" value="no" label="I don't" defaultChecked />
        <RadioButton id="hasPetYes" value="yes" label="I do" />
      </RadioGroup>
      {formValues.hasPet === "yes" ? (
        <Select name="petType" label="Type of pet" required>
          <option value="">Please select</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </Select>
      ) : null}
      <button type="submit">Submit</button>
    </>
  );
}

export { VanillaForm };
