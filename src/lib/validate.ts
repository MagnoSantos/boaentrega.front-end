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
    if (value.length > 320) return "Must be 320 characters or less";
  },
  password: (value: string) => {
    if (!value) return "Obrigatório";
    if (
      !/^(?=[^A-Z\s]*[A-Z])(?=[^a-z\s]*[a-z])(?=[^\d\s]*\d)(?=\w*[\W_])\S{4,22}$/.test(
        value
      )
    )
      return "Senha inválida. A senha deve conter 12 a 22 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.";
  },
  confirmPassword: (value: string, password: string) => {
    if (!value) return "Obrigatorio";
    if (password !== value) return "Senhas não conferem.";
  },
  required: (value: string) => {
    if (!value) return "Obrigatório";
  },
  number: (value: string) => {
    let error;
    if (!value) {
      error = "Obrigatório";
    } else if (isNaN(parseInt(value))) {
      error = "Preço precisa ser um número!";
    }
    return error;
  },
};

export default validate;
