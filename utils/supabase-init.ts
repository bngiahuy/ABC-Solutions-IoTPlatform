import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jbeqbqdjzvxggxxehdur.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)
if (supabase) console.log('Connected Database')
export default supabase
