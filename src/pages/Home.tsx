import { useEffect, useState } from 'react'
import Scorecard from '../components/Scorecard'
import Heading from '../components/Heading'
import { useLeaderboardApi } from '../api/leaderboard'
import type LeaderboardEntry from '../types/LeaderboardEntry'
import BottomBar from '../components/BottomBar'

function Scores() {
  const useLeaderboard = useLeaderboardApi()

  const [rankings, setRankings] = useState<LeaderboardEntry[]>()

  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await useLeaderboard.getLeaderboard({start: "2026-02-01", end: "2026-02-28"})

      if(response.ok){
         setRankings(response.data)
      }
      // TODO: Error
    }

    getLeaderboard()
  }, [])


  return (
    <>
      {rankings && rankings?.length > 1 ?
        <Heading text="Stand"/>
        :
        <Heading text="Stand" subtitle='Geen gespeelde potjes'/>
      }
      <div className="scores mb-20">
        {rankings?.map((ranking) => (
          <Scorecard {...ranking} key={ranking.position}/>
        ))}
      </div>
      <BottomBar/>
    </>
  )
}

export default Scores
