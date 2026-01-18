import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

// Sample data
const USERS_DATA = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com', department_id: 1 },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com', department_id: 2 },
  { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com', department_id: 1 },
  { id: 4, name: 'Diana', age: 28, email: 'diana@example.com', department_id: 3 },
  { id: 5, name: 'Eve', age: 35, email: 'eve@example.com', department_id: 2 },
]

const DEPARTMENTS_DATA = [
  { id: 1, name: 'Engineering', budget: 500000 },
  { id: 2, name: 'Marketing', budget: 200000 },
  { id: 3, name: 'Sales', budget: 300000 },
]

function DatabasesConcept() {
  const [query, setQuery] = useState('SELECT * FROM users WHERE age > 21')
  const [queryResult, setQueryResult] = useState(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionPlan, setExecutionPlan] = useState([])
  const [executionTime, setExecutionTime] = useState(null)

  // Simple query executor
  const executeQuery = () => {
    setIsExecuting(true)
    setExecutionPlan([])
    setQueryResult(null)

    const steps = [
      { step: 'Parse', desc: 'Parsing SQL syntax...' },
      { step: 'Validate', desc: 'Checking table and column names...' },
      { step: 'Optimize', desc: 'Creating execution plan...' },
      { step: 'Execute', desc: 'Scanning table data...' },
      { step: 'Return', desc: 'Formatting results...' },
    ]

    steps.forEach((s, i) => {
      setTimeout(() => {
        setExecutionPlan(prev => [...prev, s])
      }, i * 300)
    })

    setTimeout(() => {
      let results = [...USERS_DATA]
      const lowerQuery = query.toLowerCase()

      if (lowerQuery.includes('where')) {
        const whereMatch = query.match(/where\s+(\w+)\s*(>|<|=|>=|<=)\s*(\d+|'[^']*')/i)
        if (whereMatch) {
          const [, field, op, value] = whereMatch
          const numValue = parseInt(value) || value.replace(/'/g, '')
          results = results.filter(row => {
            const rowVal = row[field.toLowerCase()]
            switch (op) {
              case '>': return rowVal > numValue
              case '<': return rowVal < numValue
              case '>=': return rowVal >= numValue
              case '<=': return rowVal <= numValue
              case '=': return rowVal == numValue
              default: return true
            }
          })
        }
      }

      if (lowerQuery.includes('order by')) {
        const orderMatch = query.match(/order by\s+(\w+)\s*(asc|desc)?/i)
        if (orderMatch) {
          const [, field, direction] = orderMatch
          results.sort((a, b) => {
            const aVal = a[field.toLowerCase()]
            const bVal = b[field.toLowerCase()]
            return direction?.toLowerCase() === 'desc' ? bVal - aVal : aVal - bVal
          })
        }
      }

      let columns = ['id', 'name', 'age', 'email', 'department_id']
      if (!lowerQuery.includes('select *')) {
        const selectMatch = query.match(/select\s+(.+?)\s+from/i)
        if (selectMatch && !selectMatch[1].includes('*')) {
          columns = selectMatch[1].split(',').map(c => c.trim().toLowerCase())
        }
      }

      if (lowerQuery.includes('count(*)')) {
        setQueryResult({ count: results.length, columns: ['count'], rows: [{ count: results.length }] })
      } else {
        setQueryResult({
          columns,
          rows: results.map(r => {
            const row = {}
            columns.forEach(c => row[c] = r[c])
            return row
          })
        })
      }

      setExecutionTime((Math.random() * 5 + 0.5).toFixed(2))
      setIsExecuting(false)
    }, steps.length * 300 + 200)
  }

  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Database Systems" color="orange" />

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
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Database Systems
              </h1>
              <p className="text-xl text-omniviz-text-muted max-w-2xl mx-auto">
                Efficiently storing, retrieving, and managing structured data at scale
              </p>
            </motion.div>
          </Section>

          {/* What is a Database */}
          <Section title="What is a Database?" id="intro">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    A <span className="text-orange-400 font-semibold">database</span> is an organized collection
                    of structured data stored electronically. A <span className="text-blue-400">Database Management
                    System (DBMS)</span> provides the software to create, query, update, and manage this data.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    Relational databases organize data into <span className="text-green-400">tables</span> with
                    rows and columns. <span className="text-purple-400">SQL</span> (Structured Query Language) is
                    used to interact with the data.
                  </p>
                  <div className="bg-omniviz-bg rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-semibold text-omniviz-accent mb-2">Why Databases?</h4>
                    <p className="text-sm text-omniviz-text-muted">
                      Databases provide persistent storage, concurrent access, data integrity, efficient querying,
                      and recovery from failures - all things that are hard to do with simple files.
                    </p>
                  </div>
                </div>
                <DatabaseStats />
              </div>
            </ExplanationCard>
          </Section>

          {/* ACID Properties */}
          <Section title="ACID Properties" id="acid">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { letter: 'A', name: 'Atomicity', desc: 'All or nothing - transactions either complete fully or not at all', color: 'purple' },
                { letter: 'C', name: 'Consistency', desc: 'Database moves from one valid state to another', color: 'blue' },
                { letter: 'I', name: 'Isolation', desc: 'Concurrent transactions dont interfere with each other', color: 'green' },
                { letter: 'D', name: 'Durability', desc: 'Once committed, data survives crashes and power failures', color: 'orange' },
              ].map((item, i) => (
                <motion.div
                  key={item.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface rounded-xl p-6 border border-omniviz-border"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 border-2 border-${item.color}-500 flex items-center justify-center text-2xl font-bold text-${item.color}-400 mb-3`}>
                    {item.letter}
                  </div>
                  <div className={`font-semibold text-${item.color}-400 mb-2`}>{item.name}</div>
                  <p className="text-sm text-omniviz-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* SQL Query Executor */}
          <Section title="SQL Query Executor" id="sql">
            <ExplanationCard>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-omniviz-text-muted mb-4">
                    <span className="text-purple-400 font-semibold">SQL</span> (Structured Query Language) lets you
                    interact with databases using declarative statements. You describe <em>what</em> you want,
                    not <em>how</em> to get it.
                  </p>
                  <SQLEditor
                    query={query}
                    setQuery={setQuery}
                    executeQuery={executeQuery}
                    isExecuting={isExecuting}
                    queryResult={queryResult}
                    executionTime={executionTime}
                  />
                </div>
                <div>
                  <ExecutionPlanViewer executionPlan={executionPlan} />
                </div>
              </div>
            </ExplanationCard>
          </Section>

          {/* SQL Operations */}
          <Section title="SQL Operations (CRUD)" id="crud">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { op: 'SELECT', desc: 'Read data from tables', color: 'blue', example: 'SELECT * FROM users' },
                { op: 'INSERT', desc: 'Add new rows to tables', color: 'green', example: 'INSERT INTO users...' },
                { op: 'UPDATE', desc: 'Modify existing rows', color: 'yellow', example: 'UPDATE users SET...' },
                { op: 'DELETE', desc: 'Remove rows from tables', color: 'red', example: 'DELETE FROM users...' },
              ].map((item, i) => (
                <motion.div
                  key={item.op}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface p-5 rounded-xl border border-omniviz-border"
                >
                  <div className={`text-2xl font-bold text-${item.color}-400 mb-2`}>{item.op}</div>
                  <p className="text-sm text-omniviz-text-muted mb-3">{item.desc}</p>
                  <code className="text-xs text-omniviz-text-muted font-mono bg-omniviz-bg px-2 py-1 rounded">{item.example}</code>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Tables and Relationships */}
          <Section title="Tables & Relationships" id="tables">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    Relational databases organize data into <span className="text-blue-400 font-semibold">tables</span>.
                    Each table has columns (attributes) and rows (records). Tables are connected through
                    <span className="text-yellow-400"> keys</span>.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">Primary Key (PK)</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Unique identifier for each row. No two rows can have the same primary key value.
                      </p>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Foreign Key (FK)</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        References a primary key in another table, creating a relationship between tables.
                      </p>
                    </div>
                  </div>
                </div>
                <ERDiagram />
              </div>
            </ExplanationCard>
          </Section>

          {/* Table Data Viewer */}
          <Section title="Sample Data" id="data">
            <TableViewer />
          </Section>

          {/* JOINs Section */}
          <Section title="JOINs: Combining Tables" id="joins">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    A <span className="text-purple-400 font-semibold">JOIN</span> combines rows from two or more tables
                    based on a related column. This is how relational databases connect data across tables.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">INNER JOIN</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Returns only rows that have matching values in both tables.
                        <code className="block mt-2 text-xs bg-omniviz-surface p-2 rounded">
                          SELECT * FROM users INNER JOIN departments ON users.department_id = departments.id
                        </code>
                      </p>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">LEFT JOIN</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Returns all rows from the left table, plus matching rows from the right (or NULL if no match).
                      </p>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">RIGHT JOIN</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Returns all rows from the right table, plus matching rows from the left (or NULL if no match).
                      </p>
                    </div>
                  </div>
                </div>
                <JoinVisualizer />
              </div>
            </ExplanationCard>
          </Section>

          {/* B-Tree Index */}
          <Section title="B-Tree Index: Fast Lookups" id="btree">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    Without an index, finding a row requires scanning every row in the table - O(n) complexity.
                    A <span className="text-orange-400 font-semibold">B-Tree index</span> provides O(log n) lookups
                    by organizing data in a balanced tree structure.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-omniviz-bg rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">How It Works</h4>
                      <p className="text-sm text-omniviz-text-muted">
                        Each node contains sorted keys. At each level, we compare and choose which branch to follow.
                        With millions of rows, we only need ~3-4 comparisons to find any value.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-omniviz-surface rounded-lg">
                        <div className="text-lg font-bold text-green-400 font-mono">O(log n)</div>
                        <div className="text-xs text-omniviz-text-muted">Search</div>
                      </div>
                      <div className="p-3 bg-omniviz-surface rounded-lg">
                        <div className="text-lg font-bold text-yellow-400 font-mono">O(log n)</div>
                        <div className="text-xs text-omniviz-text-muted">Insert</div>
                      </div>
                      <div className="p-3 bg-omniviz-surface rounded-lg">
                        <div className="text-lg font-bold text-red-400 font-mono">O(n)</div>
                        <div className="text-xs text-omniviz-text-muted">No Index</div>
                      </div>
                    </div>
                  </div>
                </div>
                <BTreeVisualization />
              </div>
            </ExplanationCard>
          </Section>

          {/* Storage Engine */}
          <Section title="Storage Engine: Disk & Memory" id="storage">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6">
                Data lives on disk but is accessed through memory. The storage engine manages how data
                is organized on disk (pages) and cached in memory (buffer pool) for fast access.
              </p>
              <div className="grid lg:grid-cols-2 gap-6">
                <DiskPages />
                <BufferPool />
              </div>
            </ExplanationCard>
          </Section>

          {/* Performance Metrics */}
          <Section title="Performance: Why It Matters" id="performance">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Page Size', value: '4 KB', desc: 'Optimal for SSDs and caching' },
                { label: 'Buffer Pool', value: '128 MB', desc: 'Hot data stays in RAM' },
                { label: 'Disk Read', value: '~10 ms', desc: 'HDD seek time (SSD: 0.1ms)' },
                { label: 'Memory Read', value: '~100 ns', desc: '100,000x faster than disk!' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface p-5 rounded-xl border border-omniviz-border text-center"
                >
                  <div className="text-2xl font-bold text-orange-400">{item.value}</div>
                  <div className="text-sm font-semibold text-omniviz-text mt-1">{item.label}</div>
                  <div className="text-xs text-omniviz-text-muted mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Summary */}
          <Section title="Key Takeaways" id="summary">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-2xl p-8 border border-orange-500/30"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏗️</div>
                  <div className="font-semibold text-omniviz-text">Structure</div>
                  <p className="text-sm text-omniviz-text-muted">Tables, rows, columns with relationships via keys</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="font-semibold text-omniviz-text">Speed</div>
                  <p className="text-sm text-omniviz-text-muted">Indexes turn O(n) scans into O(log n) lookups</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <div className="font-semibold text-omniviz-text">Safety</div>
                  <p className="text-sm text-omniviz-text-muted">ACID guarantees keep data consistent and durable</p>
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

// Database Stats
function DatabaseStats() {
  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-cyan-400 mb-4">Sample Database</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-surface rounded-lg text-center">
          <div className="text-3xl font-bold text-cyan-400">2</div>
          <div className="text-sm text-omniviz-text-muted">Tables</div>
        </div>
        <div className="p-4 bg-omniviz-surface rounded-lg text-center">
          <div className="text-3xl font-bold text-cyan-400">{USERS_DATA.length}</div>
          <div className="text-sm text-omniviz-text-muted">Users</div>
        </div>
        <div className="p-4 bg-omniviz-surface rounded-lg text-center">
          <div className="text-3xl font-bold text-cyan-400">{DEPARTMENTS_DATA.length}</div>
          <div className="text-sm text-omniviz-text-muted">Departments</div>
        </div>
        <div className="p-4 bg-omniviz-surface rounded-lg text-center">
          <div className="text-3xl font-bold text-cyan-400">3</div>
          <div className="text-sm text-omniviz-text-muted">Indexes</div>
        </div>
      </div>
    </div>
  )
}

// SQL Editor
function SQLEditor({ query, setQuery, executeQuery, isExecuting, queryResult, executionTime }) {
  const sampleQueries = [
    { query: 'SELECT * FROM users WHERE age > 25', desc: 'Age > 25' },
    { query: 'SELECT name, email FROM users', desc: 'Name & Email' },
    { query: 'SELECT * FROM users ORDER BY age DESC', desc: 'Sort by Age' },
    { query: 'SELECT COUNT(*) FROM users', desc: 'Count All' },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-omniviz-bg rounded-xl border border-omniviz-border overflow-hidden">
        <div className="bg-omniviz-surface px-4 py-2 border-b border-omniviz-border flex items-center gap-2">
          <span className="text-orange-400 font-semibold">SQL</span>
          <span className="text-omniviz-text-muted text-sm">Query Editor</span>
        </div>
        <div className="p-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-24 bg-omniviz-surface font-mono text-sm p-4 rounded-lg border border-omniviz-border focus:border-orange-500/50 focus:outline-none resize-none"
            placeholder="Enter SQL query..."
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {sampleQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => setQuery(sq.query)}
                className="px-2 py-1 text-xs bg-omniviz-surface rounded border border-omniviz-border hover:border-orange-500/50 transition-colors"
              >
                {sq.desc}
              </button>
            ))}
          </div>
          <motion.button
            onClick={executeQuery}
            disabled={isExecuting}
            className="mt-4 w-full px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isExecuting ? 'Executing...' : 'Run Query'}
          </motion.button>
        </div>
      </div>

      {queryResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-omniviz-bg rounded-xl border border-omniviz-border overflow-hidden"
        >
          <div className="bg-omniviz-surface px-4 py-2 border-b border-omniviz-border flex justify-between items-center">
            <span className="text-sm text-omniviz-text-muted">Results</span>
            <span className="text-xs text-green-400">{queryResult.rows?.length || 1} row(s) in {executionTime}ms</span>
          </div>
          <div className="overflow-x-auto max-h-48">
            <table className="w-full text-sm">
              <thead className="bg-omniviz-surface sticky top-0">
                <tr>
                  {queryResult.columns?.map(col => (
                    <th key={col} className="px-3 py-2 text-left text-omniviz-text-muted font-mono text-xs">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.rows?.map((row, i) => (
                  <tr key={i} className="border-t border-omniviz-border hover:bg-omniviz-surface/50">
                    {queryResult.columns?.map(col => (
                      <td key={col} className="px-3 py-2 font-mono text-xs">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Execution Plan Viewer
function ExecutionPlanViewer({ executionPlan }) {
  return (
    <div className="bg-omniviz-bg rounded-xl p-4 border border-omniviz-border h-full">
      <h4 className="text-sm font-semibold text-orange-400 mb-3">Execution Plan</h4>
      <div className="space-y-2">
        {executionPlan.length === 0 ? (
          <p className="text-omniviz-text-muted text-sm">Run a query to see the execution plan</p>
        ) : (
          executionPlan.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-xs text-green-400">
                ✓
              </div>
              <div>
                <span className="text-omniviz-text">{step.step}</span>
                <span className="text-omniviz-text-muted ml-2 text-xs">{step.desc}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

// ER Diagram
function ERDiagram() {
  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border relative">
      <h4 className="text-sm font-semibold text-orange-400 mb-4">Entity-Relationship Diagram</h4>
      <div className="relative h-48">
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 140 100 Q 200 100 260 50" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <text x="195" y="70" fill="#9ca3af" fontSize="11">1:N</text>
        </svg>

        {/* Users table */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-36 bg-omniviz-surface rounded-xl border-2 border-blue-500 overflow-hidden">
          <div className="bg-blue-500/20 px-3 py-2 text-sm font-semibold text-blue-400">users</div>
          <div className="p-2 text-xs space-y-1">
            <div className="flex items-center gap-1"><span className="text-yellow-500">🔑</span><span className="text-yellow-400">id</span></div>
            <div className="text-omniviz-text-muted">name</div>
            <div className="text-omniviz-text-muted">age</div>
            <div className="text-omniviz-text-muted">email</div>
            <div className="flex items-center gap-1"><span className="text-blue-400">🔗</span><span className="text-blue-400">department_id</span></div>
          </div>
        </div>

        {/* Departments table */}
        <div className="absolute right-0 top-0 w-36 bg-omniviz-surface rounded-xl border-2 border-green-500 overflow-hidden">
          <div className="bg-green-500/20 px-3 py-2 text-sm font-semibold text-green-400">departments</div>
          <div className="p-2 text-xs space-y-1">
            <div className="flex items-center gap-1"><span className="text-yellow-500">🔑</span><span className="text-yellow-400">id</span></div>
            <div className="text-omniviz-text-muted">name</div>
            <div className="text-omniviz-text-muted">budget</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs text-omniviz-text-muted">
        <div className="flex items-center gap-1"><span className="text-yellow-500">🔑</span> Primary Key</div>
        <div className="flex items-center gap-1"><span className="text-blue-400">🔗</span> Foreign Key</div>
      </div>
    </div>
  )
}

// Table Viewer
function TableViewer() {
  const [selectedTable, setSelectedTable] = useState('users')
  const tables = {
    users: { columns: ['id', 'name', 'age', 'email', 'department_id'], data: USERS_DATA },
    departments: { columns: ['id', 'name', 'budget'], data: DEPARTMENTS_DATA },
  }

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="space-y-2">
        {Object.keys(tables).map(name => (
          <button
            key={name}
            onClick={() => setSelectedTable(name)}
            className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
              selectedTable === name
                ? 'bg-orange-500 text-white'
                : 'bg-omniviz-surface border border-omniviz-border hover:border-orange-500/50'
            }`}
          >
            <div className={`font-semibold ${selectedTable === name ? '' : 'text-omniviz-text'}`}>{name}</div>
            <div className={`text-xs ${selectedTable === name ? 'opacity-75' : 'text-omniviz-text-muted'}`}>{tables[name].data.length} rows</div>
          </button>
        ))}
      </div>
      <div className="md:col-span-3 bg-omniviz-surface rounded-xl border border-omniviz-border overflow-hidden">
        <div className="bg-omniviz-bg px-4 py-2 border-b border-omniviz-border">
          <span className="font-semibold text-orange-400">{selectedTable}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-omniviz-bg">
              <tr>
                {tables[selectedTable].columns.map(col => (
                  <th key={col} className="px-4 py-2 text-left text-omniviz-text-muted font-mono">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tables[selectedTable].data.map((row, i) => (
                <tr key={i} className="border-t border-omniviz-border">
                  {tables[selectedTable].columns.map(col => (
                    <td key={col} className="px-4 py-2 font-mono text-omniviz-text">{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// B-Tree Visualization
function BTreeVisualization() {
  const [searchValue, setSearchValue] = useState(null)
  const [searchPath, setSearchPath] = useState([])

  const searchBTree = (value) => {
    setSearchValue(value)
    setSearchPath([])
    const path = ['root']

    setTimeout(() => setSearchPath(['root']), 100)

    if (value <= 30) {
      setTimeout(() => setSearchPath(['root', 'n1']), 600)
      setTimeout(() => setSearchPath(['root', 'n1', value <= 15 ? 'l1' : 'l2']), 1100)
    } else if (value <= 60) {
      setTimeout(() => setSearchPath(['root', 'n2']), 600)
      setTimeout(() => setSearchPath(['root', 'n2', value <= 45 ? 'l4' : 'l5']), 1100)
    } else {
      setTimeout(() => setSearchPath(['root', 'n3']), 600)
      setTimeout(() => setSearchPath(['root', 'n3', value <= 75 ? 'l7' : 'l8']), 1100)
    }
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-omniviz-text-muted">Search for:</span>
        {[25, 45, 75, 88].map(val => (
          <button
            key={val}
            onClick={() => searchBTree(val)}
            className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
              searchValue === val ? 'bg-orange-500 text-white' : 'bg-omniviz-surface hover:bg-omniviz-surface/80 text-omniviz-text border border-omniviz-border'
            }`}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="relative h-48">
        <svg className="absolute inset-0 w-full h-full">
          {/* Root to level 1 lines */}
          <line x1="50%" y1="20%" x2="20%" y2="50%" stroke={searchPath.includes('n1') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('n1') ? 2 : 1} />
          <line x1="50%" y1="20%" x2="50%" y2="50%" stroke={searchPath.includes('n2') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('n2') ? 2 : 1} />
          <line x1="50%" y1="20%" x2="80%" y2="50%" stroke={searchPath.includes('n3') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('n3') ? 2 : 1} />
          {/* Level 1 to leaves */}
          <line x1="20%" y1="55%" x2="10%" y2="85%" stroke={searchPath.includes('l1') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l1') ? 2 : 1} />
          <line x1="20%" y1="55%" x2="30%" y2="85%" stroke={searchPath.includes('l2') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l2') ? 2 : 1} />
          <line x1="50%" y1="55%" x2="40%" y2="85%" stroke={searchPath.includes('l4') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l4') ? 2 : 1} />
          <line x1="50%" y1="55%" x2="60%" y2="85%" stroke={searchPath.includes('l5') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l5') ? 2 : 1} />
          <line x1="80%" y1="55%" x2="70%" y2="85%" stroke={searchPath.includes('l7') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l7') ? 2 : 1} />
          <line x1="80%" y1="55%" x2="90%" y2="85%" stroke={searchPath.includes('l8') ? '#f97316' : '#374151'} strokeWidth={searchPath.includes('l8') ? 2 : 1} />
        </svg>

        {/* Root */}
        <BTreeNode values={[30, 60]} x={50} y={12} active={searchPath.includes('root')} found={false} />
        {/* Level 1 */}
        <BTreeNode values={[10, 20]} x={20} y={45} active={searchPath.includes('n1')} found={false} />
        <BTreeNode values={[40, 50]} x={50} y={45} active={searchPath.includes('n2')} found={false} />
        <BTreeNode values={[70, 80]} x={80} y={45} active={searchPath.includes('n3')} found={false} />
        {/* Leaves */}
        <BTreeNode values={[5, 8]} x={10} y={80} active={searchPath.includes('l1')} found={searchValue && searchValue <= 10} searchValue={searchValue} />
        <BTreeNode values={[15, 25]} x={30} y={80} active={searchPath.includes('l2')} found={searchValue === 25} searchValue={searchValue} />
        <BTreeNode values={[35, 45]} x={40} y={80} active={searchPath.includes('l4')} found={searchValue === 45} searchValue={searchValue} />
        <BTreeNode values={[55]} x={60} y={80} active={searchPath.includes('l5')} found={false} searchValue={searchValue} />
        <BTreeNode values={[65, 75]} x={70} y={80} active={searchPath.includes('l7')} found={searchValue === 75} searchValue={searchValue} />
        <BTreeNode values={[85, 88]} x={90} y={80} active={searchPath.includes('l8')} found={searchValue === 88} searchValue={searchValue} />
      </div>
    </div>
  )
}

function BTreeNode({ values, x, y, active, found, searchValue }) {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={active ? { scale: [1, 1.1, 1] } : {}}
    >
      <div className={`flex gap-0.5 p-1.5 rounded-lg border-2 transition-colors ${
        active ? 'border-orange-500 bg-orange-500/20' : 'border-omniviz-border bg-omniviz-surface'
      }`}>
        {values.map((val, i) => (
          <div
            key={i}
            className={`w-7 h-5 rounded flex items-center justify-center text-xs font-mono ${
              val === searchValue ? 'bg-green-500 text-white' : active ? 'bg-orange-500/30 text-orange-400' : 'bg-omniviz-bg text-omniviz-text'
            }`}
          >
            {val}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Disk Pages Visualization
function DiskPages() {
  const pages = [
    { id: 0, type: 'header', label: 'Header', usage: 100 },
    { id: 1, type: 'data', label: 'Data 1', usage: 85 },
    { id: 2, type: 'data', label: 'Data 2', usage: 72 },
    { id: 3, type: 'index', label: 'Index', usage: 90 },
    { id: 4, type: 'data', label: 'Data 3', usage: 45 },
    { id: 5, type: 'free', label: 'Free', usage: 0 },
  ]

  return (
    <div className="bg-omniviz-bg rounded-xl p-5 border border-omniviz-border">
      <h4 className="font-semibold text-orange-400 mb-4">Disk Pages (4KB each)</h4>
      <div className="grid grid-cols-3 gap-2">
        {pages.map((page, i) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative h-20 rounded-lg border-2 p-2 ${
              page.type === 'header' ? 'border-yellow-500 bg-yellow-500/10' :
              page.type === 'index' ? 'border-purple-500 bg-purple-500/10' :
              page.type === 'free' ? 'border-gray-500 bg-gray-500/10' :
              'border-blue-500 bg-blue-500/10'
            }`}
          >
            <div className="text-[10px] font-mono text-omniviz-text-muted">P{page.id}</div>
            <div className="text-xs text-omniviz-text">{page.label}</div>
            {page.usage > 0 && (
              <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-omniviz-surface rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    page.type === 'header' ? 'bg-yellow-500' :
                    page.type === 'index' ? 'bg-purple-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${page.usage}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex gap-3 text-xs justify-center flex-wrap">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded border-2 border-yellow-500 bg-yellow-500/20" /><span className="text-omniviz-text-muted">Header</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-500/20" /><span className="text-omniviz-text-muted">Data</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded border-2 border-purple-500 bg-purple-500/20" /><span className="text-omniviz-text-muted">Index</span></div>
      </div>
    </div>
  )
}

// Buffer Pool Visualization
function BufferPool() {
  const bufferItems = [
    { page: 1, status: 'clean', accessCount: 42 },
    { page: 3, status: 'dirty', accessCount: 28 },
    { page: 2, status: 'pinned', accessCount: 89 },
  ]

  return (
    <div className="bg-omniviz-bg rounded-xl p-5 border border-omniviz-border">
      <h4 className="font-semibold text-green-400 mb-4">Buffer Pool (Memory)</h4>
      <div className="space-y-2">
        {bufferItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 bg-omniviz-surface rounded-lg"
          >
            <div className="w-10 h-10 rounded bg-blue-500/20 border border-blue-500 flex items-center justify-center text-sm font-mono text-blue-400">
              P{item.page}
            </div>
            <div className="flex-1">
              <div className="text-sm text-omniviz-text">Page {item.page}</div>
              <div className="text-xs text-omniviz-text-muted">{item.accessCount} accesses</div>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${
              item.status === 'dirty' ? 'bg-yellow-500/20 text-yellow-400' :
              item.status === 'pinned' ? 'bg-purple-500/20 text-purple-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {item.status}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 p-3 bg-omniviz-surface rounded-lg text-xs text-omniviz-text-muted space-y-1">
        <p><span className="text-green-400">Clean:</span> Same as disk</p>
        <p><span className="text-yellow-400">Dirty:</span> Modified, needs flush</p>
        <p><span className="text-purple-400">Pinned:</span> Cannot be evicted</p>
      </div>
    </div>
  )
}

// JOIN Visualizer
function JoinVisualizer() {
  const [joinType, setJoinType] = useState('inner')

  const usersForJoin = [
    { id: 1, name: 'Alice', dept_id: 1 },
    { id: 2, name: 'Bob', dept_id: 2 },
    { id: 3, name: 'Charlie', dept_id: null },
  ]

  const deptsForJoin = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 4, name: 'HR' },
  ]

  const getJoinResult = () => {
    switch (joinType) {
      case 'inner':
        return [
          { user: 'Alice', dept: 'Engineering', matched: true },
          { user: 'Bob', dept: 'Marketing', matched: true },
        ]
      case 'left':
        return [
          { user: 'Alice', dept: 'Engineering', matched: true },
          { user: 'Bob', dept: 'Marketing', matched: true },
          { user: 'Charlie', dept: 'NULL', matched: false },
        ]
      case 'right':
        return [
          { user: 'Alice', dept: 'Engineering', matched: true },
          { user: 'Bob', dept: 'Marketing', matched: true },
          { user: 'NULL', dept: 'HR', matched: false },
        ]
      default:
        return []
    }
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-4">
        {[
          { id: 'inner', label: 'INNER', color: 'blue' },
          { id: 'left', label: 'LEFT', color: 'green' },
          { id: 'right', label: 'RIGHT', color: 'yellow' },
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setJoinType(type.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${
              joinType === type.id
                ? `bg-${type.color}-500 text-white border-${type.color}-500`
                : 'bg-omniviz-surface border-omniviz-border text-omniviz-text hover:border-purple-400'
            }`}
          >
            {type.label} JOIN
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-omniviz-surface rounded-lg">
          <div className="text-xs text-blue-400 font-semibold mb-2">Users</div>
          {usersForJoin.map(u => (
            <div key={u.id} className="text-xs text-omniviz-text-muted">
              {u.name} (dept: {u.dept_id ?? 'NULL'})
            </div>
          ))}
        </div>
        <div className="p-3 bg-omniviz-surface rounded-lg">
          <div className="text-xs text-green-400 font-semibold mb-2">Departments</div>
          {deptsForJoin.map(d => (
            <div key={d.id} className="text-xs text-omniviz-text-muted">
              {d.id}: {d.name}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-omniviz-text-muted mb-2">Result:</div>
      <div className="bg-omniviz-surface rounded-lg overflow-hidden border border-omniviz-border">
        <table className="w-full text-xs">
          <thead className="bg-omniviz-bg">
            <tr>
              <th className="p-2 text-left text-omniviz-text">User</th>
              <th className="p-2 text-left text-omniviz-text">Department</th>
            </tr>
          </thead>
          <tbody>
            {getJoinResult().map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`border-t border-omniviz-border ${!row.matched ? 'bg-red-500/10' : ''}`}
              >
                <td className={`p-2 ${row.user === 'NULL' ? 'text-red-400 italic' : 'text-omniviz-text'}`}>{row.user}</td>
                <td className={`p-2 ${row.dept === 'NULL' ? 'text-red-400 italic' : 'text-omniviz-text'}`}>{row.dept}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DatabasesConcept
