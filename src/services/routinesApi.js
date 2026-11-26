const API_URL = '/api/routines'

function extractList(payload) {
  return Array.isArray(payload) ? payload : payload.data ?? []
}

/**
 * Obtiene todas las rutinas registradas en la API.
 */
export async function getRoutines(options = {}) {
  const response = await fetch(API_URL, options)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las rutinas. Intenta de nuevo.')
  }
  const data = await response.json()
  return extractList(data)
}

/**
 * Obtiene las rutinas más recientes ordenadas por fecha de creación descendente.
 */
export async function getLatestRoutines(limit = 3, options = {}) {
  const response = await fetch(
    `${API_URL}?_sort=-createdAt&_per_page=${limit}`,
    options
  )
  if (!response.ok) {
    throw new Error('No se pudieron cargar las rutinas recientes.')
  }
  const data = await response.json()
  return extractList(data).slice(0, limit)
}

/**
 * Obtiene el detalle de una rutina por su identificador.
 */
export async function getRoutineById(id) {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Response('No encontramos la rutina solicitada.', {
      status: response.status,
    })
  }
  return response.json()
}

/**
 * Crea una nueva rutina en la API.
 */
export async function createRoutine(newRoutine) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRoutine),
  })
  if (!response.ok) {
    throw new Error('No se pudo guardar la rutina. Intenta de nuevo.')
  }
  return response.json()
}

/**
 * Reemplaza los datos de una rutina existente.
 */
export async function updateRoutine(id, updatedRoutine) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRoutine),
  })
  if (!response.ok) {
    throw new Error('No se pudo actualizar la rutina. Intenta de nuevo.')
  }
  return response.json()
}

/**
 * Elimina una rutina por su identificador.
 */
export async function deleteRoutine(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('No se pudo eliminar la rutina. Intenta de nuevo.')
  }
}
