import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

function ThemeToggle() {
  const { theme, toggleTheme } = useStore()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-omniviz-surface border border-omniviz-border transition-colors duration-300 hover:border-omniviz-accent/50 flex items-center justify-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5 text-omniviz-text-muted" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-omniviz-text-muted" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}

export default function ConceptHeader({ title, color = 'violet' }) {
  const { goToLanding } = useStore()

  const colorClasses = {
    violet: 'bg-violet-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500',
  }

  return (
    <div className="sticky top-0 z-50 bg-omniviz-bg/90 backdrop-blur-sm border-b border-omniviz-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goToLanding}
          className="flex items-center gap-2 px-3 py-2 bg-omniviz-surface rounded-lg border border-omniviz-border text-omniviz-text-muted hover:text-omniviz-text transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">All Concepts</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colorClasses[color] || colorClasses.violet}`} />
            <span className="text-sm text-omniviz-text-muted hidden sm:inline">{title}</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
