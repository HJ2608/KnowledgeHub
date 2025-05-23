const axios = require('axios');

async function summarizeWithLLM(content, provider = 'openai') {
  if (provider !== 'openai') {
    throw new Error('Only OpenAI is supported in this implementation');
  }

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Summarize this:\n\n${content}` }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return `[Mock Summary] ${content.slice(0, 100)}...`
}

module.exports = { summarizeWithLLM };
