// services/journalService.js
import { supabase } from '../supabase';

export const fetchEntries = async () => {
  let { data: entries, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching entries:', error);
    return [];
  }

  return entries;
};

export const deleteEntry = async (id) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .delete()
      .match({ id });
  
    return { data, error };
  };
