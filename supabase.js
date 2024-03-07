// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ixcatoaegccrwioggybz.supabase.co'; // Get this from your Supabase project settings
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Y2F0b2FlZ2Njcndpb2dneWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4Mzg2NTIsImV4cCI6MjAyNTQxNDY1Mn0.g3cBctFWrsYFVDWe8DImhaPVSqbOfLPF0HE9CiGxtJU'; // Get this from your Supabase project settings

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
