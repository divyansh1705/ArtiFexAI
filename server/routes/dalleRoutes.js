import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    // Perspective API content moderation check
    const analyzeRequest = {
      comment: { text: prompt },
      languages: ['en'],
      requestedAttributes: {
        PROFANITY: {},
        SEXUALLY_EXPLICIT: {}
      }
    };

    const { data } = await axios.post(process.env.PERSPECTIVE_API_URL, analyzeRequest, {
      params: { key: process.env.PERSPECTIVE_API_KEY }
    });

    const profanityScore = data.attributeScores.PROFANITY.summaryScore.value;
    const sexuallyExplicitScore = data.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value;

    if (profanityScore > 0.5 || sexuallyExplicitScore > 0.4) {
      return res.status(400).json({ success: false, message: 'Inappropriate content detected. Enter something else.' });
    }

    // Call RapidAPI Image Generator API
    const response = await fetch('https://imageai-generator.p.rapidapi.com/image', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'imageai-generator.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        negative_prompt: 'white',
        prompt: prompt,
        width: 512,
        height: 512,
        hr_scale: 2,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate image');
    }

    const result = await response.json();
    res.status(200).json({ success: true, photo: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
  }
});

export default router;
