const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ldamaiupxmeejjcbuals.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYW1haXVweG1lZWpqY2J1YWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxOTQ2MDAsImV4cCI6MjAxNTc3MDYwMH0.XTDNRfuvXoXI7F_qL-KKMxyjbbQfR275ppseL6TJ3Fg";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
