const CryptoJS =
  require("crypto-js");

const encryptData = (
  data
) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.JWT_SECRET
  ).toString();
};

module.exports =
  encryptData;