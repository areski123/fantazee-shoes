import React from "react";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectToken } from "../../Slices/userSlice";
import { MDBBtn, MDBInput, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
const ProductImage = () => {
  const inputRef = useRef(null);
  const token = useSelector(selectToken);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleImage = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(image);

    const form_data = new FormData();
    form_data.append("image", image, image.name);
    form_data.append("title", title);

    axios
      .post("http://127.0.0.1:8000/posts/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setTitle("");
    setImage(null);
    inputRef.current.value = null;
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <form onSubmit={submitForm}>
          <input
            ref={inputRef}
            type="file"
            style={{ marginBottom: "10px" }}
            label="Product Image"
            size="lg"
            accept="image/png,image/jpeg"
            onChange={handleImage}
            id="formFileLg"
            required
          />
          <MDBInput
            style={{ marginBottom: "10px" }}
            label="Title"
            id="formControlLg"
            type="text"
            size="lg"
            required
            value={title}
            onChange={handleTitle}
            minLength={1}
          />
          <MDBBtn type="submit">Upload</MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductImage;
