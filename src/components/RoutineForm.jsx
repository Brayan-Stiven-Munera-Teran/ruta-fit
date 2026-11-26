import { useRef, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import FormInput from './FormInput'

const CATEGORIES = ['Fuerza', 'Cardio', 'Movilidad', 'Core', 'HIIT']
const DIFFICULTIES = ['Fácil', 'Media', 'Difícil']
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function createRowId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function buildInitialExercises(initialData) {
  if (initialData?.exercises?.length) {
    return initialData.exercises.map((ex) => ({
      id: createRowId(),
      name: ex.name ?? '',
      reps: ex.reps ?? '',
    }))
  }
  return [{ id: createRowId(), name: '', reps: '' }]
}

function buildInitialSteps(initialData) {
  if (initialData?.steps?.length) {
    return initialData.steps.map((text) => ({
      id: createRowId(),
      text: text ?? '',
    }))
  }
  return [{ id: createRowId(), text: '' }]
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
  const [duration, setDuration] = useState(
    initialData?.duration !== undefined ? String(initialData.duration) : '30'
  )
  const [rounds, setRounds] = useState(
    initialData?.rounds !== undefined ? String(initialData.rounds) : '3'
  )
  const [description, setDescription] = useState(
    initialData?.description ?? ''
  )
  const [exercises, setExercises] = useState(() =>
    buildInitialExercises(initialData)
  )
  const [steps, setSteps] = useState(() => buildInitialSteps(initialData))
  const [trainerName, setTrainerName] = useState(
    initialData?.trainer?.name ?? ''
  )
  const [trainerEmail, setTrainerEmail] = useState(
    initialData?.trainer?.email ?? ''
  )
  const [trainerBio, setTrainerBio] = useState(
    initialData?.trainer?.bio ?? ''
  )
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const titleRef = useRef(null)
  const durationRef = useRef(null)
  const roundsRef = useRef(null)
  const descriptionRef = useRef(null)
  const trainerNameRef = useRef(null)
  const trainerEmailRef = useRef(null)

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleExerciseChange = (id, field, value) => {
    setExercises((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
    clearError('exercises')
  }

  const handleAddExercise = () => {
    setExercises((prev) => [...prev, { id: createRowId(), name: '', reps: '' }])
  }

  const handleRemoveExercise = (id) => {
    setExercises((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    )
  }

  const handleStepChange = (id, value) => {
    setSteps((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: value } : item))
    )
    clearError('steps')
  }

  const handleAddStep = () => {
    setSteps((prev) => [...prev, { id: createRowId(), text: '' }])
  }

  const handleRemoveStep = (id) => {
    setSteps((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    )
  }

  const validate = () => {
    const nextErrors = {}

    if (title.trim().length < 3) {
      nextErrors.title = 'Ingresa un título de al menos 3 caracteres.'
    }

    const parsedDuration = Number(duration)
    if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
      nextErrors.duration = 'La duración debe ser un número entero mayor a 0.'
    }

    const parsedRounds = Number(rounds)
    if (!Number.isInteger(parsedRounds) || parsedRounds < 1 || parsedRounds > 20) {
      nextErrors.rounds = 'Las rondas deben ser un número entero entre 1 y 20.'
    }

    if (description.trim().length < 10) {
      nextErrors.description = 'Escribe una descripción de al menos 10 caracteres.'
    }

    const validExercises = exercises.filter(
      (ex) => ex.name.trim() !== '' && ex.reps.trim() !== ''
    )
    const hasIncompleteExercise = exercises.some(
      (ex) =>
        (ex.name.trim() !== '' && ex.reps.trim() === '') ||
        (ex.name.trim() === '' && ex.reps.trim() !== '')
    )
    if (validExercises.length === 0) {
      nextErrors.exercises =
        'Agrega al menos 1 ejercicio con su nombre y series/tiempo.'
    } else if (hasIncompleteExercise) {
      nextErrors.exercises =
        'Completa tanto el nombre como las series/tiempo en cada fila de ejercicio.'
    }

    const validSteps = steps.filter((step) => step.text.trim() !== '')
    if (validSteps.length === 0) {
      nextErrors.steps = 'Agrega al menos 1 paso de ejecución.'
    }

    if (trainerName.trim().length < 2) {
      nextErrors.trainerName = 'Ingresa el nombre del entrenador.'
    }

    if (!EMAIL_REGEX.test(trainerEmail.trim())) {
      nextErrors.trainerEmail = 'Ingresa un correo electrónico válido.'
    }

    return nextErrors
  }

  const focusFirstError = (validationErrors) => {
    const refOrder = [
      ['title', titleRef],
      ['duration', durationRef],
      ['rounds', roundsRef],
      ['description', descriptionRef],
      ['trainerName', trainerNameRef],
      ['trainerEmail', trainerEmailRef],
    ]
    const firstMatch = refOrder.find(([field]) => validationErrors[field])
    firstMatch?.[1]?.current?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      focusFirstError(validationErrors)
      return
    }

    const payload = {
      title: title.trim(),
      category,
      difficulty,
      duration: Number(duration),
      rounds: Number(rounds),
      description: description.trim(),
      exercises: exercises
        .filter((ex) => ex.name.trim() !== '' && ex.reps.trim() !== '')
        .map((ex) => ({ name: ex.name.trim(), reps: ex.reps.trim() })),
      steps: steps.map((step) => step.text.trim()).filter(Boolean),
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

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
        : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/30'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormInput
        id="title"
        name="title"
        type="text"
        label="Título de la rutina"
        placeholder="Ej. Fuerza Full Body en Casa"
        ref={titleRef}
        value={title}
        error={errors.title}
        onChange={(e) => {
          setTitle(e.target.value)
          clearError('title')
        }}
      />

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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass('category')}
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
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={inputClass('difficulty')}
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
        <FormInput
          id="duration"
          name="duration"
          type="number"
          min="1"
          label="Duración (minutos)"
          ref={durationRef}
          value={duration}
          error={errors.duration}
          onChange={(e) => {
            setDuration(e.target.value)
            clearError('duration')
          }}
        />

        <FormInput
          id="rounds"
          name="rounds"
          type="number"
          min="1"
          max="20"
          label="Rondas (1 a 20)"
          ref={roundsRef}
          value={rounds}
          error={errors.rounds}
          onChange={(e) => {
            setRounds(e.target.value)
            clearError('rounds')
          }}
        />
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
          ref={descriptionRef}
          placeholder="Describe el objetivo y enfoque de la rutina..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            clearError('description')
          }}
          className={inputClass('description')}
        />
        {errors.description && (
          <p className="mt-1 text-xs font-medium text-rose-600">
            {errors.description}
          </p>
        )}
      </div>

      <fieldset className="space-y-3 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-2">
          <legend className="text-sm font-bold text-slate-900">
            Ejercicios
          </legend>
          <button
            type="button"
            onClick={handleAddExercise}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            <FaPlus aria-hidden="true" />
            Agregar ejercicio
          </button>
        </div>

        <div className="space-y-2.5">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_180px_auto]"
            >
              <div>
                <label
                  htmlFor={`exercise-name-${exercise.id}`}
                  className="sr-only"
                >
                  Nombre del ejercicio {index + 1}
                </label>
                <input
                  id={`exercise-name-${exercise.id}`}
                  type="text"
                  placeholder="Ej. Sentadillas profundas"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, 'name', e.target.value)
                  }
                  className={inputClass('exercises')}
                />
              </div>

              <div>
                <label
                  htmlFor={`exercise-reps-${exercise.id}`}
                  className="sr-only"
                >
                  Series o tiempo del ejercicio {index + 1}
                </label>
                <input
                  id={`exercise-reps-${exercise.id}`}
                  type="text"
                  placeholder="Ej. 15 reps o 40 seg"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, 'reps', e.target.value)
                  }
                  className={inputClass('exercises')}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveExercise(exercise.id)}
                disabled={exercises.length === 1}
                aria-label={`Quitar ejercicio ${index + 1}`}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaTrash aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        {errors.exercises && (
          <p className="text-xs font-medium text-rose-600">{errors.exercises}</p>
        )}
      </fieldset>

      <fieldset className="space-y-3 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-2">
          <legend className="text-sm font-bold text-slate-900">
            Pasos de ejecución
          </legend>
          <button
            type="button"
            onClick={handleAddStep}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            <FaPlus aria-hidden="true" />
            Agregar paso
          </button>
        </div>

        <div className="space-y-2.5">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <span className="w-6 text-center text-xs font-bold text-slate-500">
                {index + 1}.
              </span>
              <div className="flex-1">
                <label htmlFor={`step-${step.id}`} className="sr-only">
                  Paso {index + 1}
                </label>
                <input
                  id={`step-${step.id}`}
                  type="text"
                  placeholder="Describe este paso de la rutina..."
                  value={step.text}
                  onChange={(e) => handleStepChange(step.id, e.target.value)}
                  className={inputClass('steps')}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStep(step.id)}
                disabled={steps.length === 1}
                aria-label={`Quitar paso ${index + 1}`}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaTrash aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        {errors.steps && (
          <p className="text-xs font-medium text-rose-600">{errors.steps}</p>
        )}
      </fieldset>

      <fieldset className="space-y-4 border-t border-slate-200 pt-5">
        <legend className="text-base font-bold text-slate-900">
          Datos del entrenador
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="trainerName"
            name="trainerName"
            type="text"
            label="Nombre"
            placeholder="Ej. Camila Restrepo"
            ref={trainerNameRef}
            value={trainerName}
            error={errors.trainerName}
            onChange={(e) => {
              setTrainerName(e.target.value)
              clearError('trainerName')
            }}
          />

          <FormInput
            id="trainerEmail"
            name="trainerEmail"
            type="email"
            label="Correo electrónico"
            placeholder="entrenador@rutafit.com"
            ref={trainerEmailRef}
            value={trainerEmail}
            error={errors.trainerEmail}
            onChange={(e) => {
              setTrainerEmail(e.target.value)
              clearError('trainerEmail')
            }}
          />
        </div>

        <FormInput
          id="trainerBio"
          name="trainerBio"
          type="text"
          label="Biografía (opcional)"
          placeholder="Especialidad o experiencia del entrenador"
          value={trainerBio}
          onChange={(e) => setTrainerBio(e.target.value)}
        />
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
