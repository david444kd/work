import { Fragment } from "react";
import {
  Components,
  Step,
  DefaultValues,
  Resolver,
  OnNext,
  OnBack,
} from "formity";
import { Value } from "expry";

import Form from "./components/form";
import FormLayout from "./components/form-layout";
import Next from "./components/navigation/next";
import Back from "./components/navigation/back";
import TextField from "./components/react-hook-form/text-field";
import NumberField from "./components/react-hook-form/number-field";
import YesNo from "./components/react-hook-form/yes-no";

type Parameters = {
  form: {
    step: Step;
    defaultValues: DefaultValues;
    resolver: Resolver;
    onNext: OnNext;
    children: Value;
  };
  formLayout: {
    heading: string;
    description: string;
    fields: Value[];
    button: Value;
    back?: Value;
  };
  next: {
    text: string;
  };
  back: {
    onBack: OnBack;
  };
  textField: {
    name: string;
    label: string;
  };
  numberField: {
    name: string;
    label: string;
  };
  yesNo: {
    name: string;
    label: string;
  };
};

const components: Components<Parameters> = {
  form: ({ step, defaultValues, resolver, onNext, children }, render) => (
    <Form
      key={step}
      defaultValues={defaultValues}
      resolver={resolver}
      onNext={onNext}
    >
      {render(children)}
    </Form>
  ),
  formLayout: ({ heading, description, fields, button, back }, render) => (
    <FormLayout
      heading={heading}
      description={description}
      fields={fields.map((field, index) => (
        <Fragment key={index}>{render(field)}</Fragment>
      ))}
      button={render(button)}
      back={back ? render(back) : undefined}
    />
  ),
  next: ({ text }) => <Next>{text}</Next>,
  back: ({ onBack }) => <Back onBack={onBack} />,
  textField: ({ name, label }) => <TextField name={name} label={label} />,
  numberField: ({ name, label }) => <NumberField name={name} label={label} />,
  yesNo: ({ name, label }) => <YesNo name={name} label={label} />,
};

export default components;
