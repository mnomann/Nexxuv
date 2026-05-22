import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://twynloqvltyhtxcqmjwv.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3eW5sb3F2bHR5aHR4Y3Ftand2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTQyMTQsImV4cCI6MjA5NDk5MDIxNH0._whn4LV79QJv3pU5zJhYpr0Wl2Di___5vxsOMe-qj0Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
