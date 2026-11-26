import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import RoutineListings from '../components/RoutineListings'
import ViewAllRoutines from '../components/ViewAllRoutines'

function HomePage() {
  return (
    <>
      <title>Inicio | Ruta Fit</title>
      <meta
        name="description"
        content="Explora, crea y organiza rutinas de ejercicio de fuerza, cardio, HIIT, core y movilidad en Ruta Fit."
      />
      <Hero />
      <HomeCards />
      <RoutineListings isHome={true} />
      <ViewAllRoutines />
    </>
  )
}

export default HomePage
