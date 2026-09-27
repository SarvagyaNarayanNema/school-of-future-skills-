export const dailyQuestion = {
  id: "daily-2026-09-27",
  date: "Today's Challenge",
  topic: "Distributed Consensus & Web Protocols",
  question: "In HTTP/3 over QUIC, how does the protocol avoid the classic TCP Head-of-Line (HoL) blocking problem when packet loss occurs?",
  options: [
    "By multiplexing independent binary streams over UDP so a lost packet only delays its specific stream",
    "By compressing all header frames using HPACK instead of QPACK",
    "By forcing all requests to execute strictly in synchronous FIFO order",
    "By replacing TLS 1.3 handshakes with symmetric pre-shared keys"
  ],
  correctIndex: 0,
  explanation: "HTTP/3 uses QUIC over UDP. Because streams are multiplexed independently at the transport layer, losing a packet in stream A does not stall delivery of packets belonging to stream B or C.",
  points: 50
};

export const cyberQuizQuestions = [
  {
    id: "cq-1",
    question: "What primary security advantage does Zero Trust Architecture (ZTA) enforce over traditional perimeter-based castle-and-moat security?",
    options: [
      "It assumes every entity (even inside the internal network) is untrusted until continuously authenticated and authorized",
      "It completely eliminates the need for firewalls or VPNs",
      "It only allows traffic encrypted with 4096-bit RSA keys",
      "It automatically blocks all outward-bound internet traffic from developer laptops"
    ],
    correctIndex: 0,
    explanation: "Zero Trust embodies 'never trust, always verify', enforcing least-privilege access and continuous verification regardless of network location."
  },
  {
    id: "cq-2",
    question: "Which of the following headers protects against Cross-Site Scripting (XSS) attacks by strictly controlling resources the browser is allowed to load?",
    options: [
      "Access-Control-Allow-Origin",
      "Content-Security-Policy (CSP)",
      "Strict-Transport-Security (HSTS)",
      "X-Content-Type-Options"
    ],
    correctIndex: 1,
    explanation: "Content-Security-Policy (CSP) restricts the domains from which scripts, styles, images, and other assets can execute."
  },
  {
    id: "cq-3",
    question: "In public-key cryptography, if Alice wants to send a confidential message to Bob that only Bob can read, whose key does Alice encrypt with?",
    options: [
      "Alice's private key",
      "Alice's public key",
      "Bob's public key",
      "Bob's private key"
    ],
    correctIndex: 2,
    explanation: "Alice encrypts with Bob's public key. Only Bob possesses the corresponding private key required to decrypt the ciphertext."
  },
  {
    id: "cq-4",
    question: "What is an SSRF (Server-Side Request Forgery) vulnerability?",
    options: [
      "When an attacker forces a backend server to execute unauthorized HTTP requests to internal/external systems",
      "When client cookies are stolen via an injected JavaScript snippet",
      "When a SQL query string is directly concatenated with user parameters",
      "When a server runs out of heap memory due to unbounded loop recursion"
    ],
    correctIndex: 0,
    explanation: "SSRF allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain or internal loopback IP (like 127.0.0.1 or cloud metadata endpoints)."
  },
  {
    id: "cq-5",
    question: "Why are salt values added to passwords before hashing with algorithms like bcrypt or Argon2?",
    options: [
      "To reduce the length of the resulting hash string",
      "To prevent precomputed rainbow table attacks and ensure identical passwords yield different hashes",
      "To enable reversible decryption by platform administrators",
      "To speed up the hashing verification process on low-power devices"
    ],
    correctIndex: 1,
    explanation: "Salting appends unique random cryptographic bytes to passwords, rendering precomputed lookup tables (rainbow tables) ineffective."
  }
];

export const aiQuizQuestions = [
  {
    id: "ai-1",
    question: "In the standard Transformer architecture (Vaswani et al.), what is the computational time complexity of full self-attention with respect to sequence length N?",
    options: [
      "O(N)",
      "O(N * log N)",
      "O(N²)",
      "O(N³)"
    ],
    correctIndex: 2,
    explanation: "Standard multi-head attention computes a dot product between every token and every other token in the sequence, resulting in quadratic O(N²) complexity."
  },
  {
    id: "ai-2",
    question: "What problem does Retrieval-Augmented Generation (RAG) primarily solve when using Large Language Models?",
    options: [
      "It grounds LLM responses with fresh external documents, reducing hallucinations and avoiding retraining",
      "It speeds up GPU matrix multiplication during pre-training",
      "It automatically converts PyTorch tensors into ONNX models",
      "It reduces temperature parameter values to strictly zero"
    ],
    correctIndex: 0,
    explanation: "RAG retrieves relevant external facts or knowledge snippets at query time and passes them into the LLM context prompt, mitigating hallucinations and outdated weights."
  },
  {
    id: "ai-3",
    question: "What does the technique LoRA (Low-Rank Adaptation) do when fine-tuning foundation models?",
    options: [
      "Freezes pretrained model weights and injects trainable rank decomposition matrices into layers, drastically cutting trainable parameters",
      "Deletes layers from the neural network until it fits on an iPhone",
      "Converts float32 weights into 1-bit binary weights with zero accuracy loss",
      "Generates synthetic training datasets using reinforcement learning"
    ],
    correctIndex: 0,
    explanation: "LoRA decomposes weight updates into low-rank matrices (ΔW = B × A where rank r << d), reducing trainable parameters often by over 99%."
  },
  {
    id: "ai-4",
    question: "In training generative adversarial networks (GANs) or diffusion models, what is mode collapse?",
    options: [
      "When the generator produces only a limited variety of repetitive outputs instead of covering the true data distribution",
      "When the GPU runs out of VRAM during backpropagation",
      "When the learning rate decays to zero too early",
      "When the discriminator always outputs 50% probability"
    ],
    correctIndex: 0,
    explanation: "Mode collapse occurs when the generator finds a small subset of realistic samples that fool the discriminator and repeatedly produces only those few variants."
  },
  {
    id: "ai-5",
    question: "Which metric is commonly used to measure the cosine similarity or distance between high-dimensional vector embeddings?",
    options: [
      "A • B / (||A|| * ||B||)",
      "Mean Squared Error (MSE)",
      "BLEU Score",
      "Categorical Cross Entropy"
    ],
    correctIndex: 0,
    explanation: "Cosine similarity measures the cosine of the angle between two non-zero vectors in inner product space, calculated as (A • B) / (||A|| * ||B||)."
  }
];

export const codingChallenges = [
  {
    id: "code-01",
    title: "Zero-Latency Stream De-duplicator",
    difficulty: "Easy",
    points: 100,
    timeLimit: "15 mins",
    tags: ["Arrays", "Hash Set", "Streaming"],
    description: "Write a function `deduplicate(stream)` that takes an array of numeric packet IDs and returns an array of unique packet IDs preserving their original arrival order.",
    starterCode: `function deduplicate(stream) {
  // Your code here:
  // Return unique packet IDs maintaining order
  return Array.from(new Set(stream));
}`,
    testCases: [
      { input: "[101, 102, 101, 105, 102, 108]", expected: "[101, 102, 105, 108]" },
      { input: "[7, 7, 7, 7]", expected: "[7]" },
      { input: "[1, 2, 3]", expected: "[1, 2, 3]" }
    ],
    solutionHint: "Using JavaScript's built-in `Set` or an auxiliary hash map ensures O(N) linear time deduplication."
  },
  {
    id: "code-02",
    title: "Valid Anagram Cryptographic Token",
    difficulty: "Medium",
    points: 200,
    timeLimit: "25 mins",
    tags: ["Strings", "Hashing", "Security"],
    description: "Given two string tokens `s` and `t`, return `true` if `t` is an anagram of `s` (contains the exact same characters with identical frequencies), and `false` otherwise.",
    starterCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
    testCases: [
      { input: 'isAnagram("anagram", "nagaram")', expected: "true" },
      { input: 'isAnagram("rat", "car")', expected: "false" },
      { input: 'isAnagram("listen", "silent")', expected: "true" }
    ],
    solutionHint: "A character frequency hash table or 26-element array provides O(N) runtime and O(1) auxiliary space."
  },
  {
    id: "code-03",
    title: "Max Sliding Window Telemetry Peak",
    difficulty: "Hard",
    points: 350,
    timeLimit: "35 mins",
    tags: ["Monotonic Queue", "Sliding Window", "Optimization"],
    description: "Given an array of sensor telemetry values `nums` and a sliding window size `k`, return the maximum sensor reading for each contiguous sliding window moving from left to right.",
    starterCode: `function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside current window
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    // Maintain monotonic decreasing order
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
    testCases: [
      { input: "maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)", expected: "[3, 3, 5, 5, 6, 7]" },
      { input: "maxSlidingWindow([1], 1)", expected: "[1]" }
    ],
    solutionHint: "Maintain a monotonic decreasing double-ended queue storing indices to achieve O(N) linear time."
  }
];

export const initialLeaderboard = [
  { rank: 1, name: "Aria Sharma", rollNo: "FS24-001", points: 2850, badges: 6, challengesCompleted: 28, avatarColor: "bg-cyan-500" },
  { rank: 2, name: "Marcus Thorne", rollNo: "FS24-019", points: 2620, badges: 5, challengesCompleted: 25, avatarColor: "bg-purple-500" },
  { rank: 3, name: "Zoe Martinez", rollNo: "FS24-042", points: 2490, badges: 5, challengesCompleted: 23, avatarColor: "bg-blue-500" },
  { rank: 4, name: "Ethan Chen", rollNo: "FS24-008", points: 2310, badges: 4, challengesCompleted: 21, avatarColor: "bg-emerald-500" },
  { rank: 5, name: "Liam Patel", rollNo: "FS24-033", points: 2180, badges: 4, challengesCompleted: 20, avatarColor: "bg-amber-500" },
  { rank: 6, name: "Alex Morgan (You)", rollNo: "FS24-088", points: 1940, badges: 4, challengesCompleted: 17, avatarColor: "bg-indigo-500", isUser: true },
  { rank: 7, name: "Priya Nair", rollNo: "FS24-014", points: 1820, badges: 3, challengesCompleted: 16, avatarColor: "bg-rose-500" },
  { rank: 8, name: "Rohan Varma", rollNo: "FS24-055", points: 1740, badges: 3, challengesCompleted: 15, avatarColor: "bg-teal-500" }
];
