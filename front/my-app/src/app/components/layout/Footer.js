import React from "react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Footer.css";

const Footer = () => {
  const form = useRef();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs //allows you to send a feedback form and sends a confirmation email to the sender
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setUserName("");
    setEmail("");
    setMessage("");
  };
  return (
    <MDBFooter
      style={{ backgroundColor: "#000000" }}
      className="text-center text-lg-start text-white"
    >
      <section className="d-flex justify-content-center p-4 border-bottom">
        <div>
          <a
            href="https://github.com/areski123"
            target="blank"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="github" size="2x" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol
              md="6"
              lg="4"
              xl="3"
              className="mx-auto mb-4"
              style={{ textAlign: "center" }}
            >
              <div>
                <img
                src={require("../../assets/Asset 3.png")}
                alt="fantazee"
                  width={100}
                  height={70}
                ></img>
              </div>
              <p>
                 created by 203J07 adib areski(back) & 209J34 yassin lawni(front)
              </p>
            </MDBCol>

            <MDBCol md="6" lg="5" xl="5" className="mx-auto mb-4">
              <div className="contact-container">
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                  <div className="contact-name">
                    <label className="contact-label" htmlFor="name_input">
                      Name
                    </label>
                    <input
                      name="user_name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="name-input"
                      id="name_input"
                      required
                    />
                  </div>
                  <div className="contact-email">
                    <label className="contact-label" htmlFor="email_input">
                      Email
                    </label>
                    <input
                      name="user_email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="email-input"
                      id="email_input"
                      required
                    />
                  </div>
                  <div className="contact-message">
                    <label className="contact-label" htmlFor="message_input">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="message-input"
                      id="message_input"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="contact-submit">
                    <button type="submit" className="contact-button">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
};

export default Footer;
