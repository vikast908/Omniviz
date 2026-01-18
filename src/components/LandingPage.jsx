import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function ThemeToggle() {
  const { theme, toggleTheme } = useStore()

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-omniviz-surface border border-omniviz-border transition-colors duration-300 hover:border-omniviz-accent/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-omniviz-accent flex items-center justify-center"
        animate={{ left: theme === 'dark' ? '2px' : '26px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}

function LandingPage() {
  const { setSelectedConcept, theme } = useStore()

  const concepts = [
    {
      id: 'llm',
      title: 'Large Language Models',
      subtitle: 'How AI understands and generates text',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      color: '#7c3aed',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'neural-networks',
      title: 'Neural Networks',
      subtitle: 'The building blocks of deep learning',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'cryptography',
      title: 'Cryptography',
      subtitle: 'The science of secure communication',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'databases',
      title: 'Database Systems',
      subtitle: 'How data is stored and retrieved',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      color: '#f97316',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      id: 'compilers',
      title: 'Compilers',
      subtitle: 'From code to machine instructions',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'quantum',
      title: 'Quantum Computing',
      subtitle: 'Computing with quantum mechanics',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: '#14b8a6',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'software-architecture',
      title: 'Software Architecture',
      subtitle: 'Frontend, backend, databases & infrastructure',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'operating-systems',
      title: 'Operating Systems',
      subtitle: 'Process scheduling, memory & file systems',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: '#ef4444',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      id: 'distributed-systems',
      title: 'Distributed Systems',
      subtitle: 'Consensus, replication & fault tolerance',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'computer-graphics',
      title: 'Computer Graphics',
      subtitle: 'Rendering, transformations & shading',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: '#ec4899',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      subtitle: 'Algorithms that learn from data',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-indigo-500',
    },
    {
      id: 'networking',
      title: 'Computer Networking',
      subtitle: 'How computers communicate',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c0-1.657-4.03-3-9-3s-9 1.343-9 3m18 0c0 1.657-4.03 3-9 3s-9-1.343-9-3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" />
        </svg>
      ),
      color: '#0ea5e9',
      gradient: 'from-sky-500 to-blue-500',
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      subtitle: 'Organizing and storing data efficiently',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      subtitle: 'Step-by-step problem solving',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: '#f59e0b',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'web-development',
      title: 'Web Development',
      subtitle: 'Building modern web applications',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: '#3b82f6',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      subtitle: 'Protecting systems and data',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: '#ef4444',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      id: 'cloud-computing',
      title: 'Cloud Computing',
      subtitle: 'Scalable infrastructure & services',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'version-control',
      title: 'Version Control',
      subtitle: 'Git branching, merging & workflows',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      color: '#f97316',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'regex',
      title: 'Regular Expressions',
      subtitle: 'Pattern matching & text processing',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      color: '#a855f7',
      gradient: 'from-purple-500 to-fuchsia-500',
    },
    {
      id: 'cpu-architecture',
      title: 'CPU Architecture',
      subtitle: 'How processors execute instructions',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: '#64748b',
      gradient: 'from-slate-500 to-gray-600',
    },
    {
      id: 'information-theory',
      title: 'Information Theory',
      subtitle: 'Entropy, compression & encoding',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#0891b2',
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      id: 'game-theory',
      title: 'Game Theory',
      subtitle: 'Strategic decision making',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#84cc16',
      gradient: 'from-lime-500 to-green-500',
    },
    {
      id: 'nlp',
      title: 'Natural Language Processing',
      subtitle: 'Teaching machines to understand text',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: '#6366f1',
      gradient: 'from-indigo-500 to-violet-500',
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      subtitle: 'Teaching machines to see',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'blockchain',
      title: 'Blockchain',
      subtitle: 'Decentralized ledger technology',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 'signal-processing',
      title: 'Signal Processing',
      subtitle: 'Analyzing & transforming signals',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      color: '#14b8a6',
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      id: 'robotics',
      title: 'Robotics',
      subtitle: 'Autonomous machines & control systems',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: '#6b7280',
      gradient: 'from-gray-500 to-slate-600',
    },
    {
      id: 'functional-programming',
      title: 'Functional Programming',
      subtitle: 'Pure functions & immutability',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'type-systems',
      title: 'Type Systems',
      subtitle: 'Static typing & type inference',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: '#2563eb',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'api-design',
      title: 'API Design',
      subtitle: 'RESTful services & best practices',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: '#059669',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'hashing',
      title: 'Hashing',
      subtitle: 'Maps keys to values efficiently',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'parsing',
      title: 'Parsing',
      subtitle: 'Analyzing text structure',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      color: '#0ea5e9',
      gradient: 'from-sky-500 to-blue-500',
    },
    {
      id: 'binary-operations',
      title: 'Binary Operations',
      subtitle: 'Bit manipulation magic',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 'state-machines',
      title: 'State Machines',
      subtitle: 'Modeling system states',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: '#f97316',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'websockets',
      title: 'WebSockets',
      subtitle: 'Real-time communication',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: '#eab308',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'authentication',
      title: 'Authentication',
      subtitle: 'Verifying identity securely',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: '#ef4444',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      id: 'compression',
      title: 'Data Compression',
      subtitle: 'Making files smaller',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      color: '#6366f1',
      gradient: 'from-indigo-500 to-violet-500',
    },
    {
      id: 'search-algorithms',
      title: 'Search Algorithms',
      subtitle: 'Finding data efficiently',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: '#84cc16',
      gradient: 'from-lime-500 to-green-500',
    },
    {
      id: 'caching',
      title: 'Caching',
      subtitle: 'Speeding up access',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#f59e0b',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'containerization',
      title: 'Containerization',
      subtitle: 'Packaging applications',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: '#0ea5e9',
      gradient: 'from-sky-500 to-cyan-500',
    },
    {
      id: 'devops',
      title: 'DevOps',
      subtitle: 'Development & Operations',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: '#d946ef',
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      id: 'microservices',
      title: 'Microservices',
      subtitle: 'Decoupled architecture',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'event-driven',
      title: 'Event-Driven',
      subtitle: 'Reacting to events',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      color: '#f97316',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'oop',
      title: 'Object-Oriented',
      subtitle: 'Objects and classes',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'recursion',
      title: 'Recursion',
      subtitle: 'Functions calling themselves',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'graph-theory',
      title: 'Graph Theory',
      subtitle: 'Nodes and edges',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      id: 'design-patterns',
      title: 'Design Patterns',
      subtitle: 'Reusable solutions',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      color: '#64748b',
      gradient: 'from-slate-500 to-gray-600',
    },
    {
      id: 'testing',
      title: 'Testing',
      subtitle: 'Ensuring code quality',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 'memory-management',
      title: 'Memory Management',
      subtitle: 'Allocating resources',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: '#ef4444',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      id: 'concurrency',
      title: 'Concurrency',
      subtitle: 'Doing things at once',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <div className="min-h-screen bg-omniviz-bg transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-omniviz-bg/80 backdrop-blur-lg border-b border-omniviz-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-omniviz-text">OmniViz</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-500/5'
          }`} />
          <div className={`absolute top-40 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'
          }`} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-omniviz-accent/10 border border-omniviz-accent/30 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-omniviz-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-omniviz-accent"></span>
              </span>
              <span className="text-sm font-medium text-omniviz-accent">Interactive Visual Learning</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-omniviz-accent via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Understand Complex
              </span>
              <br />
              <span className="text-omniviz-text">Concepts Visually</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-omniviz-text-muted max-w-3xl mx-auto mb-10"
            >
              Dive deep into computer science and engineering topics through
              beautiful, interactive visualizations that make learning intuitive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              {[
                { icon: '🎯', text: 'Step-by-step explanations' },
                { icon: '🔬', text: 'Interactive demos' },
                { icon: '📚', text: 'In-depth coverage' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-omniviz-surface border border-omniviz-border">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-omniviz-text-muted">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-omniviz-text mb-2">Explore Topics</h2>
          <p className="text-omniviz-text-muted">Choose a concept to start learning</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept, i) => (
            <motion.button
              key={concept.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              onClick={() => setSelectedConcept(concept.id)}
              className="group relative text-left p-6 rounded-2xl bg-omniviz-surface border border-omniviz-border hover:border-omniviz-accent/50 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative">
                {/* Icon with gradient background */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${concept.gradient} flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {concept.icon}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-semibold text-omniviz-text mb-2 group-hover:text-omniviz-accent transition-colors">
                  {concept.title}
                </h3>
                <p className="text-sm text-omniviz-text-muted mb-4">
                  {concept.subtitle}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-omniviz-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium">Start Learning</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative corner */}
              <div
                className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${concept.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-omniviz-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-omniviz-text-muted">
            Built for visual learners who want to understand how things really work.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
