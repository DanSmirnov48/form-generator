import { supabase } from "@/server/utils/supabase";
import { FormResponse } from "../types/formResponse";

export async function fetchAll(): Promise<FormResponse> {
  const { client, user } = await supabase();
  const { error, data } = await client
    .from("forms")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}
