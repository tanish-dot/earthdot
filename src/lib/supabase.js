import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValid = SUPABASE_URL?.startsWith('https://') && SUPABASE_ANON_KEY?.length > 20

export const supabase = isValid ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null
