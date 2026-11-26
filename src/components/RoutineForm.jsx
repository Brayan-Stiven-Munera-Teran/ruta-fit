import { useState } from 'react'

const CATEGORIES = ['Fuerza', 'Cardio', 'Movilidad', 'Core', 'HIIT']
const DIFFICULTIES = ['Fácil', 'Media', 'Difícil']

function formatExercisesText(exercises = []) {
  return exercises.map((ex) => `${ex.name} | ${ex.reps}`).join('\n')
}

function parseExercises(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [rawName, ...rest] = line.split('|')
      return {
        name: rawName.trim(),
        reps: rest.join('|').trim() || '1 serie',
      }
    })
}

function parseSteps(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function RoutineForm({
  initialData = null,
  onSubmit,
  submitLabel = 'Guardar rutina',
}) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'Fuerza')
  const [difficulty, setDifficulty] = useState(
    initialData?.difficulty ?? 'Fácil'
  )
  const [duration, setDuration] = useState(initialData?.duration ?? 30)
  const [rounds, setRounds] = useState(initialData?.rounds ?? 3)
  const [description, setDescription] = useState(
    initialData?.description ?? ''
  )
  const [exercisesText, setExercisesText] = useState(
    initialData ? formatExercisesText(initialData.exercises) : ''
  )
  const [stepsText, setStepsText] = useState(
    initialData ? initialData.steps.join('\n') : ''
  )
  const [trainerName, setTrainerName] = useState(
    initialData?.trainer?.name ?? ''
  )
  const [trainerEmail, setTrainerEmail] = useState(
    initialData?.trainer?.email ?? ''
  )
  const [trainerBio, setTrainerBio] = useState(
    initialData?.trainer?.bio ?? ''
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      title: title.trim(),
      category,
      difficulty,
      duration: Number(duration),
      rounds: Number(rounds),
      description: description.trim(),
      exercises: parseExercises(exercisesText),
      steps: parseSteps(stepsText),
      favorite: initialData?.favorite ?? false,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      trainer: {
        name: trainerName.trim(),
        email: trainerEmail.trim(),
        bio: trainerBio.trim(),
      },
    }

    try {
      setIsSubmitting(true)
      await onSubmit(payload)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Título de la rutina
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Ej. Fuerza Full Body en Casa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Categoría
          </label>
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="difficulty"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Dificultad
          </label>
          <select
            id="difficulty"
            name="difficulty"
            required
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            {DIFFICULTIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="duration"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Duración (minutos)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min="1"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div>
          <label
            htmlFor="rounds"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Rondas (1 a 20)
          </label>
          <input
            id="rounds"
            name="rounds"
            type="number"
            min="1"
            max="20"
            required
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          required
          placeholder="Describe el objetivo y enfoque de la rutina..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <div>
        <label
          htmlFor="exercises"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Ejercicios (uno por línea: Nombre | Series o tiempo)
        </label>
        <textarea
          id="exercises"
          name="exercises"
          rows="4"
          required
          placeholder={'Sentadillas | 15 reps\nPlancha frontal | 45 seg'}
          value={exercisesText}
          onChange={(e) => setExercisesText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <div>
        <label
          htmlFor="steps"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Pasos (uno por línea)
        </label>
        <textarea
          id="steps"
          name="steps"
          rows="4"
          required
          placeholder={'Calienta 5 minutos.\nDescansa 60 segundos entre rondas.'}
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <fieldset className="space-y-4 border-t border-slate-200 pt-5">
        <legend className="text-base font-bold text-slate-900">
          Datos del entrenador
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="trainerName"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Nombre
            </label>
            <input
              id="trainerName"
              name="trainerName"
              type="text"
              required
              placeholder="Ej. Camila Restrepo"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label
              htmlFor="trainerEmail"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Correo electrónico
            </label>
            <input
              id="trainerEmail"
              name="trainerEmail"
              type="email"
              required
              placeholder="entrenador@rutafit.com"
              value={trainerEmail}
              onChange={(e) => setTrainerEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="trainerBio"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Biografía (opcional)
          </label>
          <input
            id="trainerBio"
            name="trainerBio"
            type="text"
            placeholder="Especialidad o experiencia del entrenador"
            value={trainerBio}
            onChange={(e) => setTrainerBio(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export default RoutineForm
