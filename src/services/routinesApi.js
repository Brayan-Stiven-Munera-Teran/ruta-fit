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
