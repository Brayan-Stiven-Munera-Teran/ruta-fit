import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import RoutineListings from '../components/RoutineListings'
import ViewAllRoutines from '../components/ViewAllRoutines'

function HomePage() {
  return (
    <>
      <Hero />
      <HomeCards />
      <RoutineListings isHome={true} />
      <ViewAllRoutines />
    </>
  )
}

export default HomePage
