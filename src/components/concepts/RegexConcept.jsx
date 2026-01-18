import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function RegexConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Regular Expressions" color="yellow" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Regular Expressions</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Powerful patterns for searching, matching, and manipulating text.
              </motion.p>
            </div>
          </Section>

          <Section title="Pattern Basics" id="basics">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Character Classes and Quantifiers</h3>
              <p className="text-omniviz-text-muted mb-4">Learn the building blocks: literal characters, metacharacters, and how to repeat patterns.</p>
            </ExplanationCard>
            <div className="mt-8"><BasicsDemo /></div>
          </Section>

          <Section title="Live Tester" id="tester">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Interactive Regex Tester</h3>
              <p className="text-omniviz-text-muted mb-4">Test your regular expressions against sample text and see matches highlighted in real-time.</p>
            </ExplanationCard>
            <div className="mt-8"><RegexTesterDemo /></div>
          </Section>

          <Section title="Common Patterns" id="patterns">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Useful Regex Patterns</h3>
              <p className="text-omniviz-text-muted mb-4">Ready-to-use patterns for emails, URLs, phone numbers, and more.</p>
            </ExplanationCard>
            <div className="mt-8"><CommonPatternsDemo /></div>
          </Section>

          <Section title="Groups and Capture" id="groups">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Capturing Groups</h3>
              <p className="text-omniviz-text-muted mb-4">Extract specific parts of matches using parentheses and named groups.</p>
            </ExplanationCard>
            <div className="mt-8"><GroupsDemo /></div>
          </Section>

          <Section title="Lookahead/Lookbehind" id="lookaround">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Zero-Width Assertions</h3>
              <p className="text-omniviz-text-muted mb-4">Match positions without consuming characters using lookahead and lookbehind.</p>
            </ExplanationCard>
            <div className="mt-8"><LookaroundDemo /></div>
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

function BasicsDemo() {
  const [selected, setSelected] = useState(null)

  const basics = [
    { pattern: '.', name: 'Dot', desc: 'Any character except newline', example: 'a.c', matches: 'abc, a1c, a-c' },
    { pattern: '\\d', name: 'Digit', desc: 'Any digit (0-9)', example: '\\d{3}', matches: '123, 456, 789' },
    { pattern: '\\w', name: 'Word', desc: 'Letter, digit, or underscore', example: '\\w+', matches: 'hello, test_123' },
    { pattern: '\\s', name: 'Whitespace', desc: 'Space, tab, newline', example: 'a\\sb', matches: '"a b", "a\\tb"' },
    { pattern: '^', name: 'Start', desc: 'Start of string/line', example: '^Hello', matches: 'Hello world' },
    { pattern: '$', name: 'End', desc: 'End of string/line', example: 'end$', matches: 'The end' },
    { pattern: '*', name: 'Zero+', desc: 'Zero or more times', example: 'ab*c', matches: 'ac, abc, abbc' },
    { pattern: '+', name: 'One+', desc: 'One or more times', example: 'ab+c', matches: 'abc, abbc (not ac)' },
    { pattern: '?', name: 'Optional', desc: 'Zero or one time', example: 'colou?r', matches: 'color, colour' },
    { pattern: '{n}', name: 'Exact', desc: 'Exactly n times', example: '\\d{4}', matches: '2024, 1234' },
    { pattern: '[abc]', name: 'Set', desc: 'Any char in set', example: '[aeiou]', matches: 'a, e, i, o, u' },
    { pattern: '[^abc]', name: 'Negated', desc: 'Any char NOT in set', example: '[^0-9]', matches: 'a, b, !' },
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
        {basics.map((b, i) => (
          <button
            key={i}
            onClick={() => setSelected(b)}
            className={`p-3 rounded-lg text-center transition-colors ${selected === b ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text hover:border-omniviz-accent border border-omniviz-border'}`}
          >
            <div className="font-mono font-bold">{b.pattern}</div>
            <div className="text-xs opacity-70">{b.name}</div>
          </button>
        ))}
      </div>
      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-omniviz-bg rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-400 font-bold mb-2">{selected.pattern} - {selected.name}</h4>
              <p className="text-omniviz-text-muted mb-4">{selected.desc}</p>
            </div>
            <div>
              <div className="mb-2">
                <span className="text-omniviz-text-muted text-sm">Example: </span>
                <code className="text-yellow-400 font-mono">{selected.example}</code>
              </div>
              <div>
                <span className="text-omniviz-text-muted text-sm">Matches: </span>
                <span className="text-omniviz-text">{selected.matches}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function RegexTesterDemo() {
  const [pattern, setPattern] = useState('[a-z]+@[a-z]+\\.[a-z]+')
  const [flags, setFlags] = useState('gi')
  const [text, setText] = useState('Contact us at hello@example.com or support@test.org for help.')
  const [error, setError] = useState(null)

  const result = useMemo(() => {
    try {
      setError(null)
      const regex = new RegExp(pattern, flags)
      const matches = [...text.matchAll(regex)]

      let highlighted = text
      let offset = 0

      matches.forEach(match => {
        const start = match.index + offset
        const end = start + match[0].length
        const before = highlighted.slice(0, start)
        const matched = highlighted.slice(start, end)
        const after = highlighted.slice(end)
        const replacement = `<mark class="bg-yellow-400 text-black px-0.5 rounded">${matched}</mark>`
        highlighted = before + replacement + after
        offset += replacement.length - match[0].length
      })

      return { matches, highlighted }
    } catch (e) {
      setError(e.message)
      return { matches: [], highlighted: text }
    }
  }, [pattern, flags, text])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-omniviz-text-muted text-sm">Pattern</label>
          <div className="flex gap-2">
            <span className="bg-omniviz-bg text-omniviz-text-muted px-3 py-2 rounded-l-lg border border-r-0 border-omniviz-border">/</span>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="flex-1 bg-omniviz-bg text-omniviz-text font-mono px-3 py-2 border border-omniviz-border" />
            <span className="bg-omniviz-bg text-omniviz-text-muted px-3 py-2 border border-l-0 border-omniviz-border">/</span>
            <input value={flags} onChange={(e) => setFlags(e.target.value)} className="w-16 bg-omniviz-bg text-omniviz-text font-mono px-3 py-2 rounded-r-lg border border-l-0 border-omniviz-border" placeholder="gi" />
          </div>
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">Test Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        </div>
      </div>
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg mb-4 text-red-400 text-sm">{error}</div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Highlighted Result</h4>
          <div className="text-omniviz-text" dangerouslySetInnerHTML={{ __html: result.highlighted }} />
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Matches ({result.matches.length})</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-yellow-400 font-mono">{m[0]}</span>
                <span className="text-omniviz-text-muted">index: {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <span className="text-omniviz-text-muted">Flags:</span>
        <span className="text-omniviz-text"><code className="text-cyan-400">g</code> = global</span>
        <span className="text-omniviz-text"><code className="text-cyan-400">i</code> = case insensitive</span>
        <span className="text-omniviz-text"><code className="text-cyan-400">m</code> = multiline</span>
      </div>
    </div>
  )
}

function CommonPatternsDemo() {
  const [selected, setSelected] = useState(null)
  const [testValue, setTestValue] = useState('')

  const patterns = [
    { name: 'Email', pattern: '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$', example: 'user@example.com' },
    { name: 'URL', pattern: '^https?:\\/\\/[\\w.-]+\\.[a-z]{2,}(\\/\\S*)?$', example: 'https://example.com/path' },
    { name: 'Phone (US)', pattern: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$', example: '(555) 123-4567' },
    { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', example: '2024-01-15' },
    { name: 'Time (HH:MM)', pattern: '^([01]\\d|2[0-3]):[0-5]\\d$', example: '14:30' },
    { name: 'IPv4 Address', pattern: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$', example: '192.168.1.1' },
    { name: 'Hex Color', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', example: '#ff5733' },
    { name: 'Password (Strong)', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', example: 'Pass@123' },
  ]

  const testPattern = (p) => {
    if (!testValue) return null
    try {
      return new RegExp(p.pattern).test(testValue)
    } catch {
      return false
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {patterns.map((p, i) => (
          <button
            key={i}
            onClick={() => { setSelected(p); setTestValue(p.example) }}
            className={`p-4 rounded-lg text-left transition-colors ${selected === p ? 'bg-purple-500/20 border-purple-500' : 'bg-omniviz-bg hover:border-omniviz-accent'} border border-omniviz-border`}
          >
            <div className="text-omniviz-text font-semibold mb-1">{p.name}</div>
            <div className="text-omniviz-text-muted text-xs font-mono truncate">{p.pattern}</div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-purple-400 font-bold mb-4">{selected.name}</h4>
          <div className="mb-4">
            <div className="text-omniviz-text-muted text-sm mb-1">Pattern:</div>
            <code className="text-sm font-mono text-yellow-400 bg-omniviz-surface p-2 rounded block overflow-x-auto">{selected.pattern}</code>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-omniviz-text-muted text-sm">Test Value:</label>
              <input
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                className="w-full bg-omniviz-surface text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono"
              />
            </div>
            <div className={`px-4 py-2 rounded-lg font-bold ${testPattern(selected) ? 'bg-green-500 text-white' : testPattern(selected) === false ? 'bg-red-500 text-white' : 'bg-omniviz-surface text-omniviz-text-muted'}`}>
              {testPattern(selected) ? '✓ Match' : testPattern(selected) === false ? '✗ No Match' : 'Enter value'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GroupsDemo() {
  const [text, setText] = useState('John Doe: john.doe@example.com, Jane Smith: jane.smith@test.org')
  const pattern = '(\\w+) (\\w+): ([\\w.]+@[\\w.]+)'

  const matches = useMemo(() => {
    try {
      const regex = new RegExp(pattern, 'g')
      return [...text.matchAll(regex)]
    } catch {
      return []
    }
  }, [text])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Pattern with Groups:</label>
        <code className="block p-3 bg-omniviz-bg rounded-lg font-mono text-sm mt-1">
          <span className="text-red-400">(</span>\w+<span className="text-red-400">)</span>{' '}
          <span className="text-green-400">(</span>\w+<span className="text-green-400">)</span>:{' '}
          <span className="text-blue-400">(</span>[\w.]+@[\w.]+<span className="text-blue-400">)</span>
        </code>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="text-red-400">Group 1: First Name</span>
          <span className="text-green-400">Group 2: Last Name</span>
          <span className="text-blue-400">Group 3: Email</span>
        </div>
      </div>
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Test Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-16 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1" />
      </div>
      <div className="p-4 bg-omniviz-bg rounded-lg">
        <h4 className="text-orange-400 font-semibold mb-4">Captured Groups</h4>
        <div className="space-y-4">
          {matches.map((match, i) => (
            <div key={i} className="p-3 bg-omniviz-surface rounded-lg">
              <div className="text-omniviz-text-muted text-sm mb-2">Match {i + 1}: <span className="text-yellow-400">"{match[0]}"</span></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-red-500/20 rounded">
                  <div className="text-red-400 text-xs">Group 1</div>
                  <div className="text-omniviz-text font-mono">{match[1]}</div>
                </div>
                <div className="text-center p-2 bg-green-500/20 rounded">
                  <div className="text-green-400 text-xs">Group 2</div>
                  <div className="text-omniviz-text font-mono">{match[2]}</div>
                </div>
                <div className="text-center p-2 bg-blue-500/20 rounded">
                  <div className="text-blue-400 text-xs">Group 3</div>
                  <div className="text-omniviz-text font-mono text-sm">{match[3]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LookaroundDemo() {
  const [selected, setSelected] = useState('lookahead')

  const demos = {
    lookahead: {
      name: 'Positive Lookahead (?=...)',
      pattern: '\\d+(?= dollars)',
      text: 'I have 100 dollars and 50 euros',
      desc: 'Matches digits only if followed by " dollars"',
      matches: ['100']
    },
    neglookahead: {
      name: 'Negative Lookahead (?!...)',
      pattern: '\\d+(?! dollars)',
      text: 'I have 100 dollars and 50 euros',
      desc: 'Matches digits NOT followed by " dollars"',
      matches: ['10', '50']
    },
    lookbehind: {
      name: 'Positive Lookbehind (?<=...)',
      pattern: '(?<=\\$)\\d+',
      text: 'Prices: $100, €50, $200',
      desc: 'Matches digits only if preceded by "$"',
      matches: ['100', '200']
    },
    neglookbehind: {
      name: 'Negative Lookbehind (?<!...)',
      pattern: '(?<!\\$)\\d+',
      text: 'Prices: $100, €50, $200',
      desc: 'Matches digits NOT preceded by "$"',
      matches: ['00', '50', '00']
    }
  }

  const demo = demos[selected]

  const highlighted = useMemo(() => {
    try {
      const regex = new RegExp(demo.pattern, 'g')
      return demo.text.replace(regex, '<mark class="bg-yellow-400 text-black px-0.5 rounded">$&</mark>')
    } catch {
      return demo.text
    }
  }, [demo])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(demos).map(([key, d]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-lg text-sm ${selected === key ? 'bg-cyan-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {d.name.split(' ')[1]}
          </button>
        ))}
      </div>
      <div className="p-4 bg-omniviz-bg rounded-lg">
        <h4 className="text-cyan-400 font-bold mb-4">{demo.name}</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="text-omniviz-text-muted text-sm mb-1">Pattern:</div>
              <code className="text-yellow-400 font-mono">{demo.pattern}</code>
            </div>
            <div className="mb-4">
              <div className="text-omniviz-text-muted text-sm mb-1">Description:</div>
              <p className="text-omniviz-text">{demo.desc}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <div className="text-omniviz-text-muted text-sm mb-1">Test Text:</div>
              <p className="text-omniviz-text">{demo.text}</p>
            </div>
            <div className="mb-4">
              <div className="text-omniviz-text-muted text-sm mb-1">Highlighted:</div>
              <p className="text-omniviz-text" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
            <div>
              <div className="text-omniviz-text-muted text-sm mb-1">Matches:</div>
              <div className="flex gap-2">
                {demo.matches.map((m, i) => (
                  <span key={i} className="px-2 py-1 bg-yellow-400 text-black rounded text-sm font-mono">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm">
        Lookarounds assert that a pattern exists (or doesn't) without including it in the match.
      </p>
    </div>
  )
}

export default RegexConcept
