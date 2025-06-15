
import { useAuthWithRoles } from "@/hooks/useAuthWithRoles";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

type RoleEntry = {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
};

export default function AdminPage() {
  const { user, roles, hasRole } = useAuthWithRoles();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState<RoleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Not logged in
    if (!user) {
      navigate("/login");
    } else if (!hasRole("super_admin")) {
      // No access, not super_admin
      navigate("/dashboard");
    }
  }, [user, roles, hasRole, navigate]);

  useEffect(() => {
    // Fetch all user roles
    const fetchAllUserRoles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setUserRoles(data);
      setLoading(false);
    };
    if (user && hasRole("super_admin")) {
      fetchAllUserRoles();
    }
  }, [user, hasRole]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-xl p-8 border border-border">
        <h1 className="text-2xl font-bold mb-5 text-primary">Super Admin Dashboard</h1>
        <div className="mb-4 text-muted-foreground">
          Manage user roles here. (Coming soon: API keys, chat logs, etc.)
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-sm border">
            <thead>
              <tr>
                <th className="p-2 text-left">User ID</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {userRoles.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-2 font-mono">{row.user_id}</td>
                  <td className="p-2">{row.role}</td>
                  <td className="p-2">{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
