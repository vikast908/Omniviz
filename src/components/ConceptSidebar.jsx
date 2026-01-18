import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'

function ConceptSidebar() {
  const { zoomLevel, setZoomLevel } = useStore()
  const [isOpen, setIsOpen] = useState(true)

  const concepts = {
    0: {
      title: 'The User Interface',
      content: [
        {
          term: 'What is an LLM?',
          definition: 'A Large Language Model is a neural network trained on vast amounts of text to predict the next word in a sequence.'
        },
        {
          term: 'How does it generate text?',
          definition: 'It predicts one token at a time, using each prediction as input for the next, creating coherent text through autoregression.'
        }
      ]
    },
    1: {
      title: 'The Data Pipeline',
      content: [
        {
          term: 'What is a Token?',
          definition: 'A token is a piece of text (word, subword, or character) that the model processes. "playing" might become "play" + "ing".'
        },
        {
          term: 'What is an Embedding?',
          definition: 'A high-dimensional vector (e.g., 768 numbers) that represents the meaning of a token in a way the model can process.'
        },
        {
          term: 'Token IDs',
          definition: 'Each token maps to a unique integer ID from the model\'s vocabulary (typically 50,000+ tokens).'
        }
      ]
    },
    2: {
      title: 'Transformer Architecture',
      content: [
        {
          term: 'What is Attention?',
          definition: 'A mechanism that allows each token to "look at" other tokens to understand context. It\'s how "bank" knows if it means "river bank" or "money bank".'
        },
        {
          term: 'Multi-Head Attention',
          definition: 'Multiple attention "heads" run in parallel, each learning different types of relationships (syntax, semantics, etc.).'
        },
        {
          term: 'Feed-Forward Network',
          definition: 'A simple 2-layer neural network that processes each token independently, adding non-linear transformations.'
        },
        {
          term: 'Layer Normalization',
          definition: 'Normalizes activations to stabilize training and improve gradient flow through deep networks.'
        }
      ]
    },
    3: {
      title: 'The Math Inside',
      content: [
        {
          term: 'Query, Key, Value',
          definition: 'Q = "What am I looking for?", K = "What do I contain?", V = "What information to pass?". Attention = softmax(QK^T/√d) × V'
        },
        {
          term: 'Dot Product Attention',
          definition: 'Similarity between Q and K is computed via dot product. Higher scores mean stronger attention connections.'
        },
        {
          term: 'Softmax',
          definition: 'Converts raw attention scores into a probability distribution that sums to 1, making attention weights interpretable.'
        },
        {
          term: 'Scaling Factor √d',
          definition: 'Prevents dot products from growing too large in high dimensions, which would make softmax outputs too peaked.'
        }
      ]
    }
  }

  const currentConcepts = concepts[zoomLevel] || concepts[0]

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-omniviz-surface/90 backdrop-blur-sm rounded-xl border border-omniviz-border flex items-center justify-center text-omniviz-text hover:bg-omniviz-bg transition-all shadow-lg"
      >
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-16 right-4 bottom-20 w-80 z-40 overflow-hidden"
          >
            <div className="h-full bg-omniviz-surface/95 backdrop-blur-sm rounded-xl border border-omniviz-border shadow-xl flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-omniviz-border">
                <h3 className="text-lg font-semibold text-omniviz-accent">
                  {currentConcepts.title}
                </h3>
                <p className="text-xs text-omniviz-text-muted mt-1">
                  Level {zoomLevel + 1} Concepts
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <AnimatePresence mode="wait">
                  {currentConcepts.content.map((item, i) => (
                    <motion.div
                      key={`${zoomLevel}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-omniviz-bg rounded-lg p-3"
                    >
                      <h4 className="text-sm font-medium text-omniviz-text mb-1">
                        {item.term}
                      </h4>
                      <p className="text-xs text-omniviz-text-muted leading-relaxed">
                        {item.definition}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Reset button */}
              <div className="p-4 border-t border-omniviz-border">
                <button
                  onClick={() => setZoomLevel(0)}
                  className="w-full py-2 px-4 bg-omniviz-bg hover:bg-omniviz-border text-omniviz-text-muted text-sm rounded-lg transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ConceptSidebar
