import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize OpenAI with custom base URL
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL, // Optional, only if you're using LemonFox or similar
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({ uploadDir: "./", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed." });

    const audioFile = files.audio as formidable.File;
    if (!audioFile || !audioFile.filepath) {
      return res.status(400).json({ error: "No audio file uploaded." });
    }

    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioFile.filepath),
        model: "whisper-1",
      });

      return res.status(200).json({ text: transcription.text });
    } catch (error: any) {
      console.error("Transcription error:", error);
      return res.status(500).json({ error: "Transcription failed." });
    }
  });
}
