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
              "#$fn": [
                "#$website",
                `(value) => {
                  const urlPattern = new RegExp(
                    '^https?:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/.*)?$'
                  );
                  return urlPattern.test(value);
                }`,
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
              step: "$step",
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
