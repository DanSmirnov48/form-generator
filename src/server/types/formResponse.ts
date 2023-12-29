import { PostgrestError } from "@supabase/supabase-js";
import { Form } from "./form";

export type FormResponse = Form | Form[] | PostgrestError | null