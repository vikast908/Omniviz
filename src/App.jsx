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
import MachineLearningConcept from './components/concepts/MachineLearningConcept'
import NetworkingConcept from './components/concepts/NetworkingConcept'
import DataStructuresConcept from './components/concepts/DataStructuresConcept'
import AlgorithmsConcept from './components/concepts/AlgorithmsConcept'
import WebDevelopmentConcept from './components/concepts/WebDevelopmentConcept'
import CybersecurityConcept from './components/concepts/CybersecurityConcept'
import CloudComputingConcept from './components/concepts/CloudComputingConcept'
import VersionControlConcept from './components/concepts/VersionControlConcept'
import RegexConcept from './components/concepts/RegexConcept'
import CPUArchitectureConcept from './components/concepts/CPUArchitectureConcept'
import InformationTheoryConcept from './components/concepts/InformationTheoryConcept'
import GameTheoryConcept from './components/concepts/GameTheoryConcept'
import NLPConcept from './components/concepts/NLPConcept'
import ComputerVisionConcept from './components/concepts/ComputerVisionConcept'
import BlockchainConcept from './components/concepts/BlockchainConcept'
import SignalProcessingConcept from './components/concepts/SignalProcessingConcept'
import RoboticsConcept from './components/concepts/RoboticsConcept'
import FunctionalProgrammingConcept from './components/concepts/FunctionalProgrammingConcept'
import TypeSystemsConcept from './components/concepts/TypeSystemsConcept'
import APIDesignConcept from './components/concepts/APIDesignConcept'

function App() {
  const { selectedConcept, theme } = useStore()

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Scroll to top when concept changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedConcept])

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
      case 'machine-learning':
        return <MachineLearningConcept key="machine-learning" />
      case 'networking':
        return <NetworkingConcept key="networking" />
      case 'data-structures':
        return <DataStructuresConcept key="data-structures" />
      case 'algorithms':
        return <AlgorithmsConcept key="algorithms" />
      case 'web-development':
        return <WebDevelopmentConcept key="web-development" />
      case 'cybersecurity':
        return <CybersecurityConcept key="cybersecurity" />
      case 'cloud-computing':
        return <CloudComputingConcept key="cloud-computing" />
      case 'version-control':
        return <VersionControlConcept key="version-control" />
      case 'regex':
        return <RegexConcept key="regex" />
      case 'cpu-architecture':
        return <CPUArchitectureConcept key="cpu-architecture" />
      case 'information-theory':
        return <InformationTheoryConcept key="information-theory" />
      case 'game-theory':
        return <GameTheoryConcept key="game-theory" />
      case 'nlp':
        return <NLPConcept key="nlp" />
      case 'computer-vision':
        return <ComputerVisionConcept key="computer-vision" />
      case 'blockchain':
        return <BlockchainConcept key="blockchain" />
      case 'signal-processing':
        return <SignalProcessingConcept key="signal-processing" />
      case 'robotics':
        return <RoboticsConcept key="robotics" />
      case 'functional-programming':
        return <FunctionalProgrammingConcept key="functional-programming" />
      case 'type-systems':
        return <TypeSystemsConcept key="type-systems" />
      case 'api-design':
        return <APIDesignConcept key="api-design" />
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
