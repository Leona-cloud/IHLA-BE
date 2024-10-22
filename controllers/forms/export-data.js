const FormData = require("../../models/form");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

const exportData = async (req, res) => {
  try {
    const allData = await FormData.find();

    const workbook = xlsx.utils.book_new();

    const mathData = allData.map((item) => ({
      Question: item.math[0].question, // Use index to access question
      Answer: item.math[0].answer, // Use index to access answer
    }));
    const mathWorksheet = xlsx.utils.json_to_sheet(mathData);
    xlsx.utils.book_append_sheet(workbook, mathWorksheet, "Math");

    const scienceData = allData.map((item) => ({
      Question: item.science[0].question,
      Answer: item.science[0].answer,
    }));
    const scienceWorksheet = xlsx.utils.json_to_sheet(scienceData);
    xlsx.utils.book_append_sheet(workbook, scienceWorksheet, "Science");

    const historyData = allData.map((item) => ({
      Question: item.history[0].question,
      Answer: item.history[0].answer,
    }));
    const historyWorksheet = xlsx.utils.json_to_sheet(historyData);
    xlsx.utils.book_append_sheet(workbook, historyWorksheet, "History");

    // Write the workbook to a buffer instead of a file
    const fileBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // Set the response headers to indicate a file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=IHLA_user_report_${new Date().toISOString()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the file buffer in the response
    res.send(fileBuffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error exporting data", error: error.message });
  }
};

module.exports = exportData;
