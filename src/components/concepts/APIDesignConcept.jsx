import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function APIDesignConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="API Design" color="green" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">API Design</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Principles and patterns for designing clean, maintainable, and developer-friendly APIs.
              </motion.p>
            </div>
          </Section>

          <Section title="REST Principles" id="rest">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Resource-Oriented Design</h3>
              <p className="text-omniviz-text-muted mb-4">REST APIs organize around resources with standard HTTP methods for operations.</p>
            </ExplanationCard>
            <div className="mt-8"><RESTDemo /></div>
          </Section>

          <Section title="HTTP Status Codes" id="status">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Meaningful Responses</h3>
              <p className="text-omniviz-text-muted mb-4">Proper status codes communicate success, errors, and the nature of failures clearly.</p>
            </ExplanationCard>
            <div className="mt-8"><StatusCodesDemo /></div>
          </Section>

          <Section title="Versioning" id="versioning">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">API Evolution</h3>
              <p className="text-omniviz-text-muted mb-4">Versioning strategies allow APIs to evolve while maintaining backward compatibility.</p>
            </ExplanationCard>
            <div className="mt-8"><VersioningDemo /></div>
          </Section>

          <Section title="Pagination" id="pagination">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Handling Large Datasets</h3>
              <p className="text-omniviz-text-muted mb-4">Pagination strategies help efficiently transfer large collections of data.</p>
            </ExplanationCard>
            <div className="mt-8"><PaginationDemo /></div>
          </Section>

          <Section title="Error Handling" id="errors">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Informative Errors</h3>
              <p className="text-omniviz-text-muted mb-4">Well-designed error responses help developers quickly identify and fix issues.</p>
            </ExplanationCard>
            <div className="mt-8"><ErrorHandlingDemo /></div>
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

function RESTDemo() {
  const [selectedMethod, setSelectedMethod] = useState('GET')

  const endpoints = [
    { method: 'GET', path: '/users', desc: 'List all users', response: '[{id: 1, name: "Alice"}, ...]' },
    { method: 'GET', path: '/users/:id', desc: 'Get single user', response: '{id: 1, name: "Alice"}' },
    { method: 'POST', path: '/users', desc: 'Create new user', response: '{id: 3, name: "New User"}' },
    { method: 'PUT', path: '/users/:id', desc: 'Replace user', response: '{id: 1, name: "Updated"}' },
    { method: 'PATCH', path: '/users/:id', desc: 'Update fields', response: '{id: 1, name: "Patched"}' },
    { method: 'DELETE', path: '/users/:id', desc: 'Delete user', response: '204 No Content' }
  ]

  const methodColors = {
    GET: 'green',
    POST: 'yellow',
    PUT: 'blue',
    PATCH: 'purple',
    DELETE: 'red'
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(method => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`px-3 py-1 rounded text-sm ${selectedMethod === method ? `bg-${methodColors[method]}-500 text-white` : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {method}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {endpoints.filter(e => e.method === selectedMethod).map((ep, i) => (
          <div key={i} className="p-4 bg-omniviz-bg rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold bg-${methodColors[ep.method]}-500 text-white`}>
                {ep.method}
              </span>
              <code className="text-omniviz-text font-mono">{ep.path}</code>
            </div>
            <div className="text-omniviz-text-muted text-sm mb-2">{ep.desc}</div>
            <div className="p-2 bg-omniviz-surface rounded font-mono text-sm">
              <span className="text-omniviz-text-muted">Response: </span>
              <span className="text-green-400">{ep.response}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-omniviz-bg rounded-lg">
        <h4 className="text-omniviz-text font-semibold mb-2">REST Principles</h4>
        <ul className="text-sm text-omniviz-text-muted space-y-1">
          <li>• <strong>Resources:</strong> Nouns, not verbs (/users, not /getUsers)</li>
          <li>• <strong>HTTP Methods:</strong> Define the action</li>
          <li>• <strong>Stateless:</strong> Each request contains all needed info</li>
          <li>• <strong>Uniform Interface:</strong> Consistent patterns across endpoints</li>
        </ul>
      </div>
    </div>
  )
}

function StatusCodesDemo() {
  const [category, setCategory] = useState('2xx')

  const codes = {
    '2xx': [
      { code: 200, name: 'OK', desc: 'Request succeeded', use: 'GET, PUT, PATCH success' },
      { code: 201, name: 'Created', desc: 'Resource created', use: 'POST success' },
      { code: 204, name: 'No Content', desc: 'Success with no body', use: 'DELETE success' }
    ],
    '3xx': [
      { code: 301, name: 'Moved Permanently', desc: 'Resource relocated', use: 'URL changed permanently' },
      { code: 304, name: 'Not Modified', desc: 'Use cached version', use: 'Conditional GET' }
    ],
    '4xx': [
      { code: 400, name: 'Bad Request', desc: 'Invalid request', use: 'Validation errors' },
      { code: 401, name: 'Unauthorized', desc: 'Auth required', use: 'Missing/invalid token' },
      { code: 403, name: 'Forbidden', desc: 'Not allowed', use: 'Insufficient permissions' },
      { code: 404, name: 'Not Found', desc: 'Resource missing', use: 'ID doesn\'t exist' },
      { code: 422, name: 'Unprocessable', desc: 'Semantic error', use: 'Business logic error' }
    ],
    '5xx': [
      { code: 500, name: 'Server Error', desc: 'Unexpected error', use: 'Bugs, crashes' },
      { code: 503, name: 'Unavailable', desc: 'Temporarily down', use: 'Maintenance, overload' }
    ]
  }

  const categoryColors = {
    '2xx': 'green',
    '3xx': 'blue',
    '4xx': 'yellow',
    '5xx': 'red'
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {Object.keys(codes).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg ${category === cat ? `bg-${categoryColors[cat]}-500 text-white` : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {cat} {cat === '2xx' ? 'Success' : cat === '3xx' ? 'Redirect' : cat === '4xx' ? 'Client Error' : 'Server Error'}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {codes[category].map((c, i) => (
          <div key={i} className={`p-4 bg-${categoryColors[category]}-500/10 border border-${categoryColors[category]}-500 rounded-lg`}>
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-bold text-${categoryColors[category]}-400`}>{c.code}</span>
              <div className="flex-1">
                <div className="text-omniviz-text font-semibold">{c.name}</div>
                <div className="text-omniviz-text-muted text-sm">{c.desc}</div>
              </div>
              <div className="text-omniviz-text-muted text-sm text-right">
                {c.use}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VersioningDemo() {
  const [strategy, setStrategy] = useState('url')

  const strategies = {
    url: {
      name: 'URL Path',
      example: '/api/v1/users',
      pros: ['Easy to see version', 'Easy to cache', 'Clear routing'],
      cons: ['URL pollution', 'Hard to sunset versions']
    },
    query: {
      name: 'Query Parameter',
      example: '/api/users?version=1',
      pros: ['Keeps URLs clean', 'Easy to default'],
      cons: ['Can be overlooked', 'Harder to cache']
    },
    header: {
      name: 'Custom Header',
      example: 'X-API-Version: 1',
      pros: ['Clean URLs', 'Flexible'],
      cons: ['Hidden from users', 'Harder to test']
    },
    accept: {
      name: 'Accept Header',
      example: 'Accept: application/vnd.api.v1+json',
      pros: ['Follows HTTP standards', 'Content negotiation'],
      cons: ['Complex', 'Hard to discover']
    }
  }

  const current = strategies[strategy]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(strategies).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setStrategy(key)}
            className={`px-4 py-2 rounded-lg ${strategy === key ? 'bg-purple-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {val.name}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-purple-500/20 border border-purple-500 rounded-lg">
          <h4 className="text-purple-400 font-semibold mb-3">{current.name}</h4>
          <code className="block p-3 bg-omniviz-bg rounded text-omniviz-text font-mono text-sm mb-4">
            {current.example}
          </code>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-400 text-sm mb-2">Pros</h5>
              <ul className="text-sm text-omniviz-text-muted space-y-1">
                {current.pros.map((p, i) => <li key={i}>✓ {p}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-red-400 text-sm mb-2">Cons</h5>
              <ul className="text-sm text-omniviz-text-muted space-y-1">
                {current.cons.map((c, i) => <li key={i}>✗ {c}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Versioning Best Practices</h4>
          <ul className="text-sm text-omniviz-text-muted space-y-2">
            <li>• Start with v1 from day one</li>
            <li>• Maintain at most 2-3 versions</li>
            <li>• Deprecate with clear timelines</li>
            <li>• Use semantic versioning for major changes</li>
            <li>• Document breaking changes clearly</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function PaginationDemo() {
  const [style, setStyle] = useState('offset')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const totalItems = 95
  const totalPages = Math.ceil(totalItems / limit)

  const styles = {
    offset: {
      name: 'Offset-based',
      params: `?page=${page}&limit=${limit}`,
      response: {
        data: `[...${limit} items...]`,
        meta: { page, limit, total: totalItems, totalPages }
      }
    },
    cursor: {
      name: 'Cursor-based',
      params: `?cursor=abc123&limit=${limit}`,
      response: {
        data: `[...${limit} items...]`,
        nextCursor: 'def456',
        hasMore: true
      }
    },
    keyset: {
      name: 'Keyset (seek)',
      params: `?after_id=100&limit=${limit}`,
      response: {
        data: `[...${limit} items starting after id 100...]`,
        nextKey: 110
      }
    }
  }

  const current = styles[style]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {Object.entries(styles).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setStyle(key)}
            className={`px-4 py-2 rounded-lg ${style === key ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {val.name}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-3">Request</h4>
          <code className="block p-3 bg-omniviz-bg rounded text-green-400 font-mono text-sm mb-4">
            GET /api/users{current.params}
          </code>
          <h4 className="text-omniviz-text font-semibold mb-3">Response</h4>
          <pre className="p-3 bg-omniviz-bg rounded text-sm font-mono text-omniviz-text overflow-auto">
{JSON.stringify(current.response, null, 2)}
          </pre>
        </div>
        <div>
          {style === 'offset' && (
            <div className="p-4 bg-omniviz-bg rounded-lg mb-4">
              <h4 className="text-omniviz-text font-semibold mb-3">Page Navigation</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-omniviz-surface rounded disabled:opacity-50 text-omniviz-text"
                >
                  Prev
                </button>
                <span className="text-omniviz-text">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-omniviz-surface rounded disabled:opacity-50 text-omniviz-text"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-omniviz-text font-semibold mb-3">Comparison</h4>
            <div className="space-y-2 text-sm">
              <div className={style === 'offset' ? 'text-green-400' : 'text-omniviz-text-muted'}>
                <strong>Offset:</strong> Simple, but slow on large datasets (OFFSET 10000)
              </div>
              <div className={style === 'cursor' ? 'text-green-400' : 'text-omniviz-text-muted'}>
                <strong>Cursor:</strong> Opaque token, consistent with real-time data
              </div>
              <div className={style === 'keyset' ? 'text-green-400' : 'text-omniviz-text-muted'}>
                <strong>Keyset:</strong> Most efficient, uses indexed column
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorHandlingDemo() {
  const [errorType, setErrorType] = useState('validation')

  const errors = {
    validation: {
      status: 400,
      response: {
        error: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: [
          { field: 'email', message: 'Invalid email format' },
          { field: 'age', message: 'Must be at least 18' }
        ]
      }
    },
    notfound: {
      status: 404,
      response: {
        error: 'NOT_FOUND',
        message: 'User with id 999 not found',
        resourceType: 'User',
        resourceId: 999
      }
    },
    auth: {
      status: 401,
      response: {
        error: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
        hint: 'Please refresh your access token'
      }
    },
    ratelimit: {
      status: 429,
      response: {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests',
        retryAfter: 60,
        limit: 100,
        remaining: 0
      }
    }
  }

  const current = errors[errorType]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {Object.keys(errors).map(key => (
          <button
            key={key}
            onClick={() => setErrorType(key)}
            className={`px-4 py-2 rounded-lg capitalize ${errorType === key ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {key.replace('notfound', 'not found').replace('ratelimit', 'rate limit')}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-red-400">{current.status}</span>
            <span className="text-omniviz-text">{current.response.error}</span>
          </div>
          <pre className="p-3 bg-omniviz-bg rounded text-sm font-mono text-omniviz-text overflow-auto">
{JSON.stringify(current.response, null, 2)}
          </pre>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Error Response Best Practices</h4>
          <ul className="text-sm text-omniviz-text-muted space-y-2">
            <li>• Use consistent error format across API</li>
            <li>• Include machine-readable error code</li>
            <li>• Provide human-readable message</li>
            <li>• Add helpful context (field, resource)</li>
            <li>• Include retry info for rate limits</li>
            <li>• Never expose internal details (stack traces)</li>
            <li>• Log detailed errors server-side</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default APIDesignConcept
