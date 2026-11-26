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
 * Obtiene una página de rutinas usando _page y _per_page de json-server 1.x.
 */
export async function getRoutinesPage(page = 1, perPage = 6, options = {}) {
  const response = await fetch(
    `${API_URL}?_page=${page}&_per_page=${perPage}`,
    options
  )
  if (!response.ok) {
    throw new Error('No se pudieron cargar las rutinas. Intenta de nuevo.')
  }
  const payload = await response.json()
  if (Array.isArray(payload)) {
    return {
      data: payload,
      pages: 1,
      items: payload.length,
      prev: null,
      next: null,
    }
  }
  return {
    data: payload.data ?? [],
    pages: payload.pages ?? 1,
    items: payload.items ?? (payload.data?.length ?? 0),
    prev: payload.prev ?? null,
    next: payload.next ?? null,
  }
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

/**
 * Obtiene las rutinas marcadas como favoritas.
 */
export async function getFavoriteRoutines(options = {}) {
  const response = await fetch(`${API_URL}?favorite=true`, options)
  if (!response.ok) {
    throw new Error('No se pudieron cargar tus rutinas favoritas.')
  }
  const data = await response.json()
  return extractList(data)
}

/**
 * Actualiza parcialmente el estado de favorita de una rutina mediante PATCH.
 */
export async function toggleFavorite(id, favorite) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite }),
  })
  if (!response.ok) {
    throw new Error('No se pudo actualizar el estado de favorita.')
  }
  return response.json()
}
