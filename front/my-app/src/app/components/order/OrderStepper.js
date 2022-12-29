import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectProductToOrder,
  selectFormSubmit,
} from "../../Slices/orderSlice";
import DeliveryDetails from "./DeliveryDetails";
import ProductsToOrder from "./ProductsToOrder";
import PaymentCheckout from "../paymentCheckout/PaymentCheckout";

import { Toast } from "primereact/toast";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const OrderStepper = () => {
  const formRef = useRef();
  const toastTL = useRef(null);
  const products = useSelector(selectProductToOrder);
  const [activeStep, setActiveStep] = useState(0);
  let formSubmit = useSelector(selectFormSubmit);

  const steps = [
    //different components will be shown in different steps
    { label: "Picking shoes", component: ProductsToOrder },
    {
      label: "Delivery details",
      component: DeliveryDetails,
      ref: formRef,
    },
    { label: "Payment", component: PaymentCheckout },
  ];

  const showTopLeft = () => {
    //shows toast and their details
    toastTL.current.show({
      severity: "warn",
      summary: "No pair of shoes has been selected for order.",
      detail:
        "Please select the shoes you want to order from the shopping cart.",
      life: 3000,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepSubmit = async () => {
    if (!activeStep) {
      if (products.length === 0) {
        //if the first step and no product was selected
        showTopLeft();
      } else {
        handleNext();
      }
    } else if (activeStep === 1) {
      //if the second step then sends the reference to the DeliveryDetails componen
      //asynchronously submit the form
      await formRef.current.submitForm();
      if (formSubmit) {
        //if the form was approved and the user returned to the previous step again, then resubmit the form
        formRef.current.submitForm();
        handleNext();
      }
    } else if (activeStep === 2) {
      handleNext();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (activeStep === 1 && formSubmit) {
      handleStepSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmit]);

  return (
    <Box style={{ maxWidth: "100%", minHeight: "100vh" }}>
      <Stepper activeStep={activeStep} style={{ marginTop: 20 }}>
        {steps.map((step) => {
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {steps.map(
          (step, index) =>
            activeStep === index && (
              <step.component key={index} reference={step.ref} />
            )
        )}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, ml: 5 }}
            size="large"
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            disabled={activeStep === steps.length - 1 ? true : false}
            size="large"
            sx={{ mr: 5, ml: 1 }}
            onClick={handleStepSubmit}
          >
            {activeStep === steps.length - 1 ? "" : "Next"}
          </Button>
        </Box>
      </>
      <div>
        <Toast ref={toastTL} position="top-left" />
      </div>
    </Box>
  );
};

export default OrderStepper;
