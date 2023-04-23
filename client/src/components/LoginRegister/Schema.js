import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First name required!"),
  lastName: yup.string().required("Last name required!"),
  email: yup
    .string()
    .required("Email required!")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email"),
  password: yup
    .string()
    .required("Password Required!")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      "Weak Password"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!")
});

export default schema;
