export default function handler(req, res) {
    const aiModels = [
      {
        id: 1,
        name: "Vision AI",
        description: "Advanced image recognition and object detection model.",
        image: "/ai/vision-ai.jpg",
      },
      {
        id: 2,
        name: "ChatBot AI",
        description: "AI-powered chatbot with natural language processing.",
        image: "/ai/chatbot-ai.jpg",
      },
      {
        id: 3,
        name: "Speech AI",
        description: "Real-time speech recognition and voice analysis.",
        image: "/ai/speech-ai.jpg",
      },
      {
        id: 4,
        name: "Recommendation AI",
        description: "Personalized recommendation engine for e-commerce.",
        image: "/ai/recommendation-ai.jpg",
      },
    ];
  
    res.status(200).json(aiModels);
  }
  