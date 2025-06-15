
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AppRole = "super_admin" | "admin" | "user";

export function useAuthWithRoles() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper: fetch user roles from Supabase
  const fetchRoles = async (uid: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid);
    if (data) return data.map((r) => r.role as AppRole);
    return [];
  };

  useEffect(() => {
    // Auth state change handler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRoles(session.user.id).then(setRoles);
        } else {
          setRoles([]);
        }
      }
    );
    // On load, check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRoles(session.user.id).then(setRoles);
      }
    });
    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  // Helper: role
  const hasRole = (role: AppRole) => roles.includes(role);

  return { user, session, roles, loading, hasRole, fetchRoles };
}
