import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import RoutineForm from '../components/RoutineForm'
import { createRoutine } from '../services/routinesApi'

function AddRoutinePage() {
  const navigate = useNavigate()

  const handleCreate = async (newRoutine) => {
    try {
      const created = await createRoutine(newRoutine)
      toast.success('Rutina creada correctamente.')
      navigate(`/routines/${created.id}`)
    } catch (err) {
      toast.error(err.message || 'No se pudo crear la rutina.')
    }
  }

  return (
    <>
      <title>Nueva rutina | Ruta Fit</title>
      <meta
        name="description"
        content="Publica una nueva rutina de ejercicio con ejercicios, pasos y datos del entrenador en Ruta Fit."
      />
      <section className="py-10">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
              Nueva rutina
            </h1>
            <RoutineForm onSubmit={handleCreate} submitLabel="Publicar rutina" />
          </div>
        </div>
      </section>
    </>
  )
}

export default AddRoutinePage
