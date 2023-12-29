import { supabase } from "@/server/utils/supabase";
import { FormResponse } from "../types/formResponse";

export async function fetchById(id: string): Promise<FormResponse> {
    const { client, user } = await supabase();

    const { data, error } = await client
        .from("forms")
        .select("*")
        .eq("id", id)
        .eq("user_id", user?.id)
        .single();

    if (error) {
        throw error;
    }
    return data;
}
