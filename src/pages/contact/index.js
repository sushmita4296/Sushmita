import React, { useRef, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { contactConfig, meta } from "../../content_option";
import "./style.css";

import emailjs from '@emailjs/browser';
import { useFormik } from "formik";

import { contactSchema } from "./Schemas";

const ContactUs = () => {


  const form = useRef();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const [notification, setNotification] = useState(false)

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: contactSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values, action) => {
        setNotification(true)

        action.resetForm();

        emailjs.sendForm('service_tx8z6nj', 'template_t1r1pye', form.current, 'SVktvcRATofOO0Uwq')
          .then((result) => {

          }, (error) => {
            console.log(error.text);
          });
      },
    });


  const [verfied, setVerifed] = useState(false);

  //recaptcha function
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />

          <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        </Helmet>
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <h3>{notification}</h3>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email : </strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Phone : </strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="align-items-center">

            {
              notification ? <div class="alert alert-success mt-3" role="alert">
                Thank you for your message. It has been sent.
              </div> : ""
            }

            <form ref={form} onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">


                  <input
                    type="name"
                    autoComplete="off"
                    name="name"
                    id="name"
                    className="form-control rounded-0"
                    placeholder="eg. Jhon Smit"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name ? (
                    <p className="form-error">{errors.name}</p>
                  ) : null}
                </Col>
                <Col lg="6" className="form-group">

                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    className="form-control rounded-0"
                    placeholder="eg. email@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </Col>

                <Col lg="12" className="form-group">

                  <textarea
                    type="text"
                    autoComplete="off"
                    name="message"
                    id="message"
                    className="form-control rounded-0"
                    placeholder="What can we help with?"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.message && touched.message ? (
                    <p className="form-error">{errors.message}</p>
                  ) : null}

                </Col>

              </Row>


              <br />
              <Row>

                <Row>
                  <ReCAPTCHA
                    sitekey='6Lce2BAjAAAAAGQcUI6OrDTbofKzYVzkVcYK-6My'
                    onChange={onChange}
                  />
                </Row>
                <Col lg="12" className="form-group">

                  <button
                    type="submit"
                    className="btn ac_btn mt-4"
                    disabled={!verfied}
                  >
                    Send Message
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>

    </HelmetProvider>
  );
};

export default ContactUs;