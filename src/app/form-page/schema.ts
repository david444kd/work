import { Schema } from "formity";

const schema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["", []],
        age: [18, []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "Required"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 20] }, "No more than 20 chars"],
        ],
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Tell us about yourself",
              description: "We would want to know a little bit more about you",
              fields: [
                {
                  textField: {
                    name: "name",
                    label: "Name",
                  },
                },
                {
                  numberField: {
                    name: "age",
                    label: "Age",
                  },
                },
              ],
              button: {
                next: { text: "Next" },
              },
            },
          },
        },
      },
    },
  },
  {
    cond: {
      if: { $gte: ["$age", 18] },
      then: [
        {
          form: {
            defaultValues: {
              drive: [true, []],
            },
            resolver: {},
            render: {
              form: {
                step: "$step",
                defaultValues: "$defaultValues",
                resolver: "$resolver",
                onNext: "$onNext",
                children: {
                  formLayout: {
                    heading: "Can you drive?",
                    description: "We would want to know if you can drive",
                    fields: [
                      {
                        yesNo: {
                          name: "drive",
                          label: "Drive",
                        },
                      },
                    ],
                    button: {
                      next: { text: "Next" },
                    },
                    back: {
                      back: { onBack: "$onBack" },
                    },
                  },
                },
              },
            },
          },
        },
      ],
      else: [{ variables: { drive: false } }],
    },
  },
  {
    return: {
      name: "$name",
      age: "$age",
      drive: "$drive",
    },
  },
];

export default schema;
