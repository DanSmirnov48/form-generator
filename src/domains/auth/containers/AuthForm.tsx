"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

type AuthFormProps = {
  view: "sign_in" | "sign_up" | "forgotten_password";
};

export const AuthForm = ({ view }: AuthFormProps) => {
  const supabase = createClientComponentClient();

  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-md p-4 shadow-md rounded-md">
        <Auth
          view={view}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          redirectTo={`http://localhost:3000/auth/callback`}
        />
      </div>
    </div>
  );
};
