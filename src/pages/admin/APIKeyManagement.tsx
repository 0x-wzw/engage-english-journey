
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const APIKeyManagement = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return setIsAdmin(false);
    // This page should only be visible to admin or super_admin users
    const checkRoles = async () => {
      // Import here instead of at the top to avoid SSR issues
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: isAdminData } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      const { data: isSuperAdminData } = await supabase.rpc("has_role", { _user_id: user.id, _role: "super_admin" });
      setIsAdmin(Boolean(isAdminData) || Boolean(isSuperAdminData));
    };
    checkRoles();
  }, [user]);

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (!isAdmin) return (
    <Layout>
      <div className="max-w-lg mx-auto bg-destructive/10 border border-destructive/30 text-destructive p-6 mt-10 rounded text-center">
        <div className="font-bold text-xl mb-2">Access Denied</div>
        <div>You must be an admin or super admin to manage API keys.</div>
      </div>
    </Layout>
  );

  // This is just a placeholder UI illustrating "API Key Management."
  // Actual secure storage should use something like Supabase secrets/Edge Functions.
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8 mt-8 shadow-md animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-primary">API Key Management</h1>
        <div className="mb-4 text-muted-foreground">
          Manage API keys for integrations. <br />
          <span className="italic text-sm">For real-world usage, secure storage (e.g., Edge Functions secrets) should be implemented.</span>
        </div>
        <form className="flex flex-col gap-2 max-w-md bg-muted/30 border rounded p-4">
          <label className="font-semibold text-sm mb-1">Add API Key</label>
          <input className="border px-2 py-1 rounded" type="text" placeholder="API Key Label" disabled />
          <input className="border px-2 py-1 rounded" type="text" placeholder="API Key Value" disabled />
          <button className="bg-primary text-white px-4 py-2 rounded w-fit mt-2 opacity-50 cursor-not-allowed" type="button" disabled>
            Add Key (Demo Only)
          </button>
        </form>
        <div className="mt-6 text-muted-foreground text-sm italic">
          <div>API key management coming soon: secure store, update, and delete keys in the backend.</div>
        </div>
      </div>
    </Layout>
  );
};

export default APIKeyManagement;
