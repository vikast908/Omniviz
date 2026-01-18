# OmniViz

Interactive visual learning platform for computer science and engineering concepts. Understand complex topics through beautiful, interactive visualizations.

## Features

- **30 Interactive Concepts** - Each with multiple hands-on demos
- **Canvas-based Visualizations** - Smooth, responsive animations
- **Dark/Light Theme** - Toggle between themes with automatic persistence
- **WCAG AAA Accessible** - 7:1 contrast ratio for optimal readability
- **Responsive Design** - Works on desktop and mobile devices

## Concepts Covered

### Core CS Fundamentals
- **Data Structures** - Arrays, linked lists, stacks, queues, BST, hash tables
- **Algorithms** - Sorting, binary search, graph traversal, dynamic programming, pathfinding
- **Operating Systems** - Process scheduling, memory management, file systems
- **Compilers** - Lexical analysis, parsing, AST, code generation

### AI & Machine Learning
- **Large Language Models** - Tokenization, embeddings, attention, generation
- **Neural Networks** - Perceptrons, backpropagation, activation functions
- **Machine Learning** - Linear regression, KNN, K-Means, decision trees, gradient descent
- **Natural Language Processing** - Tokenization, embeddings, sentiment analysis, NER
- **Computer Vision** - Filtering, edge detection, classification, object detection

### Systems & Architecture
- **CPU Architecture** - Fetch-decode-execute cycle, registers, pipelining, cache
- **Distributed Systems** - Consensus, replication, fault tolerance
- **Cloud Computing** - IaaS/PaaS/SaaS, auto scaling, load balancing, containers
- **Database Systems** - SQL, indexing, transactions, query optimization

### Security & Cryptography
- **Cryptography** - Symmetric/asymmetric encryption, hashing, digital signatures
- **Cybersecurity** - Password hashing, SQL injection, XSS, JWT, firewalls
- **Blockchain** - Block structure, hashing, proof of work, transactions

### Web & Software
- **Web Development** - DOM, box model, flexbox, events, REST API
- **Software Architecture** - Frontend, backend, databases, infrastructure
- **API Design** - REST principles, status codes, versioning, pagination
- **Version Control** - Git branching, merging, rebasing, workflows

### Programming Paradigms
- **Functional Programming** - Pure functions, immutability, higher-order functions
- **Type Systems** - Static vs dynamic typing, generics, type inference

### Theory & Math
- **Quantum Computing** - Qubits, superposition, entanglement, quantum gates
- **Information Theory** - Entropy, Huffman coding, compression, channel capacity
- **Game Theory** - Prisoner's dilemma, Nash equilibrium, auctions
- **Computer Graphics** - Rendering pipeline, transformations, shading

### Other Topics
- **Networking** - OSI model, TCP handshake, DNS resolution, HTTP
- **Regular Expressions** - Pattern matching, groups, lookahead/lookbehind
- **Signal Processing** - Waveforms, Fourier transform, sampling, filtering
- **Robotics** - Kinematics, sensors, path planning, PID control

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **HTML Canvas** - Interactive visualizations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vikast908/Omniviz.git
cd Omniviz

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── concepts/          # Individual concept visualizations
│   │   ├── LLMConcept.jsx
│   │   ├── NeuralNetworksConcept.jsx
│   │   ├── MachineLearningConcept.jsx
│   │   └── ... (30 concept files)
│   ├── LandingPage.jsx    # Home page with concept grid
│   └── ui/                # Reusable UI components
├── store/
│   └── useStore.js        # Zustand store for state management
├── App.jsx                # Main app with routing
├── index.css              # Global styles and theme variables
└── main.jsx               # Entry point
```

## License

MIT
