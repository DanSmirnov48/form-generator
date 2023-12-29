import { supabase } from "@/server/utils/supabase";
import { Form } from "../types/form";
import { FormResponse } from "../types/formResponse";

type Update = {
    id: Form["id"],
    payload: Form
}

export async function update({ id, payload }: Update): Promise<FormResponse> {
    const { client, user } = await supabase()

    const { error, data } = await client.from("forms").update<Form>({
        ...payload,
        user_id: user?.id,
    }).eq("id", id);

    if (error) {
        throw error;
    }
    return data;
}