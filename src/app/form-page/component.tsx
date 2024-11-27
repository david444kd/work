import { Fragment, useEffect, useState } from "react";
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
    step?: Step;
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
  formLayout: FormLayoutComponent, // Используем новый компонент
  next: ({ text }) => <Next>{text}</Next>,
  back: ({ onBack }) => <Back onBack={onBack} />,
  textField: ({ name, label }) => <TextField name={name} label={label} />,
  numberField: ({ name, label }) => <NumberField name={name} label={label} />,
  yesNo: ({ name, label }) => <YesNo name={name} label={label} />,
};

export default components;

function FormLayoutComponent(
  {
    heading,
    description,
    fields,
    button,
    back,
    step,
  }: Parameters["formLayout"],
  render: any
) {
  const [isLoading, setIsLoading] = useState(true); // Начальное состояние загрузки
  const [delayedStep, setDelayedStep] = useState(step);

  useEffect(() => {
    // Показываем загрузку при монтировании
    const initialTimeout = setTimeout(() => {
      setIsLoading(false); // Скрыть загрузку после инициализации
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (step !== delayedStep) {
      setIsLoading(true); // Показать загрузку перед переключением
      const timeout = setTimeout(() => {
        setDelayedStep(step); // Обновить шаг
        setIsLoading(false); // Скрыть загрузку после переключения
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [step, delayedStep]);

  if (isLoading) {
    return <LoadingScreen />; // Рендер индикатора загрузки
  }

  return (
    <FormLayout
      step={delayedStep}
      heading={heading}
      description={description}
      fields={fields.map((field, index) => (
        <Fragment key={index}>{render(field)}</Fragment>
      ))}
      button={render(button)}
      back={back ? render(back) : undefined}
    />
  );
}

// Компонент для отображения индикатора загрузки
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-full w-full ">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-white text-lg">Loading...</p>
    </div>
  </div>
);
