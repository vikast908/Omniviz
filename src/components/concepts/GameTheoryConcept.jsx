import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function GameTheoryConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Game Theory" color="green" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Game Theory</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Mathematical study of strategic decision-making between rational agents.
              </motion.p>
            </div>
          </Section>

          <Section title="Prisoner's Dilemma" id="prisoner">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Classic Cooperation Problem</h3>
              <p className="text-omniviz-text-muted mb-4">Two prisoners must decide whether to cooperate or defect. Individual rationality leads to a worse collective outcome.</p>
            </ExplanationCard>
            <div className="mt-8"><PrisonersDilemmaDemo /></div>
          </Section>

          <Section title="Nash Equilibrium" id="nash">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Stable Strategy Profiles</h3>
              <p className="text-omniviz-text-muted mb-4">A Nash equilibrium is reached when no player can benefit by changing their strategy while others keep theirs unchanged.</p>
            </ExplanationCard>
            <div className="mt-8"><NashEquilibriumDemo /></div>
          </Section>

          <Section title="Iterated Games" id="iterated">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Repeated Interactions</h3>
              <p className="text-omniviz-text-muted mb-4">When games are repeated, strategies like "Tit for Tat" can achieve cooperation that single games cannot.</p>
            </ExplanationCard>
            <div className="mt-8"><IteratedGameDemo /></div>
          </Section>

          <Section title="Auction Theory" id="auction">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Bidding Strategies</h3>
              <p className="text-omniviz-text-muted mb-4">Different auction formats (English, Dutch, sealed-bid) create different strategic incentives for bidders.</p>
            </ExplanationCard>
            <div className="mt-8"><AuctionDemo /></div>
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

function PrisonersDilemmaDemo() {
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)

  const payoffs = {
    'cooperate-cooperate': [-1, -1],
    'cooperate-defect': [-3, 0],
    'defect-cooperate': [0, -3],
    'defect-defect': [-2, -2]
  }

  const getPayoff = () => {
    if (!player1 || !player2) return null
    return payoffs[`${player1}-${player2}`]
  }

  const result = getPayoff()

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <h4 className="text-omniviz-text font-semibold mb-4">Prisoner A</h4>
          <div className="space-y-2">
            <button
              onClick={() => setPlayer1('cooperate')}
              className={`w-full p-3 rounded-lg ${player1 === 'cooperate' ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              🤝 Cooperate (Stay Silent)
            </button>
            <button
              onClick={() => setPlayer1('defect')}
              className={`w-full p-3 rounded-lg ${player1 === 'defect' ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              🗣️ Defect (Betray)
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {result ? (
            <div className="text-center p-4 bg-omniviz-bg rounded-lg">
              <div className="text-omniviz-text-muted text-sm mb-2">Years in Prison</div>
              <div className="text-2xl font-bold">
                <span className="text-blue-400">A: {Math.abs(result[0])}</span>
                {' / '}
                <span className="text-purple-400">B: {Math.abs(result[1])}</span>
              </div>
            </div>
          ) : (
            <div className="text-omniviz-text-muted">Select choices</div>
          )}
        </div>
        <div className="text-center">
          <h4 className="text-omniviz-text font-semibold mb-4">Prisoner B</h4>
          <div className="space-y-2">
            <button
              onClick={() => setPlayer2('cooperate')}
              className={`w-full p-3 rounded-lg ${player2 === 'cooperate' ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              🤝 Cooperate (Stay Silent)
            </button>
            <button
              onClick={() => setPlayer2('defect')}
              className={`w-full p-3 rounded-lg ${player2 === 'defect' ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              🗣️ Defect (Betray)
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-omniviz-bg rounded-lg">
        <h4 className="text-omniviz-text font-semibold mb-3">Payoff Matrix (Years in Prison)</h4>
        <table className="w-full text-center text-sm">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="p-2 text-green-400">B Cooperates</th>
              <th className="p-2 text-red-400">B Defects</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-green-400">A Cooperates</td>
              <td className="p-2 bg-omniviz-surface rounded">(-1, -1)</td>
              <td className="p-2 bg-omniviz-surface rounded">(-3, 0)</td>
            </tr>
            <tr>
              <td className="p-2 text-red-400">A Defects</td>
              <td className="p-2 bg-omniviz-surface rounded">(0, -3)</td>
              <td className="p-2 bg-yellow-500/20 rounded border border-yellow-500">(-2, -2) ★</td>
            </tr>
          </tbody>
        </table>
        <p className="text-omniviz-text-muted text-sm mt-3">
          ★ Nash Equilibrium: Both defect, even though both cooperating would be better collectively.
        </p>
      </div>
    </div>
  )
}

function NashEquilibriumDemo() {
  const [selected, setSelected] = useState(null)

  const games = [
    {
      name: 'Matching Pennies',
      matrix: [[1, -1], [-1, 1]],
      labels: { row: ['Heads', 'Tails'], col: ['Heads', 'Tails'] },
      equilibria: 'Mixed: Both play 50/50',
      desc: 'Zero-sum game with no pure strategy equilibrium'
    },
    {
      name: 'Battle of Sexes',
      matrix: [[3, 0], [0, 2]],
      labels: { row: ['Opera', 'Football'], col: ['Opera', 'Football'] },
      equilibria: 'Pure: (Opera, Opera) or (Football, Football)',
      desc: 'Coordination game with two equilibria'
    },
    {
      name: 'Chicken',
      matrix: [[0, -1], [1, -10]],
      labels: { row: ['Swerve', 'Straight'], col: ['Swerve', 'Straight'] },
      equilibria: 'Pure: (Swerve, Straight) or (Straight, Swerve)',
      desc: 'Anti-coordination game'
    }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {games.map((game, i) => (
          <button
            key={i}
            onClick={() => setSelected(game)}
            className={`px-4 py-2 rounded-lg ${selected === game ? 'bg-purple-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {game.name}
          </button>
        ))}
      </div>
      {selected && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-omniviz-text font-semibold mb-4">Payoff Matrix</h4>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {selected.labels.col.map((l, i) => (
                    <th key={i} className="p-2 text-cyan-400">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.labels.row.map((rowLabel, ri) => (
                  <tr key={ri}>
                    <td className="p-2 text-orange-400">{rowLabel}</td>
                    {selected.matrix[ri].map((cell, ci) => (
                      <td key={ci} className="p-2">
                        <div className="bg-omniviz-bg p-2 rounded">
                          ({cell}, {selected.matrix[ci][ri]})
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-omniviz-text font-semibold mb-4">{selected.name}</h4>
            <p className="text-omniviz-text-muted mb-4">{selected.desc}</p>
            <div className="p-4 bg-purple-500/20 border border-purple-500 rounded-lg">
              <div className="text-purple-400 font-semibold mb-2">Nash Equilibrium</div>
              <div className="text-omniviz-text">{selected.equilibria}</div>
            </div>
            <p className="mt-4 text-omniviz-text-muted text-sm">
              At Nash equilibrium, no player can improve their payoff by unilaterally changing strategy.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function IteratedGameDemo() {
  const [rounds, setRounds] = useState(10)
  const [history, setHistory] = useState([])
  const [scores, setScores] = useState({ player: 0, cpu: 0 })
  const [cpuStrategy, setCpuStrategy] = useState('tit-for-tat')

  const strategies = {
    'always-cooperate': () => 'cooperate',
    'always-defect': () => 'defect',
    'tit-for-tat': (hist) => hist.length === 0 ? 'cooperate' : hist[hist.length - 1].player,
    'random': () => Math.random() > 0.5 ? 'cooperate' : 'defect'
  }

  const play = (playerChoice) => {
    const cpuChoice = strategies[cpuStrategy](history)

    const payoffs = {
      'cooperate-cooperate': [3, 3],
      'cooperate-defect': [0, 5],
      'defect-cooperate': [5, 0],
      'defect-defect': [1, 1]
    }

    const [playerScore, cpuScore] = payoffs[`${playerChoice}-${cpuChoice}`]

    setHistory([...history, { player: playerChoice, cpu: cpuChoice, playerScore, cpuScore }])
    setScores({ player: scores.player + playerScore, cpu: scores.cpu + cpuScore })
  }

  const reset = () => {
    setHistory([])
    setScores({ player: 0, cpu: 0 })
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={cpuStrategy} onChange={(e) => { setCpuStrategy(e.target.value); reset() }} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          <option value="tit-for-tat">Tit for Tat</option>
          <option value="always-cooperate">Always Cooperate</option>
          <option value="always-defect">Always Defect</option>
          <option value="random">Random</option>
        </select>
        <button onClick={reset} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">Reset</button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Your Move (Round {history.length + 1})</h4>
          <div className="space-y-2">
            <button onClick={() => play('cooperate')} disabled={history.length >= rounds} className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
              🤝 Cooperate
            </button>
            <button onClick={() => play('defect')} disabled={history.length >= rounds} className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">
              🗣️ Defect
            </button>
          </div>
          <div className="mt-4 p-3 bg-omniviz-bg rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-omniviz-text">Your Score:</span>
              <span className="text-green-400 font-bold">{scores.player}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-omniviz-text">CPU Score:</span>
              <span className="text-red-400 font-bold">{scores.cpu}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-omniviz-text font-semibold mb-4">History</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {history.map((round, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-omniviz-bg rounded text-sm">
                <span className="text-omniviz-text-muted w-8">R{i + 1}</span>
                <span className={round.player === 'cooperate' ? 'text-green-400' : 'text-red-400'}>You: {round.player}</span>
                <span className="text-omniviz-text-muted">vs</span>
                <span className={round.cpu === 'cooperate' ? 'text-green-400' : 'text-red-400'}>CPU: {round.cpu}</span>
                <span className="ml-auto text-omniviz-text">(+{round.playerScore}, +{round.cpuScore})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AuctionDemo() {
  const [auctionType, setAuctionType] = useState('english')
  const [currentBid, setCurrentBid] = useState(0)
  const [yourBid, setYourBid] = useState(50)
  const [yourValue, setYourValue] = useState(100)
  const [winner, setWinner] = useState(null)

  const otherBidders = [
    { name: 'Bot A', value: Math.floor(Math.random() * 80) + 40 },
    { name: 'Bot B', value: Math.floor(Math.random() * 80) + 40 }
  ]

  const runEnglishAuction = () => {
    let bid = 10
    let lastBidder = null
    const active = [...otherBidders.map((b, i) => ({ ...b, active: true, i })), { name: 'You', value: yourValue, active: true, i: -1 }]

    while (active.filter(b => b.active).length > 1) {
      active.forEach(bidder => {
        if (bidder.active && bidder.value > bid) {
          if (bidder.name === 'You' && bid < yourBid) {
            lastBidder = bidder
            bid += 5
          } else if (bidder.name !== 'You') {
            lastBidder = bidder
            bid += 5
          } else {
            bidder.active = false
          }
        } else {
          bidder.active = false
        }
      })
    }

    setCurrentBid(bid - 5)
    setWinner(lastBidder)
  }

  const runSealedBid = () => {
    const allBids = [{ name: 'You', bid: yourBid }, ...otherBidders.map(b => ({ name: b.name, bid: Math.floor(b.value * 0.8) }))]
    const highestBid = allBids.reduce((max, b) => b.bid > max.bid ? b : max, allBids[0])
    setCurrentBid(highestBid.bid)
    setWinner(highestBid)
  }

  const run = () => {
    if (auctionType === 'english') runEnglishAuction()
    else runSealedBid()
  }

  const reset = () => {
    setCurrentBid(0)
    setWinner(null)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => { setAuctionType('english'); reset() }} className={`px-4 py-2 rounded-lg ${auctionType === 'english' ? 'bg-cyan-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          English Auction
        </button>
        <button onClick={() => { setAuctionType('sealed'); reset() }} className={`px-4 py-2 rounded-lg ${auctionType === 'sealed' ? 'bg-cyan-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Sealed-Bid
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="text-omniviz-text text-sm">Your valuation: ${yourValue}</label>
            <input type="range" min="50" max="150" value={yourValue} onChange={(e) => setYourValue(Number(e.target.value))} className="w-full" />
          </div>
          <div className="mb-4">
            <label className="text-omniviz-text text-sm">Your {auctionType === 'sealed' ? 'bid' : 'max bid'}: ${yourBid}</label>
            <input type="range" min="10" max="150" value={yourBid} onChange={(e) => setYourBid(Number(e.target.value))} className="w-full" />
          </div>
          <button onClick={run} className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            Run Auction
          </button>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-4">Auction Result</h4>
          {winner ? (
            <>
              <div className="text-center mb-4">
                <div className="text-omniviz-text-muted text-sm">Winner</div>
                <div className={`text-2xl font-bold ${winner.name === 'You' ? 'text-green-400' : 'text-red-400'}`}>{winner.name}</div>
              </div>
              <div className="text-center">
                <div className="text-omniviz-text-muted text-sm">Final Price</div>
                <div className="text-xl font-bold text-cyan-400">${currentBid}</div>
              </div>
              {winner.name === 'You' && (
                <div className="mt-4 p-2 bg-green-500/20 rounded text-center">
                  <span className="text-green-400">Profit: ${yourValue - currentBid}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-omniviz-text-muted text-center">Set your bid and run the auction</div>
          )}
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm">
        {auctionType === 'english' ? 'English: Price rises until one bidder remains. Bidding your true value is optimal.' : 'Sealed-bid: Everyone submits once. Optimal to bid below your value (shade your bid).'}
      </p>
    </div>
  )
}

export default GameTheoryConcept
