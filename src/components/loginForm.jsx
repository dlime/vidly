import Form from "../common/form";
import Joi from "@hapi/joi";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  formTitle = "Login";
  forms = ["username", "password"];
}

export default LoginForm;
