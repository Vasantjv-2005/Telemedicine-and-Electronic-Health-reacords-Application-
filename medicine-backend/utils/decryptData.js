const CryptoJS =
  require("crypto-js");

const decryptData = (
  encryptedData
) => {
  const bytes =
    CryptoJS.AES.decrypt(
      encryptedData,
      process.env.JWT_SECRET
    );

  return JSON.parse(
    bytes.toString(
      CryptoJS.enc.Utf8
    )
  );
};

module.exports =
  decryptData;