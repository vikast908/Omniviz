import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function VersionControlConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Version Control" color="orange" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Version Control</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Track changes, collaborate on code, and manage project history with Git.
              </motion.p>
            </div>
          </Section>

          <Section title="Git Basics" id="basics">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Working Directory → Staging → Repository</h3>
              <p className="text-omniviz-text-muted mb-4">Git tracks changes through three areas: working directory (your files), staging area (prepared changes), and repository (committed history).</p>
            </ExplanationCard>
            <div className="mt-8"><GitBasicsDemo /></div>
          </Section>

          <Section title="Branching" id="branching">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Parallel Development</h3>
              <p className="text-omniviz-text-muted mb-4">Branches allow multiple lines of development to happen simultaneously without affecting the main codebase.</p>
            </ExplanationCard>
            <div className="mt-8"><BranchingDemo /></div>
          </Section>

          <Section title="Merge vs Rebase" id="merge">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Integrating Changes</h3>
              <p className="text-omniviz-text-muted mb-4">Merge creates a new commit combining branches, while rebase replays commits on top of another branch for a linear history.</p>
            </ExplanationCard>
            <div className="mt-8"><MergeRebaseDemo /></div>
          </Section>

          <Section title="Conflict Resolution" id="conflicts">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Handling Conflicts</h3>
              <p className="text-omniviz-text-muted mb-4">When the same lines are changed in different branches, Git cannot automatically merge and requires manual resolution.</p>
            </ExplanationCard>
            <div className="mt-8"><ConflictDemo /></div>
          </Section>

          <Section title="Git Flow" id="flow">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Branching Strategy</h3>
              <p className="text-omniviz-text-muted mb-4">Git Flow defines a branching model with feature, develop, release, and hotfix branches for organized development.</p>
            </ExplanationCard>
            <div className="mt-8"><GitFlowDemo /></div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, id, children }) {
  return (<motion.section id={id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="py-12 border-b border-omniviz-border last:border-0">{title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}{children}</motion.section>)
}
function ExplanationCard({ children }) {
  return <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">{children}</div>
}

function GitBasicsDemo() {
  const [workingDir, setWorkingDir] = useState(['index.js', 'style.css'])
  const [staging, setStaging] = useState([])
  const [commits, setCommits] = useState([{ hash: 'a1b2c3d', msg: 'Initial commit', files: ['README.md'] }])
  const [newFile, setNewFile] = useState('')
  const [log, setLog] = useState([])

  const addFile = () => {
    if (newFile && !workingDir.includes(newFile)) {
      setWorkingDir([...workingDir, newFile])
      setLog(prev => [...prev.slice(-4), `Created ${newFile}`])
      setNewFile('')
    }
  }

  const stageFile = (file) => {
    if (!staging.includes(file)) {
      setStaging([...staging, file])
      setLog(prev => [...prev.slice(-4), `git add ${file}`])
    }
  }

  const unstageFile = (file) => {
    setStaging(staging.filter(f => f !== file))
    setLog(prev => [...prev.slice(-4), `git reset ${file}`])
  }

  const commit = () => {
    if (staging.length > 0) {
      const hash = Math.random().toString(36).substring(2, 9)
      setCommits([{ hash, msg: `Add ${staging.join(', ')}`, files: staging }, ...commits])
      setLog(prev => [...prev.slice(-4), `git commit -m "Add ${staging.join(', ')}"`])
      setStaging([])
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-red-400 font-semibold mb-3">Working Directory</h4>
          <div className="space-y-2">
            {workingDir.map(file => (
              <div key={file} className="flex items-center justify-between p-2 bg-omniviz-surface rounded">
                <span className="text-omniviz-text text-sm font-mono">{file}</span>
                <button onClick={() => stageFile(file)} className="text-xs px-2 py-1 bg-green-500 text-white rounded">Stage</button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={newFile} onChange={(e) => setNewFile(e.target.value)} placeholder="new-file.js" className="flex-1 bg-omniviz-surface text-omniviz-text text-sm rounded border border-omniviz-border px-2 py-1" />
            <button onClick={addFile} className="px-2 py-1 bg-blue-500 text-white text-xs rounded">+</button>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-3">Staging Area</h4>
          <div className="space-y-2">
            {staging.length === 0 ? (
              <p className="text-omniviz-text-muted text-sm">No files staged</p>
            ) : (
              staging.map(file => (
                <div key={file} className="flex items-center justify-between p-2 bg-omniviz-surface rounded">
                  <span className="text-omniviz-text text-sm font-mono">{file}</span>
                  <button onClick={() => unstageFile(file)} className="text-xs px-2 py-1 bg-red-500 text-white rounded">Unstage</button>
                </div>
              ))
            )}
          </div>
          {staging.length > 0 && (
            <button onClick={commit} className="mt-3 w-full px-3 py-2 bg-green-500 text-white rounded">Commit</button>
          )}
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-green-400 font-semibold mb-3">Repository (Commits)</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {commits.map((c, i) => (
              <div key={i} className="p-2 bg-omniviz-surface rounded">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs">{c.hash}</span>
                </div>
                <div className="text-omniviz-text text-sm">{c.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 bg-omniviz-bg rounded-lg font-mono text-sm">
        <div className="text-omniviz-text-muted mb-1">$ git log</div>
        {log.map((l, i) => <div key={i} className="text-green-400">{l}</div>)}
      </div>
    </div>
  )
}

function BranchingDemo() {
  const [branches, setBranches] = useState(['main', 'feature-login'])
  const [currentBranch, setCurrentBranch] = useState('main')
  const [newBranch, setNewBranch] = useState('')
  const [commits, setCommits] = useState({
    main: [{ hash: 'a1b2c3d', msg: 'Initial commit' }, { hash: 'e4f5g6h', msg: 'Add homepage' }],
    'feature-login': [{ hash: 'a1b2c3d', msg: 'Initial commit' }, { hash: 'i7j8k9l', msg: 'Add login form' }]
  })

  const createBranch = () => {
    if (newBranch && !branches.includes(newBranch)) {
      setBranches([...branches, newBranch])
      setCommits({ ...commits, [newBranch]: [...commits[currentBranch]] })
      setNewBranch('')
    }
  }

  const switchBranch = (branch) => {
    setCurrentBranch(branch)
  }

  const addCommit = () => {
    const hash = Math.random().toString(36).substring(2, 9)
    setCommits({
      ...commits,
      [currentBranch]: [...commits[currentBranch], { hash, msg: `Commit on ${currentBranch}` }]
    })
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          {branches.map(branch => (
            <button
              key={branch}
              onClick={() => switchBranch(branch)}
              className={`px-3 py-2 rounded-lg text-sm font-mono ${currentBranch === branch ? 'bg-purple-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              {branch === currentBranch && '* '}{branch}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newBranch} onChange={(e) => setNewBranch(e.target.value)} placeholder="new-branch" className="bg-omniviz-bg text-omniviz-text text-sm rounded-lg border border-omniviz-border px-3 py-2" />
          <button onClick={createBranch} className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">Create</button>
        </div>
        <button onClick={addCommit} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm">Add Commit</button>
      </div>
      <div className="relative h-48 bg-omniviz-bg rounded-lg p-4">
        {branches.map((branch, bi) => (
          <div key={branch} className="flex items-center gap-2 mb-4">
            <span className={`w-24 text-sm font-mono ${branch === currentBranch ? 'text-purple-400' : 'text-omniviz-text-muted'}`}>{branch}</span>
            <div className="flex items-center gap-1">
              {commits[branch]?.map((commit, ci) => (
                <div key={ci} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${branch === currentBranch ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {commit.hash.slice(0, 2)}
                  </div>
                  {ci < (commits[branch]?.length || 0) - 1 && <div className={`w-8 h-0.5 ${branch === currentBranch ? 'bg-purple-500' : 'bg-gray-500'}`} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg font-mono text-sm">
        <div className="text-green-400">$ git branch</div>
        {branches.map(b => <div key={b} className="text-omniviz-text">{b === currentBranch ? '* ' : '  '}{b}</div>)}
      </div>
    </div>
  )
}

function MergeRebaseDemo() {
  const [mode, setMode] = useState('merge')
  const [step, setStep] = useState(0)

  const mergeSteps = [
    { main: ['A', 'B'], feature: ['A', 'B', 'C', 'D'], result: null },
    { main: ['A', 'B', 'E'], feature: ['A', 'B', 'C', 'D'], result: null },
    { main: ['A', 'B', 'E', 'M'], feature: ['A', 'B', 'C', 'D'], result: 'Merge commit M created' }
  ]

  const rebaseSteps = [
    { main: ['A', 'B'], feature: ['A', 'B', 'C', 'D'], result: null },
    { main: ['A', 'B', 'E'], feature: ['A', 'B', 'C', 'D'], result: null },
    { main: ['A', 'B', 'E'], feature: ['A', 'B', 'E', "C'", "D'"], result: 'Commits replayed on top of main' }
  ]

  const steps = mode === 'merge' ? mergeSteps : rebaseSteps

  const animate = () => {
    setStep(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setStep(i)
      if (i >= steps.length - 1) clearInterval(interval)
    }, 1000)
  }

  const current = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => { setMode('merge'); setStep(0) }} className={`px-4 py-2 rounded-lg ${mode === 'merge' ? 'bg-blue-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Merge</button>
        <button onClick={() => { setMode('rebase'); setStep(0) }} className={`px-4 py-2 rounded-lg ${mode === 'rebase' ? 'bg-purple-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Rebase</button>
        <button onClick={animate} className="px-4 py-2 bg-green-500 text-white rounded-lg">Animate</button>
      </div>
      <div className="bg-omniviz-bg rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-16 text-sm text-omniviz-text-muted">main</span>
          {current.main.map((c, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${c === 'M' ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>{c}</div>
              {i < current.main.length - 1 && <div className="w-6 h-0.5 bg-blue-500" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 text-sm text-omniviz-text-muted">feature</span>
          {current.feature.map((c, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${c.includes("'") ? 'bg-green-500' : 'bg-purple-500'} text-white`}>{c}</div>
              {i < current.feature.length - 1 && <div className="w-6 h-0.5 bg-purple-500" />}
            </div>
          ))}
        </div>
      </div>
      {current.result && (
        <div className={`mt-4 p-3 rounded-lg ${mode === 'merge' ? 'bg-blue-500/20 border border-blue-500' : 'bg-purple-500/20 border border-purple-500'}`}>
          <span className={mode === 'merge' ? 'text-blue-400' : 'text-purple-400'}>{current.result}</span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-omniviz-bg rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-2">Merge</h4>
          <p className="text-omniviz-text-muted">Preserves history, creates merge commit</p>
        </div>
        <div className="p-3 bg-omniviz-bg rounded-lg">
          <h4 className="text-purple-400 font-semibold mb-2">Rebase</h4>
          <p className="text-omniviz-text-muted">Linear history, rewrites commits</p>
        </div>
      </div>
    </div>
  )
}

function ConflictDemo() {
  const [step, setStep] = useState(0)
  const [resolved, setResolved] = useState(false)

  const baseCode = `function greet(name) {
  return "Hello, " + name;
}`

  const mainCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}`

  const featureCode = `function greet(name) {
  return "Hi there, " + name;
}`

  const conflictCode = `function greet(name) {
<<<<<<< HEAD
  return \`Hello, \${name}!\`;
=======
  return "Hi there, " + name;
>>>>>>> feature
}`

  const resolvedCode = `function greet(name) {
  return \`Hi there, \${name}!\`;
}`

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        {['Base', 'Main changes', 'Feature changes', 'Conflict!', 'Resolved'].map((label, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setResolved(i === 4) }}
            className={`px-3 py-2 rounded-lg text-sm ${step === i ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">
            {step === 0 ? 'Base Version' : step === 1 ? 'main branch' : step === 2 ? 'feature branch' : step === 3 ? 'Merge Conflict' : 'Resolved'}
          </h4>
          <pre className={`text-sm font-mono p-3 rounded ${step === 3 ? 'bg-red-500/20 border border-red-500' : step === 4 ? 'bg-green-500/20 border border-green-500' : 'bg-omniviz-surface'}`}>
            <code className="text-omniviz-text">
              {step === 0 ? baseCode : step === 1 ? mainCode : step === 2 ? featureCode : step === 3 ? conflictCode : resolvedCode}
            </code>
          </pre>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Explanation</h4>
          <div className="text-omniviz-text-muted text-sm space-y-2">
            {step === 0 && <p>Original code that both branches started from.</p>}
            {step === 1 && <p>Main branch updated to use template literals and added exclamation mark.</p>}
            {step === 2 && <p>Feature branch changed greeting to "Hi there" instead of "Hello".</p>}
            {step === 3 && (
              <>
                <p className="text-red-400">Conflict detected! Both branches modified the same line differently.</p>
                <p>Git marks the conflict with &lt;&lt;&lt;, ===, and &gt;&gt;&gt; markers.</p>
              </>
            )}
            {step === 4 && (
              <>
                <p className="text-green-400">Conflict resolved!</p>
                <p>Combined both changes: template literals from main + "Hi there" from feature.</p>
              </>
            )}
          </div>
          {step === 3 && (
            <div className="mt-4 space-y-2">
              <div className="text-sm"><span className="text-blue-400">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span> - Your current branch changes</div>
              <div className="text-sm"><span className="text-gray-400">=======</span> - Separator</div>
              <div className="text-sm"><span className="text-purple-400">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</span> - Incoming branch changes</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function GitFlowDemo() {
  const [activeBranch, setActiveBranch] = useState(null)

  const branches = [
    { name: 'main', color: 'blue', y: 20, desc: 'Production-ready code' },
    { name: 'develop', color: 'green', y: 50, desc: 'Integration branch for features' },
    { name: 'feature/*', color: 'purple', y: 80, desc: 'New features in development' },
    { name: 'release/*', color: 'yellow', y: 110, desc: 'Preparing for production release' },
    { name: 'hotfix/*', color: 'red', y: 140, desc: 'Emergency production fixes' }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="relative h-48 bg-omniviz-bg rounded-lg p-4 mb-4">
        {branches.map(branch => (
          <div
            key={branch.name}
            className="absolute flex items-center gap-4 cursor-pointer"
            style={{ top: branch.y }}
            onClick={() => setActiveBranch(branch)}
          >
            <div className={`w-24 text-sm font-mono text-${branch.color}-400`}>{branch.name}</div>
            <div className={`h-2 rounded-full bg-${branch.color}-500`} style={{ width: '400px' }} />
          </div>
        ))}
        {/* Flow arrows */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
            </marker>
          </defs>
          {/* feature → develop */}
          <path d="M 200 88 Q 200 70 200 58" stroke="#888" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          {/* develop → release */}
          <path d="M 300 58 Q 300 85 300 118" stroke="#888" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          {/* release → main */}
          <path d="M 400 118 Q 400 70 400 28" stroke="#888" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          {/* hotfix → main */}
          <path d="M 450 148 Q 480 80 450 28" stroke="#888" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        </svg>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Branch Types</h4>
          <div className="space-y-2">
            {branches.map(b => (
              <div key={b.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${b.color}-500`} />
                <span className={`font-mono text-sm text-${b.color}-400`}>{b.name}</span>
                <span className="text-omniviz-text-muted text-sm">- {b.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Workflow</h4>
          <ol className="space-y-2 text-sm text-omniviz-text-muted list-decimal list-inside">
            <li>Create feature branch from develop</li>
            <li>Complete feature, merge to develop</li>
            <li>Create release branch from develop</li>
            <li>Test, fix, merge to main AND develop</li>
            <li>Tag release on main</li>
            <li>Hotfixes branch from main, merge back</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default VersionControlConcept
