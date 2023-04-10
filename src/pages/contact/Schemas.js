import * as Yup from "yup";

export const contactSchema = Yup.object({

  name: Yup.string().min(3).max(25).required("Please enter your name"),
  message: Yup.string().min(10).max(650).required("Please write a message"),
  email: Yup.string().email().required("Please enter your email"),

});