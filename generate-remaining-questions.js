const fs = require('fs');

// Read the existing JSON file
const jsonPath = './senior-engineer-interview-questions.json';
let existingData;

try {
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  existingData = JSON.parse(jsonContent);
} catch (error) {
  console.error('Error reading JSON file:', error);
  process.exit(1);
}

// All remaining questions to add (starting from current count)
const remainingQuestions = [
  // Complete remaining Node.js questions (28-39)
  {
    category: "Node.js",
    question: "Explain the Node.js event loop in detail, including all phases.",
    explanation: "The Node.js event loop is what allows Node.js to perform non-blocking I/O operations. It has six phases: Timer, Pending callbacks, Idle/Prepare, Poll, Check, and Close callbacks. Each phase has a FIFO queue of callbacks to execute.",
    usage: `\`\`\`javascript
// Event loop phases demonstration
const fs = require('fs');

console.log('Start');

// Timer phase - executed after delay
setTimeout(() => console.log('Timer 1'), 0);
setTimeout(() => console.log('Timer 2'), 0);

// Check phase - setImmediate callbacks
setImmediate(() => console.log('Immediate 1'));
setImmediate(() => console.log('Immediate 2'));

// Next tick queue - highest priority
process.nextTick(() => console.log('Next tick 1'));
process.nextTick(() => console.log('Next tick 2'));

// Microtask queue - Promise callbacks
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

// I/O operations - Poll phase
fs.readFile(__filename, () => {
  console.log('File read');
  
  setTimeout(() => console.log('Timer in I/O'), 0);
  setImmediate(() => console.log('Immediate in I/O'));
  process.nextTick(() => console.log('Next tick in I/O'));
});

console.log('End');

// Typical output order:
// Start
// End
// Next tick 1
// Next tick 2
// Promise 1
// Promise 2
// Timer 1
// Timer 2
// Immediate 1
// Immediate 2
// File read
// Next tick in I/O
// Immediate in I/O
// Timer in I/O
\`\`\``,
    realWorldExample: "In a web server handling concurrent requests, understanding the event loop helps optimize performance by properly placing CPU-intensive operations, ensuring database queries don't block other requests, and using setImmediate vs setTimeout appropriately for task scheduling.",
    frontOfCard: "Node.js: Event Loop Phases and Execution Order",
    backOfCard: "**Explanation:**\\n• Six phases: Timer, Pending callbacks, Idle/Prepare, Poll, Check, Close callbacks\\n• Each phase has FIFO queue of callbacks to execute\\n• process.nextTick and Promise callbacks have highest priority\\n\\n**Usage:**\\n\`\`\`javascript\\n// Execution order demonstration\\nsetTimeout(() => console.log('Timer'), 0);\\nsetImmediate(() => console.log('Immediate'));\\nprocess.nextTick(() => console.log('Next tick'));\\nPromise.resolve().then(() => console.log('Promise'));\\n\\n// Output: Next tick, Promise, Timer, Immediate\\n\`\`\`\\n\\n**Real World Example:**\\nWeb server optimization: understanding event loop helps place CPU-intensive operations correctly, ensure database queries don't block requests."
  },
  // Add more Node.js questions here...
];

// For now, let's add just one more question to test
const newQuestions = remainingQuestions.slice(0, 1);

// Add new questions to existing data
let currentId = existingData.questions.length + 1;
newQuestions.forEach(q => {
  existingData.questions.push({
    id: currentId++,
    category: q.category,
    question: q.question,
    explanation: q.explanation,
    usage: q.usage,
    realWorldExample: q.realWorldExample,
    frontOfCard: q.frontOfCard,
    backOfCard: q.backOfCard
  });
});

// Write back to file
try {
  fs.writeFileSync(jsonPath, JSON.stringify(existingData, null, 2));
  console.log(`Successfully added ${newQuestions.length} questions. Total: ${existingData.questions.length}`);
} catch (error) {
  console.error('Error writing JSON file:', error);
}