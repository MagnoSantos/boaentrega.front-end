const validate = {
  fullName: (value: string) => {
    if (!value) return "Obrigatório";
    if (value.length > 32) return "Must be 32 characters or less.";
  },
  email: (value: string) => {
    if (!value) return "Obrigatório";
    if (
      !/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        value
      )
    )
      return "Invalid email address";
    if (!value.endsWith("@iiitd.ac.in"))
      return "Only IIIT Delhi emails allowed!";
    if (value.length > 320) return "Must be 320 characters or less";
  },
  password: (value: string) => {
    if (!value) return "Obrigatório";
    if (
      !/^(?=[^A-Z\s]*[A-Z])(?=[^a-z\s]*[a-z])(?=[^\d\s]*\d)(?=\w*[\W_])\S{12,22}$/.test(
        value
      )
    )
      return "Invalid password. Password must have between 12-22 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
  },
  confirmPassword: (value: string, password: string) => {
    if (!value) return "Obrigatorio";
    if (password !== value) return "Passwords don't match.";
  },
  required: (value: string) => {
    if (!value) return "Obrigatório";
  },
  number: (value: string) => {
    let error;
    if (!value) {
      error = "Obrigatório";
    } else if (isNaN(parseInt(value))) {
      error = "Price must be a number";
    }
    return error;
  },
};

export default validate;
