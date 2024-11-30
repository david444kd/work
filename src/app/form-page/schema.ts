import { Schema } from "formity";

const schema: Schema = [
  {
    form: {
      defaultValues: {}, // Можно оставить пустым, так как на этом шаге нет полей
      resolver: {}, // Для третьего шага не требуется валидация
      render: {
        form: {
          step: "$step",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Set up Finances specifically for your business",
              description:
                "Share a link to your website to let AI categorize and tailor the financial dashboard for you",
              fields: [],
              button: {
                next: { text: "Next" },
              },
              step: "$step",
            },
          },
        },
      },
    },
  },
  {
    form: {
      defaultValues: {}, // Можно оставить пустым, так как на этом шаге нет полей
      resolver: {}, // Для третьего шага не требуется валидация
      render: {
        form: {
          step: "$step",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Business Details",
              description:
                "Please provide detailed information about your business",
              fields: [],
              button: {
                next: { text: "Next" },
              },
              back: {
                back: { onBack: "$onBack" },
              },
              step: "$step",
            },
          },
        },
      },
    },
  },
  {
    form: {
      defaultValues: {}, // Можно оставить пустым, так как на этом шаге нет полей
      resolver: {}, // Для третьего шага не требуется валидация
      render: {
        form: {
          step: "$step",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "All Set!",
              description: "You've completed all steps. Click below to finish.",
              fields: [],
              button: {
                next: { text: "Finish" },
              },
              back: {
                back: { onBack: "$onBack" },
              },
              step: "$step",
            },
          },
        },
      },
    },
  },
  {
    return: {
      website: "$website",
      companyDescription: "$companyDescription",
      productDescription: "$productDescription",
      targetAudience: "$targetAudience",
      market: "$market",
      price: "$price",
    },
  },
];

export default schema;

// import { Schema } from "formity";

// const schema: Schema = [
//   {
//     form: {
//       defaultValues: {
//         website: ["", []],
//       },
//       resolver: {},
//       render: {
//         form: {
//           step: "$step",
//           defaultValues: "$defaultValues",
//           resolver: "$resolver",
//           onNext: "$onNext",
//           children: {
//             formLayout: {
//               heading: "Set up Finances specifically for your business",
//               description:
//                 "Share a link to your website to let AI categorize and tailor the financial dashboard for you",
//               fields: [],
//               button: {
//                 next: { text: "Next" },
//               },
//               step: "$step",
//             },
//           },
//         },
//       },
//     },
//   },
//   {
//     form: {
//       defaultValues: {
//         companyDescription: ["", []],
//         productDescription: ["", []],
//         targetAudience: ["", []],
//         market: ["", []],
//         price: ["", []],
//       },
//       resolver: {
//         companyDescription: [
//           [{ "#$ne": ["#$companyDescription", ""] }, "Required"],
//           [
//             { "#$gt": [{ "#$strLen": "#$companyDescription" }, 50] },
//             "Description should be at least 50 characters",
//           ],
//         ],
//         productDescription: [
//           [{ "#$ne": ["#$productDescription", ""] }, "Required"],
//           [
//             { "#$gt": [{ "#$strLen": "#$productDescription" }, 50] },
//             "Description should be at least 50 characters",
//           ],
//         ],
//         targetAudience: [[{ "#$ne": ["#$targetAudience", ""] }, "Required"]],
//         market: [[{ "#$ne": ["#$market", ""] }, "Required"]],
//         price: [[{ "#$ne": ["#$price", ""] }, "Required"]],
//       },
//       render: {
//         form: {
//           step: "$step",
//           defaultValues: "$defaultValues",
//           resolver: "$resolver",
//           onNext: "$onNext",
//           children: {
//             formLayout: {
//               heading: "Business Details",
//               description:
//                 "Please provide detailed information about your business",
//               fields: [
//                 {
//                   textField: {
//                     name: "companyDescription",
//                     label: "Company Description",
//                   },
//                 },
//                 {
//                   textField: {
//                     name: "productDescription",
//                     label: "Product Description",
//                   },
//                 },
//                 {
//                   textField: {
//                     name: "targetAudience",
//                     label: "Target Audience",
//                   },
//                 },
//                 {
//                   textField: {
//                     name: "market",
//                     label: "Market",
//                   },
//                 },
//                 {
//                   textField: {
//                     name: "price",
//                     label: "Price",
//                   },
//                 },
//               ],
//               button: {
//                 next: { text: "Next" },
//               },
//               back: {
//                 back: { onBack: "$onBack" },
//               },
//               step: "$step",
//             },
//           },
//         },
//       },
//     },
//   },
//   {
//     form: {
//       defaultValues: {}, // Можно оставить пустым, так как на этом шаге нет полей
//       resolver: {}, // Для третьего шага не требуется валидация
//       render: {
//         form: {
//           step: "$step",
//           onNext: "$onNext",
//           children: {
//             formLayout: {
//               heading: "All Set!",
//               description: "You've completed all steps. Click below to finish.",
//               fields: [],
//               button: {
//                 next: { text: "Finish" },
//               },
//               back: {
//                 back: { onBack: "$onBack" },
//               },
//               step: "$step",
//             },
//           },
//         },
//       },
//     },
//   },
//   {
//     return: {
//       website: "$website",
//       companyDescription: "$companyDescription",
//       productDescription: "$productDescription",
//       targetAudience: "$targetAudience",
//       market: "$market",
//       price: "$price",
//     },
//   },
// ];

// export default schema;
