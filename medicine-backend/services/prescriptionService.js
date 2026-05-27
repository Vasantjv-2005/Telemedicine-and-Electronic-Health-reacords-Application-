const PDFDocument =
  require("pdfkit");

const fs = require("fs");

const generatePrescriptionPDF =
  async (
    prescriptionData,
    filePath
  ) => {
    return new Promise(
      (resolve, reject) => {
        try {
          const doc =
            new PDFDocument();

          const stream =
            fs.createWriteStream(
              filePath
            );

          doc.pipe(stream);

          doc
            .fontSize(20)
            .text(
              "Prescription",
              {
                align:
                  "center",
              }
            );

          doc.moveDown();

          doc.text(
            `Patient: ${prescriptionData.patient}`
          );

          doc.text(
            `Doctor: ${prescriptionData.doctor}`
          );

          doc.text(
            `Notes: ${prescriptionData.notes}`
          );

          doc.moveDown();

          doc.text(
            "Medicines:"
          );

          prescriptionData.medicines.forEach(
            (
              medicine,
              index
            ) => {
              doc.text(
                `${index + 1}. ${
                  medicine.name
                } - ${
                  medicine.dosage
                }`
              );
            }
          );

          doc.end();

          stream.on(
            "finish",
            () => {
              resolve(
                filePath
              );
            }
          );
        } catch (error) {
          reject(error);
        }
      }
    );
  };

module.exports =
  generatePrescriptionPDF;