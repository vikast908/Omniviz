import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

// Caesar cipher helper
function caesarEncrypt(text, shift) {
  return text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65)
    }
    return char
  }).join('')
}

// Simple hash function (for demonstration)
function simpleHash(text) {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()
}

// Vigenere cipher
function vigenereEncrypt(text, key) {
  return text.toUpperCase().split('').map((char, i) => {
    if (char >= 'A' && char <= 'Z') {
      const shift = key.toUpperCase().charCodeAt(i % key.length) - 65
      return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65)
    }
    return char
  }).join('')
}

function CryptographyConcept() {
  const [plaintext, setPlaintext] = useState('HELLO')
  const [key, setKey] = useState(3)
  const [vigKey, setVigKey] = useState('KEY')

  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Cryptography" color="green" />

      {/* Scrollable Content */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Cryptography
              </h1>
              <p className="text-xl text-omniviz-text-muted max-w-2xl mx-auto">
                The science of secure communication in the presence of adversaries
              </p>
            </motion.div>
          </Section>

          {/* What is Cryptography */}
          <Section title="What is Cryptography?" id="intro">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    <span className="text-green-400 font-semibold">Cryptography</span> is the practice of secure
                    communication techniques that allow only the sender and intended recipient to view message contents.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    It transforms readable data (<span className="text-blue-400">plaintext</span>) into an unreadable
                    format (<span className="text-green-400">ciphertext</span>) using a secret
                    <span className="text-yellow-400"> key</span>. Only those with the correct key can reverse
                    the transformation.
                  </p>
                  <div className="bg-omniviz-bg rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-semibold text-omniviz-accent mb-2">Real World Uses</h4>
                    <p className="text-sm text-omniviz-text-muted">
                      HTTPS websites, messaging apps, password storage, digital signatures, blockchain,
                      and virtually all secure digital communication relies on cryptography.
                    </p>
                  </div>
                </div>
                <EncryptionDemo plaintext={plaintext} setPlaintext={setPlaintext} keyVal={key} />
              </div>
            </ExplanationCard>
          </Section>

          {/* Four Pillars of Cryptography */}
          <Section title="The Four Pillars" id="pillars">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '🔒', title: 'Confidentiality', desc: 'Only intended recipients can read the message', color: 'green' },
                { icon: '✅', title: 'Integrity', desc: 'Detect if data has been modified in transit', color: 'blue' },
                { icon: '🎭', title: 'Authentication', desc: 'Verify the identity of the sender', color: 'purple' },
                { icon: '📝', title: 'Non-repudiation', desc: 'Sender cannot deny sending the message', color: 'orange' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface rounded-xl p-6 border border-omniviz-border"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className={`font-semibold text-${item.color}-400 mb-2`}>{item.title}</div>
                  <p className="text-sm text-omniviz-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Caesar Cipher */}
          <Section title="Caesar Cipher: The Simplest Encryption" id="caesar">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    The <span className="text-green-400 font-semibold">Caesar cipher</span> is one of the oldest
                    encryption techniques, used by Julius Caesar for military communications. It works by
                    shifting each letter in the alphabet by a fixed number of positions.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">How it Works</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        If the shift is 3, then A becomes D, B becomes E, C becomes F, and so on.
                        The alphabet wraps around, so X becomes A, Y becomes B, Z becomes C.
                      </p>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                      <h4 className="text-sm font-semibold text-red-400 mb-2">Security: Very Weak</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Only 25 possible keys! Can be broken by frequency analysis or brute force in seconds.
                        Never use for actual security.
                      </p>
                    </div>
                  </div>
                </div>
                <CaesarCipherDemo plaintext={plaintext} keyVal={key} setKey={setKey} />
              </div>
            </ExplanationCard>
          </Section>

          {/* Character Mapping */}
          <Section title="How Characters Transform" id="transform">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6">
                Watch how each character in your message transforms through the encryption process:
              </p>
              <CharacterMapping plaintext={plaintext} keyVal={key} />
            </ExplanationCard>
          </Section>

          {/* Vigenere Cipher */}
          <Section title="Vigenere Cipher: Polyalphabetic Encryption" id="vigenere">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    The <span className="text-purple-400 font-semibold">Vigenere cipher</span> improves on Caesar
                    by using a keyword instead of a single shift value. Each letter of the keyword determines
                    a different shift for each position.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    For example, with keyword "KEY": the first letter shifts by K (10), second by E (4),
                    third by Y (24), then it repeats: fourth letter shifts by K again.
                  </p>
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">Security: Moderate</h4>
                    <p className="text-sm text-omniviz-text-muted">
                      Resistant to simple frequency analysis, but vulnerable to Kasiski examination
                      (finding repeated patterns) and Friedman test.
                    </p>
                  </div>
                </div>
                <VigenereCipherDemo plaintext={plaintext} vigKey={vigKey} setVigKey={setVigKey} />
              </div>
            </ExplanationCard>
          </Section>

          {/* Symmetric vs Asymmetric */}
          <Section title="Symmetric vs Asymmetric Encryption" id="types">
            <div className="grid md:grid-cols-2 gap-6">
              <ExplanationCard>
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Symmetric Encryption</h3>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-2xl">👤</div>
                    <p className="text-xs mt-2">Alice</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 h-0.5 bg-yellow-500"></div>
                      <span className="text-yellow-500 text-xl">🔑</span>
                      <div className="flex-1 h-0.5 bg-yellow-500"></div>
                    </div>
                    <p className="text-center text-xs text-omniviz-text-muted mt-2">Same Key</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-2xl">👤</div>
                    <p className="text-xs mt-2">Bob</p>
                  </div>
                </div>
                <p className="text-sm text-omniviz-text-muted mb-4">
                  Both parties share the <span className="text-yellow-400">same secret key</span> for
                  encryption and decryption. Fast and efficient, but requires a secure way to share the key.
                </p>
                <div className="bg-omniviz-bg rounded-lg p-3">
                  <span className="text-xs text-omniviz-text-muted">Examples: </span>
                  <span className="text-xs text-cyan-400">AES, ChaCha20, DES, 3DES</span>
                </div>
              </ExplanationCard>

              <ExplanationCard>
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Asymmetric Encryption</h3>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-2xl">👤</div>
                    <div className="mt-2 flex gap-1 justify-center">
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">pub</span>
                    </div>
                  </div>
                  <div className="flex-1 mx-4 text-center">
                    <div className="text-3xl">📧</div>
                    <p className="text-xs text-omniviz-text-muted mt-1">Encrypted with Bob's public key</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-2xl">👤</div>
                    <div className="mt-2 flex gap-1 justify-center">
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">pub</span>
                      <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">priv</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-omniviz-text-muted mb-4">
                  Two different keys: a <span className="text-green-400">public key</span> for encryption
                  and a <span className="text-red-400">private key</span> for decryption. Solves key distribution!
                </p>
                <div className="bg-omniviz-bg rounded-lg p-3">
                  <span className="text-xs text-omniviz-text-muted">Examples: </span>
                  <span className="text-xs text-purple-400">RSA, ECC, ElGamal</span>
                </div>
              </ExplanationCard>
            </div>
          </Section>

          {/* Hash Functions */}
          <Section title="Hash Functions: One-Way Transformation" id="hash">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    A <span className="text-orange-400 font-semibold">hash function</span> takes any input
                    and produces a fixed-size output (the "digest" or "hash"). Unlike encryption, hashing
                    is <span className="text-red-400">one-way</span> - you cannot reverse it to get the original.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-orange-400 mb-2">Key Properties</h4>
                      <ul className="text-sm text-omniviz-text-muted space-y-2">
                        <li><span className="text-green-400">Deterministic:</span> Same input always produces same output</li>
                        <li><span className="text-blue-400">Fast:</span> Quick to compute for any input size</li>
                        <li><span className="text-purple-400">Avalanche:</span> Small input change = completely different hash</li>
                        <li><span className="text-red-400">Collision resistant:</span> Hard to find two inputs with same hash</li>
                      </ul>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-3">
                      <span className="text-xs text-omniviz-text-muted">Examples: </span>
                      <span className="text-xs text-orange-400">SHA-256, SHA-3, BLAKE3, MD5 (broken)</span>
                    </div>
                  </div>
                </div>
                <HashDemo plaintext={plaintext} />
              </div>
            </ExplanationCard>
          </Section>

          {/* RSA Mathematics */}
          <Section title="RSA: The Mathematics" id="rsa">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6">
                RSA is the foundation of modern secure communication. Its security relies on the difficulty
                of factoring large numbers into their prime components.
              </p>
              <RSADemo />
            </ExplanationCard>
          </Section>

          {/* Digital Signatures */}
          <Section title="Digital Signatures: Proving Authenticity" id="signatures">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    A <span className="text-cyan-400 font-semibold">digital signature</span> proves that a message
                    came from a specific sender and hasn't been altered. It's the digital equivalent of a handwritten
                    signature, but mathematically verifiable.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">How It Works</h4>
                      <ol className="text-sm text-omniviz-text-muted space-y-2">
                        <li>1. <span className="text-orange-400">Hash</span> the message to get a fixed-size digest</li>
                        <li>2. <span className="text-red-400">Encrypt</span> the hash with your private key = signature</li>
                        <li>3. <span className="text-green-400">Verify</span> by decrypting with public key and comparing hashes</li>
                      </ol>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">What It Proves</h4>
                      <ul className="text-sm text-omniviz-text-muted space-y-1">
                        <li>• <span className="text-green-400">Authentication:</span> Message is from claimed sender</li>
                        <li>• <span className="text-blue-400">Integrity:</span> Message wasn't modified</li>
                        <li>• <span className="text-orange-400">Non-repudiation:</span> Sender can't deny sending</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <DigitalSignatureDemo />
              </div>
            </ExplanationCard>
          </Section>

          {/* Hard Problems */}
          <Section title="Hard Problems in Cryptography" id="hard-problems">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Integer Factorization',
                  formula: 'Given n = p × q, find p and q',
                  used: 'RSA',
                  color: 'purple'
                },
                {
                  title: 'Discrete Logarithm',
                  formula: 'Given g^x ≡ h (mod p), find x',
                  used: 'Diffie-Hellman, ElGamal, DSA',
                  color: 'cyan'
                },
                {
                  title: 'Elliptic Curve DLP',
                  formula: 'Given P and Q = kP, find k',
                  used: 'ECDSA, ECDH (smaller keys!)',
                  color: 'green'
                },
              ].map((problem, i) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-omniviz-surface rounded-xl p-6 border border-${problem.color}-500/30`}
                >
                  <h4 className={`font-semibold text-${problem.color}-400 mb-3`}>{problem.title}</h4>
                  <div className="font-mono text-sm bg-omniviz-bg rounded-lg p-3 mb-3 text-omniviz-text border border-omniviz-border">{problem.formula}</div>
                  <p className="text-xs text-omniviz-text-muted">
                    <span className="text-omniviz-text">Used in: </span>{problem.used}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Key Insight */}
          <Section title="The Foundation of Digital Security" id="foundation">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-green-500/30"
            >
              <h3 className="text-xl font-bold text-center mb-4 text-omniviz-text">Why Cryptography Works</h3>
              <p className="text-omniviz-text-muted text-center max-w-3xl mx-auto mb-6">
                All modern cryptography relies on mathematical problems that are easy to compute in one direction
                but computationally infeasible to reverse without special knowledge (the key).
                This asymmetry is what makes secure communication possible over insecure channels.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌐</div>
                  <div className="font-semibold text-omniviz-text">HTTPS</div>
                  <p className="text-sm text-omniviz-text-muted">Secure web browsing</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <div className="font-semibold text-omniviz-text">Messaging</div>
                  <p className="text-sm text-omniviz-text-muted">End-to-end encryption</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💳</div>
                  <div className="font-semibold text-omniviz-text">Payments</div>
                  <p className="text-sm text-omniviz-text-muted">Secure transactions</p>
                </div>
              </div>
            </motion.div>
          </Section>

        </div>
      </div>
    </div>
  )
}

// Reusable Section component
function Section({ title, id, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-12 border-b border-omniviz-border last:border-0"
    >
      {title && (
        <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>
      )}
      {children}
    </motion.section>
  )
}

// Reusable Explanation Card component
function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

// Interactive Encryption Demo
function EncryptionDemo({ plaintext, setPlaintext, keyVal }) {
  const [isEncrypting, setIsEncrypting] = useState(false)
  const [showCipher, setShowCipher] = useState(false)
  const ciphertext = caesarEncrypt(plaintext, keyVal)

  const encrypt = () => {
    setIsEncrypting(true)
    setShowCipher(false)
    setTimeout(() => {
      setShowCipher(true)
      setIsEncrypting(false)
    }, 1000)
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-green-400 mb-4 text-center">Try It Yourself</h4>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-omniviz-text-muted block mb-1">Your Message (Plaintext)</label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => {
              setPlaintext(e.target.value.toUpperCase().slice(0, 12))
              setShowCipher(false)
            }}
            className="w-full px-4 py-3 bg-omniviz-surface rounded-lg border border-omniviz-border font-mono text-xl text-blue-400 text-center"
            maxLength={12}
            placeholder="HELLO"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center"
            animate={{ rotate: isEncrypting ? 360 : 0 }}
            transition={{ duration: 1, repeat: isEncrypting ? Infinity : 0, ease: "linear" }}
          >
            🔐
          </motion.div>
          <div className="text-center">
            <div className="text-xs text-omniviz-text-muted">Key: {keyVal}</div>
            <motion.button
              onClick={encrypt}
              disabled={isEncrypting}
              className="mt-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEncrypting ? 'Encrypting...' : 'Encrypt'}
            </motion.button>
          </div>
        </div>

        <div>
          <label className="text-xs text-omniviz-text-muted block mb-1">Encrypted (Ciphertext)</label>
          <div className="w-full px-4 py-3 bg-omniviz-surface rounded-lg border border-omniviz-border font-mono text-xl text-green-400 text-center min-h-[52px]">
            {showCipher ? ciphertext : (isEncrypting ? '...' : '')}
          </div>
        </div>

        {showCipher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30"
          >
            <span className="text-xl">👁️</span>
            <div className="text-xs">
              <span className="text-red-400 font-semibold">Eve sees: </span>
              <span className="font-mono text-red-400">{ciphertext}</span>
              <span className="text-omniviz-text-muted ml-2">(useless without the key!)</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Caesar Cipher Demo with alphabet wheels
function CaesarCipherDemo({ plaintext, keyVal, setKey }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const shiftedAlphabet = alphabet.map((_, i) => alphabet[(i + keyVal) % 26])
  const ciphertext = caesarEncrypt(plaintext, keyVal)

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-green-400">Shift Value</h4>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="25"
            value={keyVal}
            onChange={(e) => setKey(parseInt(e.target.value))}
            className="w-24 accent-yellow-500"
          />
          <span className="font-mono text-yellow-500 w-6">{keyVal}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs text-omniviz-text-muted">Plain alphabet:</span>
          <div className="flex gap-0.5 mt-1 overflow-x-auto pb-2">
            {alphabet.map((char, i) => (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center text-xs font-mono rounded shrink-0 ${
                  plaintext.includes(char) ? 'bg-blue-500/30 border border-blue-500 text-blue-400' : 'bg-omniviz-surface text-omniviz-text'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-0.5 overflow-x-auto">
          {alphabet.map((_, i) => (
            <div key={i} className="w-7 text-center text-yellow-500 text-xs shrink-0">↓</div>
          ))}
        </div>

        <div>
          <span className="text-xs text-omniviz-text-muted">Cipher alphabet:</span>
          <div className="flex gap-0.5 mt-1 overflow-x-auto pb-2">
            {shiftedAlphabet.map((char, i) => (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center text-xs font-mono rounded shrink-0 ${
                  ciphertext.includes(char) ? 'bg-green-500/30 border border-green-500 text-green-400' : 'bg-omniviz-surface text-omniviz-text'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-omniviz-surface rounded-lg text-center font-mono">
        <span className="text-blue-400">{plaintext}</span>
        <span className="mx-3 text-omniviz-text-muted">→</span>
        <span className="text-green-400">{ciphertext}</span>
      </div>
    </div>
  )
}

// Character Mapping Visualization
function CharacterMapping({ plaintext, keyVal }) {
  return (
    <div className="space-y-4">
      {plaintext.split('').map((char, i) => {
        const encrypted = caesarEncrypt(char, keyVal)
        const originalCode = char.charCodeAt(0) - 65
        const shiftedCode = (originalCode + keyVal) % 26

        if (char < 'A' || char > 'Z') return null

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-mono font-bold text-blue-400">{char}</span>
              <span className="text-[10px] text-omniviz-text-muted">pos: {originalCode}</span>
            </div>

            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-1 bg-omniviz-border rounded relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-yellow-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              </div>
              <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 rounded text-xs font-mono text-yellow-400">
                +{keyVal}
              </div>
              <div className="flex-1 h-1 bg-omniviz-border rounded relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-green-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                />
              </div>
            </div>

            <div className="w-14 h-14 rounded-xl bg-green-500/20 border-2 border-green-500 flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-mono font-bold text-green-400">{encrypted}</span>
              <span className="text-[10px] text-omniviz-text-muted">pos: {shiftedCode}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// Vigenere Cipher Demo
function VigenereCipherDemo({ plaintext, vigKey, setVigKey }) {
  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-omniviz-text-muted">Keyword:</span>
        <input
          type="text"
          value={vigKey}
          onChange={(e) => setVigKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10))}
          className="px-3 py-2 bg-omniviz-surface rounded-lg border border-omniviz-border font-mono text-purple-400"
          maxLength={10}
          placeholder="KEY"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-omniviz-border">
              <th className="p-2 text-left text-omniviz-text">#</th>
              <th className="p-2 text-omniviz-text">Plain</th>
              <th className="p-2 text-omniviz-text">Key</th>
              <th className="p-2 text-omniviz-text">Shift</th>
              <th className="p-2 text-omniviz-text">Result</th>
            </tr>
          </thead>
          <tbody>
            {plaintext.split('').map((char, i) => {
              if (char < 'A' || char > 'Z') return null
              const keyChar = vigKey[i % vigKey.length] || 'A'
              const shift = keyChar.charCodeAt(0) - 65
              const encrypted = vigenereEncrypt(char, keyChar)
              return (
                <tr key={i} className="border-b border-omniviz-border/50">
                  <td className="p-2 text-omniviz-text-muted">{i + 1}</td>
                  <td className="p-2 text-center font-mono text-blue-400">{char}</td>
                  <td className="p-2 text-center font-mono text-purple-400">{keyChar}</td>
                  <td className="p-2 text-center font-mono text-yellow-400">+{shift}</td>
                  <td className="p-2 text-center font-mono text-green-400">{encrypted}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-omniviz-surface rounded-lg text-center">
        <span className="text-xs text-omniviz-text-muted">Result: </span>
        <span className="font-mono text-green-400">{vigenereEncrypt(plaintext, vigKey)}</span>
      </div>
    </div>
  )
}

// Hash Demo
function HashDemo({ plaintext }) {
  const [testInput, setTestInput] = useState(plaintext)
  const hash1 = simpleHash(testInput)
  const hash2 = simpleHash(testInput + 'x')

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-orange-400 mb-4">Hash Demo</h4>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-omniviz-text-muted block mb-1">Input</label>
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="w-full px-3 py-2 bg-omniviz-surface rounded-lg border border-omniviz-border font-mono text-omniviz-text"
            placeholder="Type anything..."
          />
        </div>

        <div className="p-3 bg-omniviz-surface rounded-lg">
          <div className="text-xs text-omniviz-text-muted mb-1">Hash of "{testInput}"</div>
          <div className="font-mono text-orange-400">{hash1}</div>
        </div>

        <div className="p-3 bg-omniviz-surface rounded-lg">
          <div className="text-xs text-omniviz-text-muted mb-1">Hash of "{testInput}x" (one char added)</div>
          <div className="font-mono text-orange-400">{hash2}</div>
        </div>

        <p className="text-xs text-omniviz-text-muted text-center">
          Notice how adding just one character completely changes the hash! (Avalanche effect)
        </p>
      </div>
    </div>
  )
}

// RSA Demo
function RSADemo() {
  const p = 61
  const q = 53
  const n = p * q
  const phi = (p - 1) * (q - 1)
  const e = 17

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x
    }
    return 1
  }
  const d = modInverse(e, phi)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-omniviz-bg rounded-xl p-5 border border-purple-500/30">
        <h4 className="font-semibold text-purple-400 mb-4">Key Generation</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-omniviz-surface rounded-lg">
              <div className="text-xs text-omniviz-text-muted mb-1">Prime p</div>
              <div className="font-mono text-lg text-purple-400">{p}</div>
            </div>
            <div className="p-3 bg-omniviz-surface rounded-lg">
              <div className="text-xs text-omniviz-text-muted mb-1">Prime q</div>
              <div className="font-mono text-lg text-purple-400">{q}</div>
            </div>
          </div>

          <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
            <div className="text-xs text-omniviz-text-muted mb-1">n = p × q (modulus)</div>
            <div className="font-mono text-lg text-omniviz-text">{n}</div>
          </div>

          <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
            <div className="text-xs text-omniviz-text-muted mb-1">φ(n) = (p-1)(q-1)</div>
            <div className="font-mono text-lg text-omniviz-text">{phi}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="text-xs text-green-400 mb-1">Public key (e, n)</div>
              <div className="font-mono text-sm text-green-400">({e}, {n})</div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="text-xs text-red-400 mb-1">Private key (d, n)</div>
              <div className="font-mono text-sm text-red-400">({d}, {n})</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-omniviz-bg rounded-xl p-5 border border-purple-500/30">
        <h4 className="font-semibold text-purple-400 mb-4">Encrypt & Decrypt</h4>
        <div className="space-y-3">
          <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
            <div className="text-xs text-omniviz-text-muted mb-1">Encryption formula</div>
            <div className="font-mono text-sm text-omniviz-text">c = m<sup>e</sup> mod n</div>
          </div>

          <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
            <div className="text-xs text-omniviz-text-muted mb-1">Decryption formula</div>
            <div className="font-mono text-sm text-omniviz-text">m = c<sup>d</sup> mod n</div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
            <h5 className="text-sm font-semibold mb-2">Why is it secure?</h5>
            <p className="text-xs text-omniviz-text-muted">
              Finding d from e requires knowing φ(n), which requires factoring n into p and q.
              For large primes (2048+ bits), factoring is computationally infeasible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Digital Signature Demo
function DigitalSignatureDemo() {
  const [message, setMessage] = useState('Hello, World!')
  const [isSigning, setIsSigning] = useState(false)
  const [signature, setSignature] = useState(null)
  const [verified, setVerified] = useState(null)

  const sign = () => {
    setIsSigning(true)
    setSignature(null)
    setVerified(null)

    setTimeout(() => {
      // Generate a mock signature based on the message
      const hash = simpleHash(message)
      const sig = 'SIG_' + hash.slice(0, 12)
      setSignature(sig)
      setIsSigning(false)
    }, 800)
  }

  const verify = () => {
    // Verify by checking if signature matches expected
    const expectedHash = simpleHash(message)
    const expectedSig = 'SIG_' + expectedHash.slice(0, 12)
    setVerified(signature === expectedSig)
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-cyan-400 mb-4">Digital Signature Demo</h4>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-omniviz-text-muted block mb-1">Message to sign</label>
          <input
            type="text"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setSignature(null); setVerified(null); }}
            className="w-full px-3 py-2 bg-omniviz-surface rounded-lg border border-omniviz-border font-mono text-sm text-omniviz-text"
            placeholder="Enter message..."
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-lg bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-xl mb-1">
              🔐
            </div>
            <span className="text-xs text-red-400">Private Key</span>
          </div>
          <motion.button
            onClick={sign}
            disabled={isSigning}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSigning ? 'Signing...' : 'Sign Message'}
          </motion.button>
        </div>

        {signature && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-3 bg-omniviz-surface rounded-lg mb-3">
              <div className="text-xs text-omniviz-text-muted mb-1">Digital Signature</div>
              <div className="font-mono text-sm text-cyan-400">{signature}</div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-xl mb-1">
                  🔓
                </div>
                <span className="text-xs text-green-400">Public Key</span>
              </div>
              <button
                onClick={verify}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
              >
                Verify Signature
              </button>
            </div>
          </motion.div>
        )}

        {verified !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg border ${
              verified
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{verified ? '✓' : '✗'}</span>
              <span className={verified ? 'text-green-400' : 'text-red-400'}>
                {verified ? 'Signature Valid - Message is authentic!' : 'Signature Invalid - Message may be tampered!'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CryptographyConcept
