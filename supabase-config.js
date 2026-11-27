// SOLE HOUSE Supabase browser configuration. Publishable keys are intended for client-side use.
// Never place a Supabase secret/service_role key in frontend files.
(function(){
  const SUPABASE_URL = 'https://rvneddbntmaxfriakpsq.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_epMIR6yP0jifz4bDEEdu0w_K9UthBkb';
  if (!window.supabase || !window.supabase.createClient) {
    console.error('Supabase JS SDK did not load. Check your internet connection.');
    window.SOLE_HOUSE_SUPABASE = null;
    return;
  }
  window.SOLE_HOUSE_SUPABASE = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
