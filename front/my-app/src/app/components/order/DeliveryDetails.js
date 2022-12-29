import React from "react";
import { useState, useEffect, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./DeliveryDetails.css";
import { validationSchemaDelivery } from "../../data/validation";
import {
  selectDeliveryDetails,
  setDetails,
  setSubmit,
} from "../../Slices/orderSlice";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

function DeliveryDetails({ reference }) {
  const details = useSelector(selectDeliveryDetails);
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const initial = details
    ? {
        firstName: details.firstName,
        lastName: details.lastName,
        city: details.city,
        zip: details.zip,
      }
    : {
        firstName: "",
        lastName: "",
        city: "",
        zip: "",
      };

  const formOptions = {
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchemaDelivery),
    defaultValues: initial,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount },
    setValue,
  } = useForm(formOptions);

  useImperativeHandle(reference, () => ({
    //receives a reference from the parent component and calls the submit form function
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data, event) => {
    data.country = country;
    dispatch(setDetails(data));
    dispatch(setSubmit(true));
  };

  const onReset = (e) => {
    reset();
    reset({ PhoneInput: "" });
    dispatch(setDetails([]));
    setPhone(dialCode);
    dispatch(setSubmit(false));
  };

  const handleOnChange = (value, data, event, formattedValue) => {
    const rawPhone = value.slice(data.dialCode.length); //phone number without dial code
    setPhone(formattedValue); //phone number with dial code and + (+972..)
    setDialCode(data.dialCode);
    setCountry(data.name);
    if (data.name === "Israel" && value.length === 13) {
      //value - phone number with dial code but without + (972..)
      // set value like this(05..)
      setValue("PhoneInput", rawPhone, {
        shouldDirty: true,
        shouldValidate: submitCount > 0,
      });
    } else {
      // set value like this(+972 5..)
      setValue("PhoneInput", formattedValue, {
        shouldDirty: true,
        shouldValidate: submitCount > 0,
      });
    }
  };

  useEffect(() => {
    dispatch(setSubmit(false));
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      //manually adding a value to the form for validation
      setPhone(details.PhoneInput);
      setValue("PhoneInput", details.PhoneInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol lg="4">
                    <MDBContainer className="ms-3">
                      <label htmlFor="firstName" className="deliveryLable">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        className="deliveryInput"
                        name="firstName"
                        {...register("firstName")}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="firstName"
                        render={({ message }) => (
                          <p className="eMessage small mb-0">{message}</p>
                        )}
                      />
                    </MDBContainer>
                  </MDBCol>
                  <MDBCol lg="4">
                    <MDBContainer className="ms-3">
                      <label htmlFor="lastName" className="deliveryLable">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        className="deliveryInput"
                        name="lastName"
                        {...register("lastName")}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="lastName"
                        render={({ message }) => (
                          <p className="eMessage small mb-0">{message}</p>
                        )}
                      />
                    </MDBContainer>
                  </MDBCol>
                  <MDBCol lg="4">
                    <MDBContainer className="ms-3">
                      <label htmlFor="PhoneInput" className="deliveryLable">
                        Phone Number
                      </label>
                      <PhoneInput
                        inputProps={{
                          name: "PhoneInput",
                          id: "PhoneInput",
                        }}
                        placeholder="Enter phone number"
                        countryCodeEditable={false}
                        enableAreaCodeStretch
                        value={phone}
                        country={"il"}
                        onChange={handleOnChange}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="PhoneInput"
                        render={({ message }) => (
                          <p className="eMessage small mb-0">{message}</p>
                        )}
                      />
                    </MDBContainer>
                  </MDBCol>
                  <MDBCol lg="4">
                    <MDBContainer className="ms-3">
                      <label htmlFor="city" className="deliveryLable">
                        City
                      </label>
                      <input
                        id="city"
                        className="deliveryInput"
                        name="city"
                        {...register("city")}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="city"
                        render={({ message }) => (
                          <p className="eMessage small mb-0">{message}</p>
                        )}
                      />
                    </MDBContainer>
                  </MDBCol>
                  <MDBCol lg="4">
                    <MDBContainer className="ms-3">
                      <label htmlFor="zip" className="deliveryLable">
                        Postal Code
                      </label>
                      <input
                        id="zip"
                        className="deliveryInput"
                        name="zip"
                        {...register("zip")}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="zip"
                        render={({ message }) => (
                          <p className="eMessage small mb-0">{message}</p>
                        )}
                      />
                    </MDBContainer>
                  </MDBCol>
                  <MDBCol lg="12">
                    <MDBBtn
                      className="text-dark"
                      color="light"
                      style={{ marginLeft: 20 }}
                      type="reset"
                      value="Reset"
                      onClick={onReset}
                    >
                      Reset
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </form>
      </MDBRow>
    </MDBContainer>
  );
}
export default DeliveryDetails;
