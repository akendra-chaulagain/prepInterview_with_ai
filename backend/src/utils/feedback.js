 import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  "Content-Type": "application/json",
};
  

// give feedback of the answer
 export const generateFeedback = async (question, answer) => {
  try {
    // const prompt = `Please evaluate the following answer to the interview question: "${question}". 
    //   User's answer: "${answer}". 
    //   Provide constructive feedback and a score out of 10.`;
    const prompt = `Evaluate the following answer to the interview question strictly based on technical clarity, depth, and relevance. 

    Interview question: "${question}"
    User's answer: "${answer}"
    
    Provide only constructive feedback (no pleasantries or summary) and a score out of 10. Do not repeat the question or the answer. Do not include any opening or closing lines.`;

    const response = await axios.post(
      process.env.GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
      },
      {
        headers,
      }
    );

    const feedback = response.data.choices[0].message.content.trim();
    const scoreMatch = feedback.match(/(\d{1,3})/);
    const score = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;
    return { feedback, score };
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
};
