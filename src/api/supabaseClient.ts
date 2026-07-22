import { createClient } from '@supabase/supabase-js'
import { City } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data as City[]
}
