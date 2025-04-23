import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://daisltwqqluqqujyatgb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaXNsdHdxcWx1cXF1anlhdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODM4MzUsImV4cCI6MjA2MDk1OTgzNX0.Z4wuIeg9VzaU3cq0SmSx8k-KSioo0lM6kaC4_pwDDW4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
