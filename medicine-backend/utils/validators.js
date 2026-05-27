const validateEmail = (
  email
) => {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

const validatePassword = (
  password
) => {
  return password.length >= 6;
};

module.exports = {
  validateEmail,
  validatePassword,
};