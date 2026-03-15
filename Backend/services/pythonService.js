const axios = require("axios");

const askAI = async (message) => {

  const response = await axios.post(
    "http://localhost:8000/chat",
    { message }
  );

  return response.data.reply;
};

module.exports = { askAI };