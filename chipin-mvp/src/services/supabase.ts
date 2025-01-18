
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = 'https://xgdlcuyinswwcavrruqn.supabase.co';//import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZGxjdXlpbnN3d2NhdnJydXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMzYxMjYsImV4cCI6MjA0MTcxMjEyNn0.XKamxNqLHYIx66APQPPSPryN6ZLuFt4dBzLzT6telv8';//import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;