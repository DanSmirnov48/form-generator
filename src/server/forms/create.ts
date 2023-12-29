import { supabase } from "@/server/utils/supabase";
import { Form } from "../types/form";
import { FormResponse } from "../types/formResponse";
export async function create(payload: Form):Promise<FormResponse> {
    const { client, user } = await supabase()
    const { error, data } = await client.from("forms").insert<Form>({
        ...payload,
        user_id: user?.id,
    });
    if (error) {
        throw error;
    }
    return data;
}