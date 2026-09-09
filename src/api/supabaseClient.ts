import { City } from '../types'

const GITHUB_PAGES_URL = import.meta.env.VITE_GITHUB_PAGES_URL as string

export async function fetchCities(): Promise<City[]> {
  const url = `${GITHUB_PAGES_URL}/cities.json?v=${new Date().toDateString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
