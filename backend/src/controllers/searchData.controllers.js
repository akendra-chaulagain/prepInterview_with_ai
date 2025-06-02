import { MockInterview } from "../models/mockInterview.model.js";

// search mock interview
const searchMockInterview = async (req, res) => {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ message: "term is required" });
  }

  try {
    const results = await MockInterview.find(
      { $text: { $search: term } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error while searching" });
  }
};

export { searchMockInterview };
