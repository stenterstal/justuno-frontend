import Scorecard from '../components/Scorecard'
import Heading from '../components/Heading'
import type LeaderboardEntry from '../types/LeaderboardEntry'
import BottomBar from '../components/BottomBar'
import { NavLink, useLoaderData } from 'react-router'

function Scores() {
  const { rankings, dates } = useLoaderData() as {
    rankings: LeaderboardEntry[];
    dates: {min: string, max: string}
  };

  return (
    <>
      <Heading text="Stand" subtitle={rankings.length == 0 ? 'Geen gespeelde potjes' : ''} endText={
        <NavLink className='flex gap-1 mr-2 md:mr-4' to={'/info'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p>Score</p>
        </NavLink>
        }/>
      <div className="scores mb-20">
        {rankings?.map((ranking) => (
          <Scorecard {...ranking} key={ranking.position}/>
        ))}
      </div>
      <BottomBar {...dates} />
    </>
  )
}

export default Scores
