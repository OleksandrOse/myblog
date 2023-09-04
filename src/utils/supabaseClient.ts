import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eslkgkldpgnfaruubcei.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbGtna2xkcGduZmFydXViY2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NDQxOTcsImV4cCI6MjAwOTMyMDE5N30.w1Se0M6AwPbmRz2cjIMll91W6_-QgeSVH37j1rRyqUs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
