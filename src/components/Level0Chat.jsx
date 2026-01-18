import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function Level0Chat() {
  const { inputText, setInputText, outputText, setOutputText, isGenerating, setIsGenerating } = useStore()
  const [localInput, setLocalInput] = useState(inputText)
  const [displayedOutput, setDisplayedOutput] = useState('')
  const textareaRef = useRef(null)

  // Simulated streaming response
  const generateResponse = async () => {
    setIsGenerating(true)
    setDisplayedOutput('')

    // Simulated LLM response based on input
    const responses = {
      default: "jumps over the lazy dog. This is a classic pangram that contains every letter of the English alphabet at least once. It has been used for centuries to test typewriters, fonts, and keyboards.",
    }

    const response = responses.default
    setOutputText(response)

    // Stream the response character by character
    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20))
      setDisplayedOutput(prev => prev + response[i])
    }

    setIsGenerating(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (localInput.trim() && !isGenerating) {
      setInputText(localInput)
      generateResponse()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-omniviz-accent to-omniviz-accent-light bg-clip-text text-transparent"
        >
          Large Language Models
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-omniviz-text-muted mb-8"
        >
          The User Interface - Input a prompt and see the magic
        </motion.p>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-omniviz-surface rounded-2xl border border-omniviz-border p-6 shadow-xl"
        >
          {/* Output area */}
          {(displayedOutput || isGenerating) && (
            <div className="mb-4 p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
              <p className="text-omniviz-text whitespace-pre-wrap">
                {displayedOutput}
                {isGenerating && (
                  <span className="inline-block w-2 h-5 bg-omniviz-accent ml-1 animate-pulse" />
                )}
              </p>
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a prompt..."
                rows={3}
                className="w-full bg-omniviz-bg text-omniviz-text placeholder-omniviz-text-muted rounded-lg border border-omniviz-border p-4 pr-14 resize-none focus:outline-none focus:border-omniviz-accent focus:ring-1 focus:ring-omniviz-accent transition-all"
              />
              <button
                type="submit"
                disabled={isGenerating || !localInput.trim()}
                className="absolute right-3 bottom-3 p-2 bg-omniviz-accent hover:bg-omniviz-accent-light disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Insight hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-omniviz-text-muted text-sm mt-6 italic"
        >
          "This looks like magic. How does it work?"
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Level0Chat
