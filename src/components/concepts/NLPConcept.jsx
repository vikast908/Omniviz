import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function NLPConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Natural Language Processing" color="blue" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Natural Language Processing</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Teaching computers to understand, interpret, and generate human language.
              </motion.p>
            </div>
          </Section>

          <Section title="Tokenization" id="tokenization">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Breaking Text into Tokens</h3>
              <p className="text-omniviz-text-muted mb-4">Tokenization splits text into meaningful units (words, subwords, or characters) for processing by NLP models.</p>
            </ExplanationCard>
            <div className="mt-8"><TokenizationDemo /></div>
          </Section>

          <Section title="Word Embeddings" id="embeddings">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Words as Vectors</h3>
              <p className="text-omniviz-text-muted mb-4">Word embeddings represent words as dense vectors where similar words are close together in vector space.</p>
            </ExplanationCard>
            <div className="mt-8"><EmbeddingsDemo /></div>
          </Section>

          <Section title="Sentiment Analysis" id="sentiment">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Understanding Emotion in Text</h3>
              <p className="text-omniviz-text-muted mb-4">Sentiment analysis determines whether text expresses positive, negative, or neutral sentiment.</p>
            </ExplanationCard>
            <div className="mt-8"><SentimentDemo /></div>
          </Section>

          <Section title="Named Entity Recognition" id="ner">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Finding Entities in Text</h3>
              <p className="text-omniviz-text-muted mb-4">NER identifies and classifies named entities like people, organizations, locations, and dates in text.</p>
            </ExplanationCard>
            <div className="mt-8"><NERDemo /></div>
          </Section>

          <Section title="Text Similarity" id="similarity">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Measuring Semantic Distance</h3>
              <p className="text-omniviz-text-muted mb-4">Text similarity compares how semantically close two pieces of text are using various metrics.</p>
            </ExplanationCard>
            <div className="mt-8"><SimilarityDemo /></div>
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

function TokenizationDemo() {
  const [text, setText] = useState("Hello, world! I'm learning NLP.")
  const [method, setMethod] = useState('word')

  const tokens = useMemo(() => {
    switch (method) {
      case 'word':
        return text.split(/\s+/).filter(t => t.length > 0)
      case 'char':
        return text.split('')
      case 'subword':
        // Simplified BPE-like tokenization
        return text.toLowerCase().match(/[a-z]+|[^a-z\s]+|\s+/g) || []
      default:
        return []
    }
  }, [text, method])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Input Text:</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1"
        />
      </div>
      <div className="flex gap-2 mb-6">
        {['word', 'char', 'subword'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-4 py-2 rounded-lg capitalize ${method === m ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="p-4 bg-omniviz-bg rounded-lg">
        <div className="text-omniviz-text-muted text-sm mb-2">Tokens ({tokens.length})</div>
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, i) => (
            <span key={i} className="px-2 py-1 bg-green-500/20 border border-green-500 rounded text-omniviz-text font-mono text-sm">
              {token === ' ' ? '␣' : token}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 text-omniviz-text-muted text-sm">
        {method === 'word' && 'Word tokenization: Splits on whitespace. Simple but loses punctuation context.'}
        {method === 'char' && 'Character tokenization: Each character is a token. Handles any vocabulary but loses word meaning.'}
        {method === 'subword' && 'Subword tokenization: Balances vocabulary size and meaning. Used by modern LLMs.'}
      </div>
    </div>
  )
}

function EmbeddingsDemo() {
  const [words, setWords] = useState(['king', 'queen', 'man', 'woman', 'prince', 'princess'])

  // Simulated 2D embeddings (pre-computed for demo)
  const embeddings = {
    king: { x: 0.8, y: 0.7 },
    queen: { x: 0.9, y: 0.3 },
    man: { x: 0.4, y: 0.8 },
    woman: { x: 0.5, y: 0.4 },
    prince: { x: 0.6, y: 0.6 },
    princess: { x: 0.7, y: 0.2 },
    boy: { x: 0.3, y: 0.9 },
    girl: { x: 0.4, y: 0.5 },
    father: { x: 0.5, y: 0.7 },
    mother: { x: 0.6, y: 0.3 }
  }

  const addWord = (word) => {
    if (embeddings[word.toLowerCase()] && !words.includes(word.toLowerCase())) {
      setWords([...words, word.toLowerCase()])
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 bg-omniviz-bg rounded-lg p-4">
          <div className="absolute top-2 left-2 text-omniviz-text-muted text-xs">2D Embedding Space</div>
          <div className="absolute bottom-2 left-1/2 text-omniviz-text-muted text-xs">Gender →</div>
          <div className="absolute left-2 top-1/2 text-omniviz-text-muted text-xs transform -rotate-90">Royalty →</div>
          {words.map(word => {
            const pos = embeddings[word]
            if (!pos) return null
            return (
              <motion.div
                key={word}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute"
                style={{ left: `${pos.x * 80 + 10}%`, top: `${(1 - pos.y) * 80 + 10}%` }}
              >
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="absolute left-4 top-0 text-omniviz-text text-xs whitespace-nowrap">{word}</span>
              </motion.div>
            )
          })}
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Word Relationships</h4>
          <div className="p-3 bg-omniviz-bg rounded-lg mb-4">
            <div className="text-cyan-400 font-mono text-sm">king - man + woman ≈ queen</div>
            <p className="text-omniviz-text-muted text-sm mt-2">
              Vector arithmetic captures semantic relationships!
            </p>
          </div>
          <div className="mb-4">
            <div className="text-omniviz-text-muted text-sm mb-2">Add words to plot:</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(embeddings).filter(w => !words.includes(w)).map(word => (
                <button
                  key={word}
                  onClick={() => addWord(word)}
                  className="px-2 py-1 bg-omniviz-surface text-omniviz-text text-sm rounded border border-omniviz-border hover:border-omniviz-accent"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
          <p className="text-omniviz-text-muted text-sm">
            Similar words cluster together. Male/female pairs are parallel vectors.
          </p>
        </div>
      </div>
    </div>
  )
}

function SentimentDemo() {
  const [text, setText] = useState("I absolutely love this product! It's amazing!")

  // Simple lexicon-based sentiment
  const positiveWords = ['love', 'amazing', 'great', 'excellent', 'wonderful', 'fantastic', 'good', 'best', 'happy', 'beautiful']
  const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'worst', 'horrible', 'poor', 'sad', 'ugly', 'disappointed']

  const analysis = useMemo(() => {
    const words = text.toLowerCase().split(/\W+/)
    let positive = 0, negative = 0

    const matched = []
    words.forEach(word => {
      if (positiveWords.includes(word)) { positive++; matched.push({ word, sentiment: 'positive' }) }
      if (negativeWords.includes(word)) { negative++; matched.push({ word, sentiment: 'negative' }) }
    })

    const score = positive - negative
    const sentiment = score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'
    const confidence = Math.min(Math.abs(score) / 3, 1)

    return { sentiment, score, confidence, positive, negative, matched }
  }, [text])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Enter text to analyze:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg text-center ${
          analysis.sentiment === 'Positive' ? 'bg-green-500/20 border border-green-500' :
          analysis.sentiment === 'Negative' ? 'bg-red-500/20 border border-red-500' :
          'bg-gray-500/20 border border-gray-500'
        }`}>
          <div className="text-4xl mb-2">
            {analysis.sentiment === 'Positive' ? '😊' : analysis.sentiment === 'Negative' ? '😞' : '😐'}
          </div>
          <div className={`text-xl font-bold ${
            analysis.sentiment === 'Positive' ? 'text-green-400' :
            analysis.sentiment === 'Negative' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {analysis.sentiment}
          </div>
          <div className="text-omniviz-text-muted text-sm">
            Confidence: {(analysis.confidence * 100).toFixed(0)}%
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Scores</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-400">Positive words:</span>
              <span className="text-omniviz-text">{analysis.positive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Negative words:</span>
              <span className="text-omniviz-text">{analysis.negative}</span>
            </div>
            <div className="flex justify-between border-t border-omniviz-border pt-2">
              <span className="text-omniviz-text">Net score:</span>
              <span className={analysis.score > 0 ? 'text-green-400' : analysis.score < 0 ? 'text-red-400' : 'text-gray-400'}>
                {analysis.score > 0 ? '+' : ''}{analysis.score}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Detected Words</h4>
          <div className="space-y-1">
            {analysis.matched.map((m, i) => (
              <span key={i} className={`inline-block px-2 py-1 rounded text-sm mr-1 mb-1 ${
                m.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {m.word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NERDemo() {
  const [text, setText] = useState('Apple Inc. was founded by Steve Jobs in Cupertino, California on April 1, 1976.')

  // Simple pattern-based NER
  const entities = useMemo(() => {
    const result = []

    // Organizations (capitalized multi-word + Inc/Corp/Ltd)
    const orgs = text.match(/[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Inc|Corp|Ltd|Company)/g)
    orgs?.forEach(o => result.push({ text: o, type: 'ORG', color: 'blue' }))

    // Dates
    const dates = text.match(/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/g)
    dates?.forEach(d => result.push({ text: d, type: 'DATE', color: 'purple' }))

    // Locations (known)
    const locations = ['California', 'Cupertino', 'New York', 'London', 'Paris', 'Tokyo']
    locations.forEach(loc => {
      if (text.includes(loc)) result.push({ text: loc, type: 'LOC', color: 'green' })
    })

    // Persons (capitalized names not matching above)
    const names = text.match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g)
    names?.forEach(n => {
      if (!result.some(r => r.text.includes(n))) {
        result.push({ text: n, type: 'PERSON', color: 'orange' })
      }
    })

    return result
  }, [text])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Input text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-20 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1"
        />
      </div>
      <div className="p-4 bg-omniviz-bg rounded-lg mb-4">
        <h4 className="text-omniviz-text font-semibold mb-3">Annotated Text</h4>
        <p className="text-omniviz-text leading-relaxed">
          {text.split(/(\s+)/).map((segment, i) => {
            const entity = entities.find(e => segment.includes(e.text) || e.text.includes(segment))
            if (entity && segment.trim()) {
              return (
                <span key={i} className={`px-1 rounded bg-${entity.color}-500/30 border-b-2 border-${entity.color}-500`}>
                  {segment}
                </span>
              )
            }
            return <span key={i}>{segment}</span>
          })}
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-3">
        {['PERSON', 'ORG', 'LOC', 'DATE'].map(type => {
          const typeEntities = entities.filter(e => e.type === type)
          const colors = { PERSON: 'orange', ORG: 'blue', LOC: 'green', DATE: 'purple' }
          return (
            <div key={type} className={`p-3 rounded-lg bg-${colors[type]}-500/20`}>
              <div className={`text-${colors[type]}-400 font-semibold text-sm mb-2`}>{type}</div>
              {typeEntities.map((e, i) => (
                <div key={i} className="text-omniviz-text text-sm">{e.text}</div>
              ))}
              {typeEntities.length === 0 && <div className="text-omniviz-text-muted text-sm">None found</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SimilarityDemo() {
  const [text1, setText1] = useState('The quick brown fox jumps over the lazy dog')
  const [text2, setText2] = useState('A fast auburn fox leaps above a sleepy canine')

  // Jaccard similarity on words
  const jaccard = useMemo(() => {
    const set1 = new Set(text1.toLowerCase().split(/\W+/))
    const set2 = new Set(text2.toLowerCase().split(/\W+/))
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    const union = new Set([...set1, ...set2])
    return intersection.size / union.size
  }, [text1, text2])

  // Cosine similarity on character trigrams
  const cosine = useMemo(() => {
    const getTrigrams = (s) => {
      const tri = {}
      for (let i = 0; i < s.length - 2; i++) {
        const t = s.slice(i, i + 3).toLowerCase()
        tri[t] = (tri[t] || 0) + 1
      }
      return tri
    }
    const t1 = getTrigrams(text1)
    const t2 = getTrigrams(text2)
    const keys = new Set([...Object.keys(t1), ...Object.keys(t2)])

    let dot = 0, mag1 = 0, mag2 = 0
    keys.forEach(k => {
      const v1 = t1[k] || 0
      const v2 = t2[k] || 0
      dot += v1 * v2
      mag1 += v1 * v1
      mag2 += v2 * v2
    })

    return dot / (Math.sqrt(mag1) * Math.sqrt(mag2))
  }, [text1, text2])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-omniviz-text-muted text-sm">Text 1:</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-20 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">Text 2:</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-20 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Jaccard Similarity</h4>
          <div className="text-3xl font-bold text-red-400">{(jaccard * 100).toFixed(1)}%</div>
          <p className="text-omniviz-text-muted text-sm mt-2">
            Measures overlap of unique words: |A∩B| / |A∪B|
          </p>
          <div className="mt-2 h-3 bg-omniviz-surface rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: `${jaccard * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Cosine Similarity</h4>
          <div className="text-3xl font-bold text-cyan-400">{(cosine * 100).toFixed(1)}%</div>
          <p className="text-omniviz-text-muted text-sm mt-2">
            Measures angle between trigram vectors
          </p>
          <div className="mt-2 h-3 bg-omniviz-surface rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500" style={{ width: `${cosine * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NLPConcept
