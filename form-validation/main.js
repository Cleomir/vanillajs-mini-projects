const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  validateForm();
});

const validateForm = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (!usernameValue) {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (!emailValue) {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please enter a valid email address");
  } else {
    setSuccess(email);
  }

  if (!passwordValue) {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must have at least 8 characters");
  } else {
    setSuccess(password);
  }

  if (!confirmPasswordValue) {
    setError(confirmPassword, "Password is required");
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Passwords don't match");
  } else {
    setSuccess(confirmPassword);
  }
};

const setError = (element, message) => {
  const elementParent = element.parentElement;
  const errorElement = elementParent.querySelector(".error");

  errorElement.innerText = message;
  elementParent.classList.add("error");
  elementParent.classList.remove("success");
};

const setSuccess = (element) => {
  const elementParent = element.parentElement;
  const errorElement = elementParent.querySelector(".error");

  errorElement.innerText = "";
  elementParent.classList.add("success");
  elementParent.classList.remove("error");
};

const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};
