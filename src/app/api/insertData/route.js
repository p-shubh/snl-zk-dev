import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseKey);

      const data = [{ game_id: 1, contract_address: "testing" }];

      const { data: insertedData, error } = await supabase.from('snl_sui').insert(data);

      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: 'Data inserted successfully', data: insertedData });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }
