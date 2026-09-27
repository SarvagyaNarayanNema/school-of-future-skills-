export const LAB_CATEGORIES = [
  "All",
  "Programming Lab",
  "Web Development Lab",
  "AI/ML Lab",
  "Cybersecurity Lab",
  "IoT Lab",
  "Cloud Lab"
];

export const initialLabs = [
  {
    id: "lab-prog",
    name: "Algorithmic Runtime & Memory Profiler",
    category: "Programming Lab",
    technology: "JavaScript / Python Logic",
    difficulty: "Intermediate",
    exercisesCount: 5,
    description: "Benchmark time complexity of recursive vs iterative approaches in a controlled JavaScript sandbox execution environment.",
    problemStatement: "Implement a memoized Fibonacci calculation function `fib(n)` that computes values up to n=50 in sub-millisecond time without exceeding call stack limits.",
    instructions: [
      "1. Check if the input is cached in the memo object.",
      "2. Base cases: return n if n <= 1.",
      "3. Recursively compute and store the result in memo[n].",
      "4. Click 'Run Code' to execute across benchmark test cases."
    ],
    starterCode: `// Memoized Fibonacci Implementation
function solve(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
  return memo[n];
}

console.log("fib(10) =", solve(10));
console.log("fib(30) =", solve(30));
console.log("fib(45) =", solve(45));
`,
    expectedOutput: `fib(10) = 55
fib(30) = 832040
fib(45) = 1134903170
[PASS] Benchmark completed in 1.42ms. Zero stack overflows detected.`
  },
  {
    id: "lab-web",
    name: "Reactive State Machine & DOM Event Binding",
    category: "Web Development Lab",
    technology: "React / DOM / CSS",
    difficulty: "Beginner",
    exercisesCount: 4,
    description: "Practice reactive state dispatching, event listeners, and live component updates.",
    problemStatement: "Create a reactive state dispatcher function that calculates a shopping cart subtotal, taxes (8.5%), and applies a 10% promo coupon code 'TECH2026'.",
    instructions: [
      "1. Calculate items subtotal by reducing price * quantity.",
      "2. Check if coupon equals 'TECH2026' to apply a 10% discount.",
      "3. Add 8.5% sales tax to the discounted amount.",
      "4. Format currency output cleanly."
    ],
    starterCode: `function calculateTotal(items, couponCode) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountRate = couponCode === 'TECH2026' ? 0.10 : 0.0;
  const discounted = subtotal * (1 - discountRate);
  const tax = discounted * 0.085;
  const finalTotal = discounted + tax;

  return {
    subtotal: subtotal.toFixed(2),
    discount: (subtotal * discountRate).toFixed(2),
    tax: tax.toFixed(2),
    total: finalTotal.toFixed(2)
  };
}

const cart = [
  { item: "SSD 1TB", price: 85, qty: 2 },
  { item: "DDR5 RAM", price: 65, qty: 1 }
];

console.log(calculateTotal(cart, "TECH2026"));
`,
    expectedOutput: `{
  subtotal: "235.00",
  discount: "23.50",
  tax: "17.98",
  total: "229.48"
}
[PASS] Cart calculation verified. Discount accurately deducted.`
  },
  {
    id: "lab-ai",
    name: "Vector Cosine Similarity & Embedding Querying",
    category: "AI/ML Lab",
    technology: "PyTorch / Vector Math",
    difficulty: "Advanced",
    exercisesCount: 6,
    description: "Implement high-dimensional vector dot-product and cosine distance search for semantic document retrieval.",
    problemStatement: "Given a 4-dimensional query embedding vector and a database of 3 candidate vectors, find which candidate has the highest semantic similarity score.",
    instructions: [
      "1. Compute dot product between query and vector.",
      "2. Compute euclidean norms of both vectors.",
      "3. Divide dot product by product of norms.",
      "4. Identify the highest scoring document ID."
    ],
    starterCode: `function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const query = [0.15, 0.85, 0.42, 0.28];
const docs = [
  { id: "Doc 1 (Robotics)", vec: [0.12, 0.82, 0.39, 0.30] },
  { id: "Doc 2 (Cooking)", vec: [-0.60, 0.10, 0.15, 0.70] },
  { id: "Doc 3 (Quantum)", vec: [0.10, 0.45, 0.80, 0.15] }
];

const results = docs.map(d => ({
  id: d.id,
  score: cosineSimilarity(query, d.vec).toFixed(4)
}));

console.log("Similarity Ranking:", results);
`,
    expectedOutput: `Similarity Ranking: [
  { id: "Doc 1 (Robotics)", score: "0.9984" },
  { id: "Doc 3 (Quantum)", score: "0.8241" },
  { id: "Doc 2 (Cooking)", score: "0.2104" }
]
[PASS] Top match correctly classified as 'Doc 1 (Robotics)' with 99.84% similarity.`
  },
  {
    id: "lab-cyber",
    name: "JWT Token Validation & Signature Verification",
    category: "Cybersecurity Lab",
    technology: "Cryptography / Web Security",
    difficulty: "Advanced",
    exercisesCount: 5,
    description: "Inspect header tampering, expiration timestamp validation, and HMAC-SHA256 signature verification in API auth tokens.",
    problemStatement: "Validate whether an incoming simulated bearer token payload has expired and verify role claims.",
    instructions: [
      "1. Decode payload base64 string.",
      "2. Compare 'exp' epoch timestamp with current time.",
      "3. Verify that role equals 'admin' or 'student_researcher'.",
      "4. Reject modified or expired tokens."
    ],
    starterCode: `function verifyTokenPayload(tokenPayload) {
  const currentEpoch = Math.floor(Date.now() / 1000);
  
  if (tokenPayload.exp < currentEpoch) {
    return { valid: false, error: "TOKEN_EXPIRED" };
  }
  
  if (!tokenPayload.roles.includes("student_researcher")) {
    return { valid: false, error: "UNAUTHORIZED_ROLE" };
  }
  
  return { valid: true, user: tokenPayload.sub, granted: true };
}

const samplePayload = {
  sub: "student-alex-morgan",
  roles: ["student", "student_researcher"],
  exp: Math.floor(Date.now() / 1000) + 3600 // 1 hr future
};

console.log(verifyTokenPayload(samplePayload));
`,
    expectedOutput: `{ valid: true, user: 'student-alex-morgan', granted: true }
[PASS] Token claims verified successfully. Expiry timestamp is within valid window.`
  },
  {
    id: "lab-iot",
    name: "MQTT Telemetry Ingestion & Threshold Alerting",
    category: "IoT Lab",
    technology: "MQTT / Microcontrollers",
    difficulty: "Beginner",
    exercisesCount: 4,
    description: "Process simulated stream of temperature and humidity telemetry from ESP32 sensors and trigger alerts if threshold exceeds 75°C.",
    problemStatement: "Write an event handler function that evaluates incoming sensor packets and triggers emergency cooldown fans when temperature > 75.0°C.",
    instructions: [
      "1. Parse incoming sensor data packet.",
      "2. Check if temp > 75.0.",
      "3. Set fanStatus to 'ACTIVE' and alert: true.",
      "4. Log telemetry metrics."
    ],
    starterCode: `function handleSensorReading(packet) {
  const isOverheating = packet.tempCelsius > 75.0;
  return {
    nodeId: packet.nodeId,
    temp: packet.tempCelsius + "°C",
    coolingFan: isOverheating ? "ACTIVE (100% PWM)" : "STANDBY",
    alertStatus: isOverheating ? "CRITICAL_OVERHEAT_TRIGGERED" : "NORMAL"
  };
}

const reading1 = { nodeId: "ESP32-LAB-01", tempCelsius: 48.2 };
const reading2 = { nodeId: "ESP32-LAB-02", tempCelsius: 78.6 };

console.log("Reading 1:", handleSensorReading(reading1));
console.log("Reading 2:", handleSensorReading(reading2));
`,
    expectedOutput: `Reading 1: { nodeId: 'ESP32-LAB-01', temp: '48.2°C', coolingFan: 'STANDBY', alertStatus: 'NORMAL' }
Reading 2: { nodeId: 'ESP32-LAB-02', temp: '78.6°C', coolingFan: 'ACTIVE (100% PWM)', alertStatus: 'CRITICAL_OVERHEAT_TRIGGERED' }
[PASS] Threshold alert correctly triggered on overheating event.`
  },
  {
    id: "lab-cloud",
    name: "Kubernetes Pod Health Check & Readiness Probe Simulator",
    category: "Cloud Lab",
    technology: "Kubernetes / Docker",
    difficulty: "Intermediate",
    exercisesCount: 5,
    description: "Simulate liveness and readiness probe behaviors during container bootup and rolling deployment restarts.",
    problemStatement: "Determine whether traffic should be routed to a pod based on its readiness probe response codes.",
    instructions: [
      "1. Evaluate HTTP status code returned by /healthz.",
      "2. If status is 200, mark Ready: true.",
      "3. If 503 or timeout, increment failure threshold.",
      "4. Return cluster routing status."
    ],
    starterCode: `function evaluatePodReadiness(probeResult, consecutiveFailures) {
  if (probeResult.httpCode === 200) {
    return { routeTraffic: true, podState: "Running & Ready", failures: 0 };
  }
  const nextFailures = consecutiveFailures + 1;
  const restartRequired = nextFailures >= 3;
  return {
    routeTraffic: false,
    podState: restartRequired ? "CrashLoopBackOff" : "Unhealthy (Retrying)",
    failures: nextFailures
  };
}

console.log("Check 1:", evaluatePodReadiness({ httpCode: 200 }, 0));
console.log("Check 2 (Failure 3):", evaluatePodReadiness({ httpCode: 503 }, 2));
`,
    expectedOutput: `Check 1: { routeTraffic: true, podState: 'Running & Ready', failures: 0 }
Check 2 (Failure 3): { routeTraffic: false, podState: 'CrashLoopBackOff', failures: 3 }
[PASS] Kubernetes readiness state transitions verified according to probe rules.`
  }
];
