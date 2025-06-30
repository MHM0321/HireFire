import {createClient} from @supabase/supabase-js

const supabaseUrl = "https://yhsmusbwjqyledwoobmm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloc211c2J3anF5bGVkd29vYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE1NjIsImV4cCI6MjA2Njg2NzU2Mn0.MmeVmSe1GMBl-q98iRwVWcGlNi2mP4jktl9cPRAS2LE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)