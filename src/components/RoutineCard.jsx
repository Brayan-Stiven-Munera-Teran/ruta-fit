import { useState } from 'react'
import { Link } from 'react-router'
import { FaClock, FaRedo, FaUser } from 'react-icons/fa'
import FavoriteButton from './FavoriteButton'

const MAX_DESCRIPTION_LENGTH = 95

const DIFFICULTY_STYLES = {
  Fácil: 'bg-emerald-100 text-emerald-800',
  Media: 'bg-amber-100 text-amber-800',
  Difícil: 'bg-rose-100 text-rose-800',
}

function RoutineCard({ routine, onFavoriteChange }) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const description = routine.description ?? ''
  const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH
  const displayedDescription =
    showFullDescription || !isLongDescription
      ? description
      : `${description.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}...`

  const difficultyBadge =
    DIFFICULTY_STYLES[routine.difficulty] ?? 'bg-slate-100 text-slate-800'

  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-sm font-semibold text-emerald-700">
              {routine.category}
            </span>
            <span className={`rounded-full px-3.5 py-1 text-sm font-semibold ${difficultyBadge}`}>
              {routine.difficulty}
            </span>
          </div>
          <FavoriteButton
            routineId={routine.id}
            initialFavorite={routine.favorite}
            onFavoriteChange={onFavoriteChange}
          />
        </div>

        <h3 className="text-2xl font-bold text-slate-900">{routine.title}</h3>

        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {displayedDescription}
        </p>

        {isLongDescription && (
          <button
            type="button"
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="mt-2 rounded text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {showFullDescription ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="text-emerald-600" aria-hidden="true" />
            {routine.duration} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaRedo className="text-emerald-600" aria-hidden="true" />
            {routine.rounds} rondas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaUser className="text-emerald-600" aria-hidden="true" />
            {routine.trainer?.name}
          </span>
        </div>

        <Link
          to={`/routines/${routine.id}`}
          className="inline-block w-full rounded-lg bg-emerald-600 px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-emerald-700"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default RoutineCard
