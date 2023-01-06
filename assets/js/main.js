class ValidaForm {
  constructor() {
    this.form = document.querySelector(".formulario");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.isValid();
    const senhasValidas = this.validatePassword();

    if (camposValidos && senhasValidas) {
      alert("Formulário enviado.");
      this.form.submit();
    }
  }

  isValid() {
    let valid = true;

    this.removeError();

    for (let formInput of this.form.querySelectorAll(".validate")) {
      const label = formInput.previousElementSibling.innerText;

      if (!formInput.value) {
        this.createError(formInput, `Campo "${label}" não pode estar vazio.`);
        valid = false;
      }

      if (formInput.classList.contains("cpf")) {
        if (!this.validateCPF(formInput)) valid = false;
      }

      if (formInput.classList.contains("user")) {
        if (!this.validateUser(formInput)) valid = false;
      }
    }
    return valid;
  }

  validateUser(formInput) {
    const user = formInput.value;
    let valid = true;

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(formInput, "O usuário só pode conter letras e números.");
      valid = false;
    }
    if (user.length < 6 || user.length > 12) {
      this.createError(formInput, "Usuário deve ter entre 6 e 12 caracteres.");
      valid = false;
    }
    return valid;
  }

  validatePassword() {
    let valid = true;

    const password = this.form.querySelector(".senha");
    const passwordConfirm = this.form.querySelector(".repete-senha");

    if (password.value !== passwordConfirm.value) {
      valid = false;
      this.createError(password, "As senhas precisam ser iguais.");
      this.createError(passwordConfirm, "As senhas precisam ser iguais.");
    }

    if (password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.createError(password, "Senha precisa ter entre 6 e 12 caracteres.");
    }

    return valid;
  }

  validateCPF(formInput) {
    const cpf = new ValidaCPF(formInput.value);
    if (!cpf.valida()) {
      this.createError(formInput, "CPF inválido.");
      return false;
    }
    return true;
  }

  createError(formInput, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("msg-error");
    formInput.insertAdjacentElement("afterend", div);
  }

  removeError() {
    for (let msgError of this.form.querySelectorAll(".msg-error")) {
      msgError.remove();
    }
  }
}

const valida = new ValidaForm();
