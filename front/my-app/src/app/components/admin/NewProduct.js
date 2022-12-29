import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  addNewProductAsync,
  getProductImagesAsync,
  selectProductImages,
} from "../../Slices/productSlice";
import { selectToken } from "../../Slices/userSlice";
import {
  BRANDS,
  GENDER_CATEGORIES,
  SIZES,
  TYPES,
} from "../../data/shoesData.js";
import "./NewProduct.css";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

const NewProduct = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const images = useSelector(selectProductImages);

  const defaultValues = {
    name: "",
    image: null,
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    brand: "",
    size: "",
    type: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addNewProductAsync({ data: data, token: token }));
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {
    console.log(images);
    dispatch(getProductImagesAsync(token));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Product Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: "Image is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={images}
                      optionLabel="title"
                    />
                  )}
                />
                <label
                  htmlFor="image"
                  className={classNames({ "p-error": errors.image })}
                >
                  Product Image*
                </label>
              </span>
              {getFormErrorMessage("type")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Description is required.",
                  }}
                  render={({ field, fieldState }) => (
                    <InputTextarea
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="description"
                  className={classNames({ "p-error": !!errors.description })}
                >
                  Description*
                </label>
              </span>
              {getFormErrorMessage("description")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: "Quantity is required.",
                    min: 1,
                  }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      {...field}
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="quantity"
                  className={classNames({ "p-error": errors.quantity })}
                >
                  Quantity*
                </label>
              </span>
              {getFormErrorMessage("quantity")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Price is required.",
                    min: 1,
                  }}
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      {...field}
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="price"
                  className={classNames({ "p-error": errors.price })}
                >
                  Price*
                </label>
              </span>
              {getFormErrorMessage("price")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: "Brand is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={BRANDS}
                      optionLabel="name"
                    />
                  )}
                />
                <label
                  htmlFor="brand"
                  className={classNames({ "p-error": errors.brand })}
                >
                  Brand
                </label>
              </span>
              {getFormErrorMessage("brand")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="size"
                  control={control}
                  rules={{ required: "Size is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={SIZES}
                      optionLabel="size"
                    />
                  )}
                />
                <label
                  htmlFor="size"
                  className={classNames({ "p-error": errors.size })}
                >
                  Size*
                </label>
              </span>
              {getFormErrorMessage("size")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={GENDER_CATEGORIES}
                      optionLabel="category"
                    />
                  )}
                />
                <label
                  htmlFor="category"
                  className={classNames({ "p-error": errors.category })}
                >
                  Category*
                </label>
              </span>
              {getFormErrorMessage("category")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required." }}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={TYPES}
                      optionLabel="type"
                    />
                  )}
                />
                <label
                  htmlFor="type"
                  className={classNames({ "p-error": errors.type })}
                >
                  Type*
                </label>
              </span>
              {getFormErrorMessage("type")}
            </div>
            <Button type="submit" label="Add" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewProduct;
