const fs = require('fs');

// Read existing file
const existing = JSON.parse(fs.readFileSync('senior-engineer-interview-questions.json', 'utf8'));

// Get current highest ID
let currentId = Math.max(...existing.questions.map(q => q.id)) + 1;

// Remaining Node.js questions (31-39)
const remainingNodejs = [
  {
    id: currentId++,
    category: "Node.js",
    question: "What is the difference between setImmediate(), setTimeout(), and process.nextTick()?",
    explanation: "These are different ways to schedule callbacks in Node.js with different priorities. process.nextTick() has the highest priority, followed by Promise callbacks, then setImmediate() and setTimeout() which depend on the event loop phase.",
    usage: "```javascript\nconsole.log('Start');\n\nprocess.nextTick(() => console.log('1: process.nextTick'));\nsetImmediate(() => console.log('2: setImmediate'));\nsetTimeout(() => console.log('3: setTimeout'), 0);\n\nPromise.resolve().then(() => console.log('4: Promise'));\n\nconsole.log('End');\n\n// Output: Start, End, 1: process.nextTick, 4: Promise, 3: setTimeout, 2: setImmediate\n```",
    realWorldExample: "In API middleware, use process.nextTick() for immediate callback execution, setImmediate() for I/O callbacks, and setTimeout() for delayed operations like cache cleanup or retry mechanisms.",
    frontOfCard: "Node.js: setImmediate vs setTimeout vs process.nextTick",
    backOfCard: "**Explanation:**\n• process.nextTick(): highest priority, executes before event loop continues\n• setImmediate(): executes in Check phase of event loop\n• setTimeout(): executes in Timer phase with minimum delay\n\n**Usage:**\n```javascript\nprocess.nextTick(() => console.log('nextTick'));\nsetImmediate(() => console.log('immediate'));\nsetTimeout(() => console.log('timeout'), 0);\n// Output: nextTick, timeout, immediate\n```\n\n**Real World Example:**\nAPI middleware: process.nextTick for immediate callbacks, setImmediate for I/O, setTimeout for delayed operations like cache cleanup."
  },
  {
    id: currentId++,
    category: "Node.js",
    question: "How would you scale a Node.js application horizontally and vertically?",
    explanation: "Vertical scaling means adding more power to existing machines (CPU, RAM), while horizontal scaling means adding more machines. Node.js apps scale horizontally through clustering, load balancers, and microservices architecture.",
    usage: "```javascript\n// Cluster module for vertical scaling\nconst cluster = require('cluster');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isMaster) {\n  console.log(`Master ${process.pid} is running`);\n  \n  // Fork workers\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n  \n  cluster.on('exit', (worker) => {\n    console.log(`Worker ${worker.process.pid} died`);\n    cluster.fork(); // Restart worker\n  });\n} else {\n  // Workers share server port\n  require('./app.js');\n  console.log(`Worker ${process.pid} started`);\n}\n\n// PM2 ecosystem file for production scaling\n// ecosystem.config.js\nmodule.exports = {\n  apps: [{\n    name: 'api-server',\n    script: 'app.js',\n    instances: 'max', // Use all CPU cores\n    exec_mode: 'cluster',\n    env: {\n      NODE_ENV: 'production',\n      PORT: 3000\n    }\n  }]\n};\n```",
    realWorldExample: "Netflix scales Node.js horizontally across thousands of servers using load balancers and microservices. Each service handles specific functionality (user auth, recommendations, streaming) and can be scaled independently based on demand.",
    frontOfCard: "Node.js: Horizontal and Vertical Scaling Strategies",
    backOfCard: "**Explanation:**\n• Vertical scaling: add more power (CPU, RAM) to existing machines\n• Horizontal scaling: add more machines/instances\n• Use clustering, load balancers, and microservices for horizontal scaling\n\n**Usage:**\n```javascript\n// Cluster module for multi-core usage\nconst cluster = require('cluster');\nif (cluster.isMaster) {\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n} else {\n  require('./app.js');\n}\n\n// PM2 for production\n// instances: 'max' uses all CPU cores\n```\n\n**Real World Example:**\nNetflix: scales horizontally across thousands of servers with microservices, each service handles specific functionality and scales independently."
  }
];

// Start React questions (40-54)
const reactQuestions = [
  {
    id: currentId++,
    category: "React",
    question: "Explain the Virtual DOM and how React's reconciliation algorithm works.",
    explanation: "The Virtual DOM is a JavaScript representation of the actual DOM kept in memory. React's reconciliation algorithm compares the new Virtual DOM tree with the previous one (diffing) and updates only the changed parts of the real DOM, making updates efficient.",
    usage: "```javascript\n// Virtual DOM concept demonstration\nfunction App() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n\n// What happens during reconciliation:\n// 1. State change triggers re-render\n// 2. New Virtual DOM tree is created\n// 3. React compares (diffs) new tree with previous tree\n// 4. Only changed elements are updated in real DOM\n\n// React.createElement (what JSX compiles to)\nconst element = React.createElement(\n  'div',\n  null,\n  React.createElement('h1', null, `Count: ${count}`),\n  React.createElement('button', { onClick: handleClick }, 'Increment')\n);\n\n// Keys help React identify which items have changed\nfunction TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>{todo.text}</li> // Key helps reconciliation\n      ))}\n    </ul>\n  );\n}\n```",
    realWorldExample: "In a social media feed with hundreds of posts, when a user likes one post, React's Virtual DOM ensures only that specific like button updates in the real DOM, rather than re-rendering the entire feed, keeping the app fast and responsive.",
    frontOfCard: "React: Virtual DOM and Reconciliation Algorithm",
    backOfCard: "**Explanation:**\n• Virtual DOM: JavaScript representation of actual DOM kept in memory\n• Reconciliation: algorithm that compares new and previous Virtual DOM trees\n• Updates only changed parts of real DOM for efficiency\n\n**Usage:**\n```javascript\n// React compares virtual DOM trees\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h1>Count: {count}</h1> {/* Only this updates */}\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}\n\n// Keys help reconciliation\n{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}\n```\n\n**Real World Example:**\nSocial media feed: when user likes one post, only that like button updates in real DOM, not entire feed, keeping app fast and responsive."
  },
  {
    id: currentId++,
    category: "React", 
    question: "What are React hooks and how do they solve problems that class components had?",
    explanation: "Hooks are functions that let you use state and other React features in functional components. They solve problems like complex lifecycle methods, logic reuse difficulties, and wrapper hell from higher-order components.",
    usage: "```javascript\n// Class component problems\nclass UserProfile extends Component {\n  constructor(props) {\n    super(props);\n    this.state = { user: null, posts: [], loading: true };\n  }\n  \n  componentDidMount() {\n    this.fetchUser();\n    this.fetchPosts();\n  }\n  \n  componentDidUpdate(prevProps) {\n    if (prevProps.userId !== this.props.userId) {\n      this.fetchUser();\n      this.fetchPosts();\n    }\n  }\n  \n  fetchUser = async () => {\n    // Fetch user logic\n  };\n  \n  render() {\n    // Complex render logic\n  }\n}\n\n// Hooks solution - cleaner and more reusable\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [posts, setPosts] = useState([]);\n  const [loading, setLoading] = useState(true);\n  \n  // Custom hook for user data\n  const { user, loading: userLoading } = useUser(userId);\n  const { posts, loading: postsLoading } = usePosts(userId);\n  \n  // Single effect replaces multiple lifecycle methods\n  useEffect(() => {\n    fetchUserData(userId);\n  }, [userId]); // Dependency array prevents unnecessary calls\n  \n  if (userLoading || postsLoading) return <Loading />;\n  \n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <PostsList posts={posts} />\n    </div>\n  );\n}\n\n// Custom hooks enable logic reuse\nfunction useUser(userId) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    fetchUser(userId).then(user => {\n      setUser(user);\n      setLoading(false);\n    });\n  }, [userId]);\n  \n  return { user, loading };\n}\n\n// useCallback and useMemo for performance\nfunction ExpensiveComponent({ items, filter }) {\n  // Memoize expensive calculations\n  const expensiveValue = useMemo(() => {\n    return items.filter(filter).reduce((sum, item) => sum + item.value, 0);\n  }, [items, filter]);\n  \n  // Memoize event handlers\n  const handleClick = useCallback((id) => {\n    onItemClick(id);\n  }, [onItemClick]);\n  \n  return <div>{expensiveValue}</div>;\n}\n```",
    realWorldExample: "In an e-commerce dashboard, hooks allow sharing cart logic between different components (header cart count, cart page, checkout), replacing complex class inheritance with simple custom hooks like useCart() that any component can use.",
    frontOfCard: "React: Hooks and Class Component Problem Solutions",
    backOfCard: "**Explanation:**\n• Functions that let you use state and React features in functional components\n• Solve: complex lifecycle methods, logic reuse difficulties, wrapper hell\n• Enable custom hooks for sharing stateful logic between components\n\n**Usage:**\n```javascript\n// Replace class lifecycle with hooks\nfunction Component({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]); // Replaces componentDidMount/Update\n  \n  return <div>{user?.name}</div>;\n}\n\n// Custom hooks for logic reuse\nfunction useUser(userId) {\n  const [user, setUser] = useState(null);\n  // Reusable user fetching logic\n  return user;\n}\n```\n\n**Real World Example:**\nE-commerce dashboard: share cart logic between components (header count, cart page, checkout) with custom useCart() hook instead of complex class inheritance."
  }
];

// Add all new questions
existing.questions.push(...remainingNodejs, ...reactQuestions);

// Write back to file
fs.writeFileSync('senior-engineer-interview-questions.json', JSON.stringify(existing, null, 2));
console.log(`Added ${remainingNodejs.length} Node.js + ${reactQuestions.length} React questions. Total: ${existing.questions.length}`);