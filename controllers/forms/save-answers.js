const FormData = require("../../models/form");

const saveAnswers = async (req, res) => {
  const { math, science, history } = req.body;

  try {
    const newData = new FormData({
      math,
      science,
      history,
    });

    await newData.save();

    return res.status(201).json({
      success: true,
      message: "Answers saved successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error saving data",
    });
  }
};

module.exports = saveAnswers;
