const fs = require('fs');

// Read existing file
const existing = JSON.parse(fs.readFileSync('senior-engineer-interview-questions.json', 'utf8'));

// Add more Node.js questions
const additionalNodejsQuestions = [
  {
    id: 29,
    category: "Node.js",
    question: "What are streams in Node.js and when would you use them over regular file operations?",
    explanation: "Streams are objects that let you read data from a source or write data to a destination in continuous fashion. They process data piece by piece without loading everything into memory, making them ideal for large files or real-time data processing.",
    usage: "```javascript\nconst fs = require('fs');\nconst { Transform } = require('stream');\n\n// Memory-efficient large file processing\nconst readStream = fs.createReadStream('large-file.txt', {\n  encoding: 'utf8',\n  highWaterMark: 16 * 1024\n});\n\nreadStream.on('data', (chunk) => {\n  console.log(`Processing ${chunk.length} bytes`);\n});\n\n// Transform streams\nconst upperCaseTransform = new Transform({\n  transform(chunk, encoding, callback) {\n    callback(null, chunk.toString().toUpperCase());\n  }\n});\n\n// Pipeline\nfs.createReadStream('input.txt')\n  .pipe(upperCaseTransform)\n  .pipe(fs.createWriteStream('output.txt'));\n```",
    realWorldExample: "In a video streaming service, streams allow processing and serving large video files without loading them entirely into memory. Users can start watching while the file is still being processed.",
    frontOfCard: "Node.js: Streams vs Regular File Operations",
    backOfCard: "**Explanation:**\n• Objects for reading/writing data in continuous fashion\n• Process data piece by piece without loading everything into memory\n• Ideal for large files or real-time data processing\n\n**Usage:**\n```javascript\n// Memory-efficient processing\nconst readStream = fs.createReadStream('large-file.txt');\nreadStream.on('data', processChunk);\n\n// Pipeline transformation\nfs.createReadStream('input.txt')\n  .pipe(transformStream)\n  .pipe(fs.createWriteStream('output.txt'));\n```\n\n**Real World Example:**\nVideo streaming: process/serve large video files without loading into memory, users can watch while processing continues."
  },
  {
    id: 30,
    category: "Node.js", 
    question: "How do you handle errors in Node.js applications, particularly for async operations?",
    explanation: "Error handling in Node.js involves try-catch for synchronous code, error-first callbacks for traditional async operations, .catch() for Promises, and try-catch with async/await. Proper error handling prevents crashes and provides meaningful feedback.",
    usage: "```javascript\n// Async/await error handling\nasync function readFile() {\n  try {\n    const data = await fs.promises.readFile('file.txt');\n    return data;\n  } catch (error) {\n    console.error('File read error:', error.message);\n    throw error;\n  }\n}\n\n// Global error handlers\nprocess.on('uncaughtException', (error) => {\n  console.error('Uncaught Exception:', error);\n  process.exit(1);\n});\n\nprocess.on('unhandledRejection', (reason) => {\n  console.error('Unhandled Rejection:', reason);\n});\n\n// Express error middleware\napp.use((err, req, res, next) => {\n  const status = err.statusCode || 500;\n  res.status(status).json({ error: err.message });\n});\n```",
    realWorldExample: "In an e-commerce API, proper error handling ensures payment failures return meaningful messages, database connection issues are logged for debugging, and the application continues running despite individual request failures.",
    frontOfCard: "Node.js: Error Handling for Async Operations",
    backOfCard: "**Explanation:**\n• Use try-catch for sync code, error-first callbacks for traditional async\n• .catch() for Promises, try-catch with async/await\n• Global handlers for uncaught exceptions and unhandled rejections\n\n**Usage:**\n```javascript\n// Async/await\ntry {\n  const data = await fs.readFile('file.txt');\n} catch (error) {\n  console.error(error.message);\n}\n\n// Global handlers\nprocess.on('uncaughtException', handleError);\n\n// Express middleware\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});\n```\n\n**Real World Example:**\nE-commerce API: payment failures return meaningful messages, database issues logged, app continues despite individual failures."
  }
];

// Add questions to existing array  
existing.questions.push(...additionalNodejsQuestions);

// Write back to file
fs.writeFileSync('senior-engineer-interview-questions.json', JSON.stringify(existing, null, 2));
console.log(`Added ${additionalNodejsQuestions.length} more Node.js questions. Total: ${existing.questions.length}`);