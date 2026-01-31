import { use, useState } from 'react'
import Scorecard from '../components/Scorecard'
import { useNavigate } from 'react-router'
import Heading from '../components/Heading'

function Scores() {
  const navigate = useNavigate()
  const [rankings, setRankings] = useState([
    {
      "name": "Sten",
      "ranking": 1,
      "matches": 14,
      "won": 3,
      "weighted_avg": 2.1
    },
    {
      "name": "Stan",
      "ranking": 2,
      "matches": 8,
      "won": 2,
      "weighted_avg": 2.9
    },
    {
      "name": "Atiye",
      "ranking": 3,
      "matches": 4,
      "won": 1,
      "weighted_avg": 3.4
    },
    {
      "name": "Ellen",
      "ranking": 4,
      "matches": 19,
      "won": 2,
      "weighted_avg": 3.8
    }
  ])

  return (
    <>
      <Heading text="Stand" subtitle='Deze maand - Gemiddelde plaats'/>
      <div className="scores">
        {rankings.map((ranking, index) => (
          <Scorecard {...ranking} key={index} />
        ))}
      </div>
      <button onClick={() => navigate('/new')}
        className='bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white fixed bottom-6 right-6 py-4 px-8 cursor-pointer'>
        Nieuw spel
      </button>
    </>
  )
}

export default Scores
