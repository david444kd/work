// import { Schema } from "formity";

// const schema: Schema = [
//   {
//     form: {
//       defaultValues: {
//         name: ["", []],
//         age: [18, []],
//       },
//       resolver: {
//         name: [
//           [{ "#$ne": ["#$name", ""] }, "Required"],
//           [{ "#$lt": [{ "#$strLen": "#$name" }, 20] }, "No more than 20 chars"],
//         ],
//       },
//       render: {
//         form: {
//           step: "$step",
//           defaultValues: "$defaultValues",
//           resolver: "$resolver",
//           onNext: "$onNext",
//           children: {
//             formLayout: {
//               heading: "Tell us about yourself",
//               description: "We would want to know a little bit more about you",
//               fields: [
//                 {
//                   textField: {
//                     name: "name",
//                     label: "Name",
//                   },
//                 },
//                 {
//                   numberField: {
//                     name: "age",
//                     label: "Age",
//                   },
//                 },
//               ],
//               button: {
//                 next: { text: "Next" },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   {
//     cond: {
//       if: { $gte: ["$age", 18] },
//       then: [
//         {
//           form: {
//             defaultValues: {
//               drive: [true, []],
//             },
//             resolver: {},
//             render: {
//               form: {
//                 step: "$step",
//                 defaultValues: "$defaultValues",
//                 resolver: "$resolver",
//                 onNext: "$onNext",
//                 children: {
//                   formLayout: {
//                     heading: "Can you drive?",
//                     description: "We would want to know if you can drive",
//                     fields: [
//                       {
//                         yesNo: {
//                           name: "drive",
//                           label: "Drive",
//                         },
//                       },
//                     ],
//                     button: {
//                       next: { text: "Next" },
//                     },
//                     back: {
//                       back: { onBack: "$onBack" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       ],
//       else: [{ variables: { drive: false } }],
//     },
//   },
//   {
//     return: {
//       name: "$name",
//       age: "$age",
//       drive: "$drive",
//     },
//   },
// ];

// export default schema;

import { Schema } from "formity";

const schema: Schema = [
  {
    form: {
      defaultValues: {
        website: ["", []],
      },
      resolver: {
        website: [
          [{ "#$ne": ["#$website", ""] }, "Required"],
          [
            {
              "#$regex": [
                "#$website",
                "^(https?:\\/\\/)?([\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-]*)?$",
              ],
            },
            "Please enter a valid website URL",
          ],
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
              heading: "Set up Finances specifically for your business",
              description:
                "Share a link to your website to let AI categorize and tailor the financial dashboard for you",
              fields: [
                {
                  textField: {
                    name: "website",
                    label: "Website URL",
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
    form: {
      defaultValues: {
        companyDescription: ["", []],
        productDescription: ["", []],
        targetAudience: ["", []],
        market: ["", []],
        price: ["", []],
      },
      resolver: {
        companyDescription: [
          [{ "#$ne": ["#$companyDescription", ""] }, "Required"],
          [
            { "#$gt": [{ "#$strLen": "#$companyDescription" }, 50] },
            "Description should be at least 50 characters",
          ],
        ],
        productDescription: [
          [{ "#$ne": ["#$productDescription", ""] }, "Required"],
          [
            { "#$gt": [{ "#$strLen": "#$productDescription" }, 50] },
            "Description should be at least 50 characters",
          ],
        ],
        targetAudience: [[{ "#$ne": ["#$targetAudience", ""] }, "Required"]],
        market: [[{ "#$ne": ["#$market", ""] }, "Required"]],
        price: [[{ "#$ne": ["#$price", ""] }, "Required"]],
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Business Details",
              description:
                "Please provide detailed information about your business",
              fields: [
                {
                  textField: {
                    name: "companyDescription",
                    label: "Company Description",
                  },
                },
                {
                  textField: {
                    name: "productDescription",
                    label: "Product Description",
                  },
                },
                {
                  textField: {
                    name: "targetAudience",
                    label: "Target Audience",
                  },
                },
                {
                  textField: {
                    name: "market",
                    label: "Market",
                  },
                },
                {
                  textField: {
                    name: "price",
                    label: "Price",
                  },
                },
              ],
              button: {
                next: { text: "Submit" },
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
