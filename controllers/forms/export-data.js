const FormData = require("../../models/form");
const xlsx = require("xlsx");
const path = require("path");

const exportData = async (req, res) => {
  try {
    // const { month, year } = req.query;

    // const startDate = new Date(`${year}-${month}-01`);
    // const endDate = new Date(`${year}-${parseInt(month) + 1}-01`);

    // // Find all records within the given month
    // const allData = await FormData.find({
    //   createdAt: {
    //     $gte: startDate,
    //     $lt: endDate,
    //   },
    // });

    const allData = await FormData.find();

    const workbook = xlsx.utils.book_new();

    const mathData = allData.map((item) => ({
      Question:
        item.math.length > 0 ? item.math[0].question : "No question available",
      Answer: item.math.length > 0 ? item.math[0].answer : "N/A",
    }));
    const mathWorksheet = xlsx.utils.json_to_sheet(mathData);
    xlsx.utils.book_append_sheet(workbook, mathWorksheet, "Math");

    // Science Data
    const scienceData = allData.map((item) => ({
      Question:
        item.science.length > 0
          ? item.science[0].question
          : "No question available",
      Answer: item.science.length > 0 ? item.science[0].answer : "N/A",
    }));
    const scienceWorksheet = xlsx.utils.json_to_sheet(scienceData);
    xlsx.utils.book_append_sheet(workbook, scienceWorksheet, "Science");

    const historyData = allData.map((item) => ({
      Question:
        item.history.length > 0
          ? item.history[0].question
          : "No question available",
      Answer: item.history.length > 0 ? item.history[0].answer : "N/A",
    }));

    const historyWorksheet = xlsx.utils.json_to_sheet(historyData);
    xlsx.utils.book_append_sheet(workbook, historyWorksheet, "History");

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    const fileName = `IHLA_user_report_${timestamp}.xlsx`;

    const filePath = path.join(__dirname, fileName);

    const fileBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.send(fileBuffer);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error exporting data:", error);
    res
      .status(500)
      .json({ message: "Error exporting data", error: error.message });
  }
};

module.exports = exportData;
