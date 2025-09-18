// Test Gemini API directly
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testDirect() {
  console.log('Testing Gemini API directly...');
  
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');
  
  if (!apiKey) {
    console.log('No API key found');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names
    const modelNames = ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'];
    
    for (const modelName of modelNames) {
      console.log(`\nTrying model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        console.log('Sending test prompt...');
        
        const result = await model.generateContent('What is 2+2? Give a short answer.');
        const response = await result.response;
        const text = response.text();
        
        console.log(`SUCCESS with ${modelName}! Gemini response:`, text);
        break;
        
      } catch (modelError) {
        console.log(`Failed with ${modelName}:`, modelError.message);
      }
    }
    
  } catch (error) {
    console.log('GENERAL ERROR occurred:');
    console.log('Message:', error.message);
    console.log('Status:', error.status);
    console.log('Code:', error.code);
    console.log('Details:', error.details);
  }
}

testDirect();
