import { createClient } from "@supabase/supabase-js";

const supabaseUrl ='https://jmvbefqtluirdokbnfhp.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdmJlZnF0bHVpcmRva2JuZmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MjQ1MDQsImV4cCI6MjA3ODEwMDUwNH0.von5DPhU_uVgJ4-hZua3wA8pfcSIhXacCdxTtJblNZY';
export const supabase = createClient (supabaseUrl,supabaseKey);