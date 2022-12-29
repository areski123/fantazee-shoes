import * as yup from "yup";

export const validationSchemaDelivery = yup
  .object()
  .shape({
    PhoneInput: yup
      .string()
      .required("Phone Number is required")
      .min(11, "Please input proper number"),
    firstName: yup
      .string()
      .required("First Name is required")
      .max(30, "Please input proper First Name")
      .matches(/^[A-Z]+$/i, "This input is Alphabets only"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .max(30, "Please input proper Last Name")
      .matches(/^[A-Z]+$/i, "This input is Alphabets only"),
    city: yup
      .string()
      .required("City is required")
      .matches(/^[A-Z]+$/i, "This input is Alphabets only")
      .max(30, "Please input proper City"),
    zip: yup
      .string()
      .required("Postal Code is required")
      .min(2, "Postal Code must be at least 2 {ers long")
      .max(13, "Please input proper Postal Code"),
  })
  .required();

export const validationSchemaCredit = yup
  .object()
  .shape({
    cardNumber: yup
      .string()
      .required("Card Number is required")
      .min(16, "Please input proper Card Number")
      .max(19, "Please input proper Card Number"),
    holderName: yup
      .string()
      .required("Holder Name is required")
      .min(3, "Please input proper Holder Name")
      .max(20, "Please input proper Holder Name"),
    expirationDate: yup
      .string()
      .required("Expiration Date is required")
      .length(5, "Please input proper Expiration Date"),
    securityCode: yup
      .string()
      .required("Security Code is required")
      .min(3, "Please input proper Security Code")
      .max(4, "Please input proper Security Code"),
  })
  .required();
