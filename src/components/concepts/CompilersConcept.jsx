import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

// Token types with colors
const TOKEN_COLORS = {
  KEYWORD: '#c084fc',
  IDENT: '#60a5fa',
  NUMBER: '#4ade80',
  OPERATOR: '#fbbf24',
  ASSIGN: '#f97316',
  LPAREN: '#94a3b8',
  RPAREN: '#94a3b8',
  SEMICOLON: '#94a3b8',
  STRING: '#fb923c',
}

// Simple tokenizer
function tokenize(code) {
  const tokens = []
  const keywords = ['if', 'else', 'while', 'for', 'return', 'function', 'let', 'const', 'var']
  const regex = /(\s+)|(\d+\.?\d*)|([a-zA-Z_]\w*)|([+\-*/%])|([=<>!]=?)|([(){}[\];,])|(".*?")|(.)/g

  let match
  while ((match = regex.exec(code)) !== null) {
    if (match[1]) continue // Skip whitespace
    if (match[2]) tokens.push({ type: 'NUMBER', value: match[2], color: TOKEN_COLORS.NUMBER })
    else if (match[3]) {
      const isKeyword = keywords.includes(match[3])
      tokens.push({
        type: isKeyword ? 'KEYWORD' : 'IDENT',
        value: match[3],
        color: isKeyword ? TOKEN_COLORS.KEYWORD : TOKEN_COLORS.IDENT
      })
    }
    else if (match[4]) tokens.push({ type: 'OPERATOR', value: match[4], color: TOKEN_COLORS.OPERATOR })
    else if (match[5]) tokens.push({ type: match[5].includes('=') ? 'ASSIGN' : 'OPERATOR', value: match[5], color: TOKEN_COLORS.ASSIGN })
    else if (match[6]) {
      const char = match[6]
      const type = char === '(' ? 'LPAREN' : char === ')' ? 'RPAREN' : char === ';' ? 'SEMICOLON' : 'PUNCT'
      tokens.push({ type, value: char, color: TOKEN_COLORS[type] || '#94a3b8' })
    }
    else if (match[7]) tokens.push({ type: 'STRING', value: match[7], color: TOKEN_COLORS.STRING })
  }
  return tokens
}

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
      {title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}
      {children}
    </motion.section>
  )
}

function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

function CompilersConcept() {
  const [code, setCode] = useState('let x = 2 + 3 * 4;')
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    setTokens(tokenize(code))
  }, [code])

  return (
    <div className="min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Compilers" color="pink" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <Section id="intro">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"
            >
              Compilers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
            >
              Transforming human-readable code into machine instructions through a series of sophisticated analysis and transformation phases.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">What is a Compiler?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  A compiler is a program that translates source code written in a high-level programming language (like C, Java, or Python) into low-level machine code that a computer's processor can execute directly.
                </p>
                <p>
                  Unlike interpreters that execute code line by line, compilers translate the entire program before execution, enabling significant optimizations and faster runtime performance.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-pink-400 font-semibold mb-2">Key Benefits:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Early error detection during compilation</li>
                    <li>• Optimized machine code for faster execution</li>
                    <li>• Type checking and semantic validation</li>
                    <li>• Platform-specific code generation</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">The Compilation Pipeline</h3>
              <div className="space-y-3">
                {[
                  { phase: 'Lexical Analysis', desc: 'Breaking code into tokens', icon: '📝', color: 'blue' },
                  { phase: 'Syntax Analysis', desc: 'Building Abstract Syntax Tree', icon: '🌳', color: 'purple' },
                  { phase: 'Semantic Analysis', desc: 'Type checking & validation', icon: '✓', color: 'cyan' },
                  { phase: 'IR Generation', desc: 'Creating intermediate code', icon: '🔄', color: 'yellow' },
                  { phase: 'Optimization', desc: 'Improving performance', icon: '⚡', color: 'orange' },
                  { phase: 'Code Generation', desc: 'Producing machine code', icon: '⚙️', color: 'green' },
                ].map((item, i) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className={`text-sm font-semibold text-${item.color}-400`}>{item.phase}</div>
                      <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ExplanationCard>
          </div>
        </Section>

        {/* Interactive Compiler Demo */}
        <Section title="Interactive Compilation Demo" id="demo">
          <div className="grid md:grid-cols-2 gap-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">How It Works</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Try typing code in the editor to see how the compiler processes it in real-time. Watch as your source code is broken down into tokens and transformed through the compilation pipeline.
                </p>
                <p>
                  The demo shows a simplified version of the compilation process, but real compilers follow the same fundamental steps with much more complexity and optimization.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-pink-400 font-semibold mb-2">Sample Programs:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Simple', code: 'let x = 2 + 3 * 4;' },
                      { name: 'If-Else', code: 'if (x > 10) { y = 1; } else { y = 0; }' },
                      { name: 'Function', code: 'function add(a, b) { return a + b; }' },
                      { name: 'Loop', code: 'for (let i = 0; i < 10; i = i + 1) { sum = sum + i; }' },
                    ].map(prog => (
                      <button
                        key={prog.name}
                        onClick={() => setCode(prog.code)}
                        className="px-3 py-1.5 text-sm bg-omniviz-surface rounded-lg hover:bg-omniviz-border transition-colors border border-omniviz-border"
                      >
                        {prog.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ExplanationCard>

            <div className="bg-omniviz-surface rounded-2xl border border-omniviz-border overflow-hidden">
              <div className="bg-omniviz-bg px-4 py-2 border-b border-omniviz-border flex items-center justify-between">
                <span className="text-pink-400 text-sm font-semibold">Source Code Editor</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 bg-transparent p-4 font-mono text-sm focus:outline-none resize-none text-omniviz-text"
                spellCheck={false}
              />
              <div className="px-4 pb-4">
                <div className="text-xs text-omniviz-text-muted mb-2">Live Token Preview:</div>
                <div className="flex flex-wrap gap-1">
                  {tokens.slice(0, 15).map((token, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{ backgroundColor: `${token.color}20`, color: token.color }}
                    >
                      {token.value}
                    </motion.span>
                  ))}
                  {tokens.length > 15 && (
                    <span className="text-omniviz-text-muted text-xs px-2">+{tokens.length - 15} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Lexical Analysis Section */}
        <Section title="Lexical Analysis (Tokenization)" id="lexer">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Breaking Code into Tokens</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The lexer (or scanner) is the first phase of compilation. It reads the raw source code character by character and groups them into meaningful units called <span className="text-blue-400 font-semibold">tokens</span>.
                </p>
                <p>
                  Each token has a type (like KEYWORD, IDENTIFIER, NUMBER) and a value. This process removes whitespace and comments while preserving the meaningful structure of the code.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-blue-400 font-semibold mb-3">Lexer Regular Expressions:</div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-purple-400">NUMBER:</span> <span className="text-green-400">/\d+\.?\d*/</span>
                    </div>
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-blue-400">IDENT:</span> <span className="text-green-400">/[a-zA-Z_]\w*/</span>
                    </div>
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-yellow-400">OPERATOR:</span> <span className="text-green-400">/[+\-*\/%]/</span>
                    </div>
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-orange-400">STRING:</span> <span className="text-green-400">/"[^"]*"/</span>
                    </div>
                  </div>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Token Categories</h3>
              <div className="space-y-3">
                {[
                  { type: 'KEYWORD', examples: ['let', 'if', 'for', 'function'], color: TOKEN_COLORS.KEYWORD },
                  { type: 'IDENTIFIER', examples: ['x', 'sum', 'myVar'], color: TOKEN_COLORS.IDENT },
                  { type: 'NUMBER', examples: ['42', '3.14', '0'], color: TOKEN_COLORS.NUMBER },
                  { type: 'OPERATOR', examples: ['+', '-', '*', '/'], color: TOKEN_COLORS.OPERATOR },
                  { type: 'ASSIGNMENT', examples: ['=', '==', '!='], color: TOKEN_COLORS.ASSIGN },
                ].map(cat => (
                  <div
                    key={cat.type}
                    className="flex items-center gap-3 p-3 rounded-lg bg-omniviz-bg"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: cat.color }}>
                        {cat.type}
                      </div>
                      <div className="text-xs text-omniviz-text-muted">
                        {cat.examples.map((ex, i) => (
                          <span key={ex}>
                            <code className="font-mono">{ex}</code>
                            {i < cat.examples.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ExplanationCard>
          </div>

          {/* Token Stream Visualization */}
          <ExplanationCard>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Character Stream → Token Stream</h3>
            <div className="mb-6">
              <div className="text-xs text-omniviz-text-muted mb-2">Source Code (Character Stream)</div>
              <div className="p-4 bg-omniviz-bg rounded-lg font-mono text-sm flex flex-wrap text-omniviz-text">
                {code.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.01 }}
                    className={char === ' ' ? 'w-2' : ''}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex justify-center my-6">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-pink-400"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>

            <div className="text-xs text-omniviz-text-muted mb-2">Token Stream</div>
            <div className="flex flex-wrap gap-2">
              {tokens.map((token, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div
                    className="px-3 py-2 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105"
                    style={{
                      borderColor: token.color,
                      backgroundColor: `${token.color}20`,
                    }}
                  >
                    <div className="font-mono text-sm" style={{ color: token.color }}>
                      {token.value}
                    </div>
                    <div className="text-[10px] text-omniviz-text-muted">{token.type}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ExplanationCard>
        </Section>

        {/* Syntax Analysis (Parser) Section */}
        <Section title="Syntax Analysis (Parsing)" id="parser">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Building the Abstract Syntax Tree</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The parser takes the stream of tokens from the lexer and constructs an <span className="text-purple-400 font-semibold">Abstract Syntax Tree (AST)</span> that represents the hierarchical structure of the program.
                </p>
                <p>
                  The AST captures the grammatical structure while abstracting away details like parentheses and semicolons. Each node in the tree represents a construct in the source code.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-purple-400 font-semibold mb-2">Parser Responsibilities:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Verify code follows grammar rules</li>
                    <li>• Handle operator precedence</li>
                    <li>• Report syntax errors</li>
                    <li>• Build tree structure for analysis</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Grammar Rules (BNF)</h3>
              <div className="font-mono text-xs space-y-2">
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">program</span> ::= statement*
                </div>
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">statement</span> ::= varDecl | exprStmt | ifStmt
                </div>
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">varDecl</span> ::= "let" IDENT "=" expr ";"
                </div>
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">expr</span> ::= term (("+"|"-") term)*
                </div>
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">term</span> ::= factor (("*"|"/") factor)*
                </div>
                <div className="p-2 bg-omniviz-bg rounded">
                  <span className="text-purple-400">factor</span> ::= NUMBER | IDENT | "(" expr ")"
                </div>
              </div>
              <p className="text-sm text-omniviz-text-muted mt-4">
                The grammar rules define how tokens can be combined to form valid programs. The parser uses these rules to build the AST.
              </p>
            </ExplanationCard>
          </div>

          {/* AST Visualization */}
          <ExplanationCard>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">AST for: let x = 2 + 3 * 4</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <svg className="w-full h-80" viewBox="0 0 400 300">
                  {/* Program root */}
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <circle cx="200" cy="30" r="25" fill="#ec489930" stroke="#ec4899" strokeWidth="2" />
                    <text x="200" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ec4899" fontSize="10">Program</text>
                  </motion.g>

                  {/* VariableDeclaration */}
                  <line x1="200" y1="55" x2="200" y2="80" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <circle cx="200" cy="100" r="25" fill="#a855f730" stroke="#a855f7" strokeWidth="2" />
                    <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="#a855f7" fontSize="8">VarDecl</text>
                  </motion.g>

                  {/* Identifier x */}
                  <line x1="180" y1="120" x2="100" y2="160" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                    <circle cx="100" cy="180" r="20" fill="#3b82f630" stroke="#3b82f6" strokeWidth="2" />
                    <text x="100" y="180" textAnchor="middle" dominantBaseline="middle" fill="#3b82f6" fontSize="12">x</text>
                  </motion.g>

                  {/* BinaryExpression + */}
                  <line x1="220" y1="120" x2="280" y2="160" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                    <circle cx="280" cy="180" r="20" fill="#f9731630" stroke="#f97316" strokeWidth="2" />
                    <text x="280" y="180" textAnchor="middle" dominantBaseline="middle" fill="#f97316" fontSize="16">+</text>
                  </motion.g>

                  {/* Number 2 */}
                  <line x1="265" y1="195" x2="220" y2="230" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                    <circle cx="220" cy="250" r="18" fill="#22c55e30" stroke="#22c55e" strokeWidth="2" />
                    <text x="220" y="250" textAnchor="middle" dominantBaseline="middle" fill="#22c55e" fontSize="14">2</text>
                  </motion.g>

                  {/* BinaryExpression * */}
                  <line x1="295" y1="195" x2="340" y2="230" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                    <circle cx="340" cy="250" r="18" fill="#f9731630" stroke="#f97316" strokeWidth="2" />
                    <text x="340" y="250" textAnchor="middle" dominantBaseline="middle" fill="#f97316" fontSize="16">*</text>
                  </motion.g>

                  {/* Number 3 */}
                  <line x1="328" y1="265" x2="310" y2="280" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                    <circle cx="310" cy="290" r="12" fill="#22c55e30" stroke="#22c55e" strokeWidth="2" />
                    <text x="310" y="290" textAnchor="middle" dominantBaseline="middle" fill="#22c55e" fontSize="12">3</text>
                  </motion.g>

                  {/* Number 4 */}
                  <line x1="352" y1="265" x2="370" y2="280" stroke="#374151" strokeWidth="2" />
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                    <circle cx="370" cy="290" r="12" fill="#22c55e30" stroke="#22c55e" strokeWidth="2" />
                    <text x="370" y="290" textAnchor="middle" dominantBaseline="middle" fill="#22c55e" fontSize="12">4</text>
                  </motion.g>
                </svg>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-omniviz-bg rounded-lg">
                  <p className="text-pink-400 font-semibold mb-2">Operator Precedence</p>
                  <p className="text-sm text-omniviz-text-muted">
                    <code className="text-yellow-400">*</code> binds tighter than <code className="text-yellow-400">+</code>, so the expression is parsed as:
                  </p>
                  <p className="font-mono text-lg mt-2 text-center">
                    <span className="text-green-400">2</span> <span className="text-orange-400">+</span> <span className="text-omniviz-text-muted">(</span><span className="text-green-400">3</span> <span className="text-orange-400">*</span> <span className="text-green-400">4</span><span className="text-omniviz-text-muted">)</span> = <span className="text-cyan-400">14</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-3">AST Node Types</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: 'Program', color: '#ec4899' },
                      { type: 'VarDecl', color: '#a855f7' },
                      { type: 'BinaryExpr', color: '#f97316' },
                      { type: 'Identifier', color: '#3b82f6' },
                      { type: 'NumLiteral', color: '#22c55e' },
                      { type: 'FuncDecl', color: '#06b6d4' },
                    ].map(item => (
                      <div key={item.type} className="flex items-center gap-2 p-2 bg-omniviz-bg rounded">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs" style={{ color: item.color }}>{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ExplanationCard>
        </Section>

        {/* Semantic Analysis Section */}
        <Section title="Semantic Analysis: Making Sense of Code" id="semantic">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Beyond Syntax: Understanding Meaning</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The parser ensures code is <em>grammatically</em> correct, but <span className="text-cyan-400 font-semibold">semantic analysis</span> checks if it makes <em>sense</em>.
                  You can write "colorless green ideas sleep furiously" - it's grammatically correct but meaningless.
                </p>
                <p>
                  Similarly, <code className="text-yellow-400">let x = "hello" + 5</code> might parse fine, but is it valid?
                  That depends on the language's type rules.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">Semantic Checks:</div>
                  <ul className="text-sm space-y-1">
                    <li>• <span className="text-blue-400">Type checking:</span> Are operations valid for these types?</li>
                    <li>• <span className="text-green-400">Scope resolution:</span> Is this variable declared?</li>
                    <li>• <span className="text-purple-400">Function calls:</span> Right number of arguments?</li>
                    <li>• <span className="text-orange-400">Control flow:</span> Is there a return statement?</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Symbol Table</h3>
              <div className="space-y-4">
                <p className="text-sm text-omniviz-text-muted">
                  The compiler builds a <span className="text-yellow-400 font-semibold">symbol table</span> to track
                  all declared variables, functions, and their types as it analyzes the code.
                </p>
                <SymbolTableDemo />
              </div>
            </ExplanationCard>
          </div>

          <TypeCheckingDemo />
        </Section>

        {/* Code Generation Section */}
        <Section title="Code Generation" id="codegen">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">From AST to Machine Code</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The code generator traverses the AST and produces executable code. Modern compilers typically go through an <span className="text-yellow-400 font-semibold">Intermediate Representation (IR)</span> before generating final machine code.
                </p>
                <p>
                  The IR allows for machine-independent optimizations and makes it easier to target multiple platforms from the same frontend.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-green-400 font-semibold mb-2">Code Generation Steps:</div>
                  <ul className="text-sm space-y-1">
                    <li>1. Generate IR from AST</li>
                    <li>2. Apply machine-independent optimizations</li>
                    <li>3. Allocate registers</li>
                    <li>4. Generate target assembly/machine code</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Intermediate Representation</h3>
              <div className="space-y-3">
                {[
                  { ir: 't1 = 3 * 4', desc: 'Multiply 3 × 4 → 12' },
                  { ir: 't2 = 2 + t1', desc: 'Add 2 + 12 → 14' },
                  { ir: 'x = t2', desc: 'Store result in x' },
                ].map((inst, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-omniviz-bg font-mono text-sm text-omniviz-text"
                  >
                    <div className="text-yellow-400">{inst.ir}</div>
                    <div className="text-xs text-omniviz-text-muted mt-1">{inst.desc}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-omniviz-text-muted mt-4">
                Three-Address Code: Each instruction has at most three operands, making it easy to translate to assembly.
              </p>
            </ExplanationCard>
          </div>

          <CodeGenDemo />
        </Section>

        {/* Optimizations Section */}
        <Section title="Compiler Optimizations" id="optimizations">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Why Optimize?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Compiler optimizations transform code to make it run faster or use less memory while preserving its behavior. These transformations happen automatically during compilation.
                </p>
                <p>
                  Good compilers can often produce code that runs faster than hand-written assembly because they can analyze the entire program and apply sophisticated transformations.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-orange-400 font-semibold mb-2">Optimization Levels:</div>
                  <ul className="text-sm space-y-1">
                    <li><code className="text-cyan-400">-O0</code>: No optimization (fast compile)</li>
                    <li><code className="text-cyan-400">-O1</code>: Basic optimizations</li>
                    <li><code className="text-cyan-400">-O2</code>: Standard optimizations</li>
                    <li><code className="text-cyan-400">-O3</code>: Aggressive optimizations</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <div className="space-y-4">
              {[
                { name: 'Constant Folding', before: 'x = 2 + 3', after: 'x = 5', desc: 'Evaluate constant expressions at compile time' },
                { name: 'Dead Code Elimination', before: 'x = 1; x = 2;', after: 'x = 2;', desc: 'Remove unreachable or unused code' },
                { name: 'Common Subexpression', before: 'a*b + a*b', after: 't=a*b; t+t', desc: 'Compute once and reuse result' },
              ].map((opt, i) => (
                <motion.div
                  key={opt.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface p-5 rounded-xl border border-omniviz-border"
                >
                  <div className="text-sm font-semibold text-orange-400 mb-2">{opt.name}</div>
                  <div className="flex items-center gap-3 text-sm font-mono mb-2">
                    <span className="text-red-400 line-through">{opt.before}</span>
                    <span className="text-omniviz-text-muted">→</span>
                    <span className="text-green-400">{opt.after}</span>
                  </div>
                  <div className="text-xs text-omniviz-text-muted">{opt.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Summary Section */}
        <Section title="The Complete Picture" id="summary">
          <ExplanationCard>
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">From Source to Execution</h3>
              <p className="text-omniviz-text-muted">
                A compiler transforms your high-level code through multiple stages, each adding structure and removing abstraction.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { stage: 'Source Code', icon: '📝', color: 'blue' },
                { stage: 'Tokens', icon: '🔤', color: 'purple' },
                { stage: 'AST', icon: '🌳', color: 'cyan' },
                { stage: 'IR', icon: '🔄', color: 'yellow' },
                { stage: 'Optimized IR', icon: '⚡', color: 'orange' },
                { stage: 'Machine Code', icon: '⚙️', color: 'green' },
              ].map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className={`bg-omniviz-surface p-4 rounded-xl border border-omniviz-border text-center min-w-[100px]`}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className={`text-sm font-semibold text-${item.color}-400`}>{item.stage}</div>
                  </div>
                  {i < 5 && (
                    <svg className="w-6 h-6 text-omniviz-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/30">
              <p className="text-omniviz-text-muted text-center">
                <span className="text-pink-400 font-semibold">Key Insight:</span> Compilers bridge the gap between human thought and machine execution, enabling us to write expressive code while achieving near-optimal performance.
              </p>
            </div>
          </ExplanationCard>
        </Section>
      </div>
    </div>
  )
}

// Animated Code Generation Demo Component
function CodeGenDemo() {
  const [activeStep, setActiveStep] = useState(0)

  const instructions = [
    { ir: 't1 = 3 * 4', asm: 'MOV R1, #3\nMOV R2, #4\nMUL R1, R1, R2', desc: 'Multiply 3 × 4', registers: { R0: 0, R1: 12, R2: 4 } },
    { ir: 't2 = 2 + t1', asm: 'MOV R0, #2\nADD R0, R0, R1', desc: 'Add 2 + 12', registers: { R0: 14, R1: 12, R2: 4 } },
    { ir: 'x = t2', asm: 'STR R0, [x]', desc: 'Store result in x', registers: { R0: 14, R1: 12, R2: 4, x: 14 } },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % instructions.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <ExplanationCard>
      <h3 className="text-lg font-semibold text-cyan-400 mb-6">CPU Execution Simulation</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {/* IR Code */}
        <div>
          <h4 className="text-sm font-semibold text-yellow-400 mb-3">Intermediate Representation</h4>
          <div className="space-y-2">
            {instructions.map((inst, i) => (
              <motion.div
                key={i}
                className={`p-3 rounded-lg font-mono text-sm transition-all ${
                  activeStep === i
                    ? 'bg-yellow-500/20 border-2 border-yellow-500'
                    : 'bg-omniviz-bg border border-transparent'
                }`}
                animate={activeStep === i ? { scale: [1, 1.02, 1] } : {}}
              >
                <div className="text-yellow-400">{inst.ir}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Assembly Code */}
        <div>
          <h4 className="text-sm font-semibold text-green-400 mb-3">Assembly Output</h4>
          <div className="space-y-2">
            {instructions.map((inst, i) => (
              <motion.div
                key={i}
                className={`p-3 rounded-lg font-mono text-xs transition-all ${
                  activeStep === i
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-omniviz-bg border border-transparent'
                }`}
              >
                <pre className="text-green-400 whitespace-pre-wrap">{inst.asm}</pre>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CPU State */}
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 mb-3">CPU Registers</h4>
          <div className="space-y-2">
            {['R0', 'R1', 'R2'].map(reg => {
              const value = instructions[activeStep]?.registers[reg] ?? 0
              return (
                <div key={reg} className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-omniviz-bg rounded flex items-center justify-center font-mono text-sm border border-omniviz-border text-omniviz-text">
                    {reg}
                  </div>
                  <div className="flex-1 h-10 bg-omniviz-bg rounded flex items-center px-4 font-mono border border-omniviz-border text-omniviz-text">
                    <motion.span
                      key={`${reg}-${value}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-cyan-400"
                    >
                      {value}
                    </motion.span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">Memory</h4>
            <div className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
              <span className="font-mono text-blue-400">x:</span>
              <motion.span
                key={instructions[activeStep]?.registers.x}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-purple-400"
              >
                {instructions[activeStep]?.registers.x ?? '?'}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg">
        <div className="text-xs text-omniviz-text-muted">
          <span className="text-pink-400 font-semibold">Current Operation: </span>
          {instructions[activeStep]?.desc}
        </div>
      </div>
    </ExplanationCard>
  )
}

// Symbol Table Demo
function SymbolTableDemo() {
  const symbols = [
    { name: 'x', type: 'number', scope: 'global', value: '14' },
    { name: 'add', type: 'function', scope: 'global', value: '(a, b) -> number' },
    { name: 'a', type: 'number', scope: 'add', value: 'param' },
    { name: 'b', type: 'number', scope: 'add', value: 'param' },
  ]

  return (
    <div className="bg-omniviz-bg rounded-lg overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-omniviz-surface">
          <tr>
            <th className="p-2 text-left text-yellow-400">Name</th>
            <th className="p-2 text-left text-blue-400">Type</th>
            <th className="p-2 text-left text-green-400">Scope</th>
            <th className="p-2 text-left text-purple-400">Info</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map((sym, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-omniviz-border"
            >
              <td className="p-2 font-mono text-yellow-400">{sym.name}</td>
              <td className="p-2 text-blue-400">{sym.type}</td>
              <td className="p-2 text-green-400">{sym.scope}</td>
              <td className="p-2 text-omniviz-text-muted">{sym.value}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Type Checking Demo
function TypeCheckingDemo() {
  const examples = [
    { code: 'let x: number = 5', valid: true, reason: 'Number assigned to number variable' },
    { code: 'let y: string = "hello"', valid: true, reason: 'String assigned to string variable' },
    { code: 'let z: number = "oops"', valid: false, reason: 'Type mismatch: string to number' },
    { code: 'let w = x + y', valid: false, reason: 'Cannot add number and string' },
    { code: 'add(1, 2, 3)', valid: false, reason: 'Too many arguments (expected 2)' },
    { code: 'let v = unknownVar', valid: false, reason: 'Variable not declared in scope' },
  ]

  return (
    <ExplanationCard>
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Type Checking in Action</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {examples.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-3 rounded-lg border ${
              ex.valid
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg ${ex.valid ? 'text-green-400' : 'text-red-400'}`}>
                {ex.valid ? '✓' : '✗'}
              </span>
              <code className="text-xs font-mono text-omniviz-text">{ex.code}</code>
            </div>
            <p className="text-xs text-omniviz-text-muted">{ex.reason}</p>
          </motion.div>
        ))}
      </div>
    </ExplanationCard>
  )
}

export default CompilersConcept
