import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import RoutineCard from '../components/RoutineCard'
import Spinner from '../components/Spinner'
import { getFavoriteRoutines } from '../services/routinesApi'

function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadFavorites() {
      try {
        setLoading(true)
        setError('')
        const data = await getFavoriteRoutines({ signal: controller.signal })
        setFavorites(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'No se pudieron cargar tus rutinas favoritas.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadFavorites()
    return () => controller.abort()
  }, [])

  const handleFavoriteChange = (routineId, isFavorite) => {
    if (!isFavorite) {
      setFavorites((prev) => prev.filter((item) => item.id !== routineId))
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Rutinas favoritas
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Accede rápido a las rutinas que marcaste como favoritas.
          </p>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div
            role="alert"
            className="mx-auto max-w-xl rounded-lg border border-rose-200 bg-rose-50 p-4 text-center text-rose-700"
          >
            {error}
          </div>
        ) : favorites.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">
              Aún no has marcado ninguna rutina como favorita.
            </p>
            <Link
              to="/routines"
              className="mt-5 inline-block min-w-44 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Explorar rutinas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {favorites.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FavoritesPage
