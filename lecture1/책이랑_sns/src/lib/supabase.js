// Supabase 클라이언트 설정
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spyfmwdpiocrxejsuthn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWZtd2RwaW9jcnhlanN1dGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MjMwODgsImV4cCI6MjA4NDE5OTA4OH0.eVtYvisQhwxA_XftIYBC44OHqGUtVJ1yd_8S5otbFdY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
