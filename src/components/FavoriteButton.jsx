import { useOptimistic, useState, useTransition } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { toggleFavorite } from '../services/routinesApi'

function FavoriteButton({ routineId, initialFavorite = false, onFavoriteChange }) {
  const [favorite, setFavorite] = useState(Boolean(initialFavorite))
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    favorite,
    (_current, nextValue) => nextValue
  )
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    const nextValue = !optimisticFavorite

    startTransition(async () => {
      setOptimisticFavorite(nextValue)
      try {
        await toggleFavorite(routineId, nextValue)
        setFavorite(nextValue)
        onFavoriteChange?.(routineId, nextValue)
      } catch (err) {
        toast.error(err.message || 'No se pudo actualizar favorita.')
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={
        optimisticFavorite ? 'Quitar de favoritas' : 'Agregar a favoritas'
      }
      aria-pressed={optimisticFavorite}
      className={`inline-flex items-center justify-center rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-rose-400 ${
        optimisticFavorite
          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
          : 'bg-slate-150 text-slate-500 hover:bg-rose-50 hover:text-rose-500'
      }`}
    >
      {optimisticFavorite ? (
        <FaHeart className="h- w-4" aria-hidden="true" />
      ) : (
        <FaRegHeart className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default FavoriteButton
