import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './store/useStore'
import LandingPage from './components/LandingPage'
import LLMConcept from './components/concepts/LLMConcept'
import NeuralNetworksConcept from './components/concepts/NeuralNetworksConcept'
import CryptographyConcept from './components/concepts/CryptographyConcept'
import DatabasesConcept from './components/concepts/DatabasesConcept'
import CompilersConcept from './components/concepts/CompilersConcept'
import QuantumConcept from './components/concepts/QuantumConcept'
import SoftwareArchitectureConcept from './components/concepts/SoftwareArchitectureConcept'
import OperatingSystemsConcept from './components/concepts/OperatingSystemsConcept'
import DistributedSystemsConcept from './components/concepts/DistributedSystemsConcept'
import ComputerGraphicsConcept from './components/concepts/ComputerGraphicsConcept'

function App() {
  const { selectedConcept, theme } = useStore()

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const renderConcept = () => {
    switch (selectedConcept) {
      case 'llm':
        return <LLMConcept key="llm" />
      case 'neural-networks':
        return <NeuralNetworksConcept key="neural-networks" />
      case 'cryptography':
        return <CryptographyConcept key="cryptography" />
      case 'databases':
        return <DatabasesConcept key="databases" />
      case 'compilers':
        return <CompilersConcept key="compilers" />
      case 'quantum':
        return <QuantumConcept key="quantum" />
      case 'software-architecture':
        return <SoftwareArchitectureConcept key="software-architecture" />
      case 'operating-systems':
        return <OperatingSystemsConcept key="operating-systems" />
      case 'distributed-systems':
        return <DistributedSystemsConcept key="distributed-systems" />
      case 'computer-graphics':
        return <ComputerGraphicsConcept key="computer-graphics" />
      default:
        return <LandingPage key="landing" />
    }
  }

  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedConcept || 'landing'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full min-h-screen bg-omniviz-bg"
        >
          {renderConcept()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
