
import Layout from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuthWithRoles } from "@/hooks/useAuthWithRoles";

const getRedirectTo = () => `${window.location.origin}/dashboard`;

// Helper: assign super_admin role to first user
const assignSuperAdminIfFirstUser = async (userId: string) => {
  // Check if any super_admins exist
  const { data, error } = await supabase
    .from("user_roles")
    .select("id")
    .eq("role", "super_admin")
    .limit(1);
  if (data && data.length === 0) {
    // Assign current user as super_admin
    await supabase.from("user_roles").insert([
      { user_id: userId, role: "super_admin" },
    ]);
  }
};

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, hasRole } = useAuthWithRoles();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const email = (e.currentTarget as any).email.value;
    const password = (e.currentTarget as any).password.value;
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else navigate("/dashboard");
    } else {
      // Register (sign up)
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: getRedirectTo() },
      });
      if (error) setError(error.message);
      // If sign up successful, assign super_admin if needed
      if (data?.user) {
        await assignSuperAdminIfFirstUser(data.user.id);
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-16 bg-white rounded-lg shadow-xl p-8 border border-border">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          {mode === "login" ? "Login to Your Account" : "Create an Account"}
        </h1>
        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input required className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent" id="email" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input required className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent" id="password" type="password" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 hover:bg-[#1277a8] transition">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        {error && <div className="text-destructive mt-3 text-sm">{error}</div>}
        <div className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button className="text-primary underline" onClick={() => setMode("register")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-primary underline" onClick={() => setMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
        <div className="mt-6 text-xs text-center text-muted-foreground">
          <strong>Note:</strong> You'll need to connect Supabase for authentication features.<br/>
          <span className="bg-accent px-2 py-0.5 rounded">See Lovable docs for instructions.</span>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
