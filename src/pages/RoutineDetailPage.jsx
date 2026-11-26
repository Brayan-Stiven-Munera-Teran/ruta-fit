import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { FaArrowLeft, FaClock, FaEnvelope, FaRedo, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteRoutine } from '../services/routinesApi'

function RoutineDetailPage() {
  const routine = useLoaderData()
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la rutina "${routine.title}"?`
    )
    if (!confirmed) {
      return
    }

    try {
      setIsDeleting(true)
      await deleteRoutine(routine.id)
      toast.success('Rutina eliminada correctamente.')
      navigate('/routines')
    } catch (err) {
      toast.error(err.message || 'No se pudo eliminar la rutina.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/routines"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <FaArrowLeft aria-hidden="true" />
            Volver al listado
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[70%_30%]">
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {routine.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    Dificultad: {routine.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900">
                  {routine.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-6 text-sm font-medium text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <FaClock className="text-emerald-600" aria-hidden="true" />
                    {routine.duration} minutos
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaRedo className="text-emerald-600" aria-hidden="true" />
                    {routine.rounds} rondas
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-emerald-900">
                  Descripción
                </h2>
                <p className="leading-relaxed text-slate-700">
                  {routine.description}
                </p>

                <h2 className="mt-6 mb-3 text-lg font-bold text-emerald-900">
                  Ejercicios
                </h2>
                <ul className="space-y-2">
                  {routine.exercises?.map((exercise, index) => (
                    <li
                      key={`${exercise.name}-${index}`}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-sm"
                    >
                      <span className="font-medium text-slate-800">
                        {exercise.name}
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {exercise.reps}
                      </span>
                    </li>
                  ))}
                </ul>

                <h2 className="mt-6 mb-3 text-lg font-bold text-emerald-900">
                  Pasos de ejecución
                </h2>
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {routine.steps?.map((step, index) => (
                    <li key={`${step.slice(0, 15)}-${index}`}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Entrenador
                </h2>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-2 font-semibold text-slate-900">
                    <FaUser className="text-emerald-600" aria-hidden="true" />
                    {routine.trainer?.name}
                  </p>
                  {routine.trainer?.bio && (
                    <p className="text-slate-600">{routine.trainer.bio}</p>
                  )}
                  <p className="inline-flex items-center gap-2 pt-2 text-slate-600">
                    <FaEnvelope className="text-emerald-600" aria-hidden="true" />
                    {routine.trainer?.email}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Administrar rutina
                </h2>
                <div className="flex flex-col gap-3">
                  <Link
                    to={`/edit-routine/${routine.id}`}
                    className="block w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Editar rutina
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
                  >
                    {isDeleting ? 'Eliminando...' : 'Eliminar rutina'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default RoutineDetailPage
