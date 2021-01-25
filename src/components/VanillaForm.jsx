import React from "react";

import { Form, Input, Select, RadioGroup, RadioButton } from "./Form";

function VanillaForm() {
  function handleSumbit(formValues) {
    console.log(formValues);
  }

  return (
    <Form className="stack" onSubmit={handleSumbit}>
      <Input name="name" label="Name:" />
      <Input name="nickname" label="Nickname:" />
      <Input name="email" label="Email:" />
      <Select name="size" label="Size:">
        <option value="" disabled>
          Please select
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </Select>
      <Input name="country" label="Country:" />
      <RadioGroup name="hasPet">
        <p>Do you have a pet?</p>
        <RadioButton id="hasPetYes" value="yes" label="I do" />
        <RadioButton id="hasPetNo" value="no" label="I don't" />
      </RadioGroup>

      <Select name="petType" label="Type of pet:">
        <option value="">Please select</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </Select>
      <button type="submit">Submit</button>
    </Form>
  );
}

export { VanillaForm };
