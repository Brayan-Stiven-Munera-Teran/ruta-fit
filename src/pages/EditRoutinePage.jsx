import { useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import RoutineForm from '../components/RoutineForm'
import { updateRoutine } from '../services/routinesApi'

function EditRoutinePage() {
  const routine = useLoaderData()
  const navigate = useNavigate()

  const handleUpdate = async (updatedData) => {
    try {
      await updateRoutine(routine.id, {
        ...updatedData,
        id: routine.id,
      })
      toast.success('Rutina actualizada correctamente.')
      navigate(`/routines/${routine.id}`)
    } catch (err) {
      toast.error(err.message || 'No se pudo actualizar la rutina.')
    }
  }

  return (
    <>
      <title>{`Editar ${routine.title} | Ruta Fit`}</title>
      <meta
        name="description"
        content={`Actualiza los ejercicios, pasos o duración de la rutina ${routine.title}.`}
      />
      <section className="py-10">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
              Editar rutina
            </h1>
            <RoutineForm
              initialData={routine}
              onSubmit={handleUpdate}
              submitLabel="Guardar cambios"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default EditRoutinePage
