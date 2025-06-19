
import Layout from "@/components/Layout";
import { useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { t } = useTranslation();

  // TODO: Replace auth logic with Supabase integration after backend is connected

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-16 bg-white rounded-lg shadow-xl p-8 border border-border">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          {mode === "login" ? t('login.title') : t('login.createAccount')}
        </h1>
        <form
          className="space-y-5"
          onSubmit={e => {
            e.preventDefault();
            // Placeholder for now; show Supabase reminder if not connected.
            alert("Login/signup is not available until you connect Supabase.");
          }}
        >
          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="firstName">{t('login.firstName')}</label>
                <input
                  required
                  className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="lastName">{t('login.lastName')}</label>
                <input
                  required
                  className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">{t('login.email')}</label>
            <input required className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent" id="email" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">{t('login.password')}</label>
            <input required className="w-full px-4 py-2 border border-border rounded focus:ring-2 focus:ring-accent" id="password" type="password" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 hover:bg-[#1277a8] transition">
            {mode === "login" ? t('login.loginButton') : t('login.signUpButton')}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <>
              {t('login.noAccount')}{" "}
              <button className="text-primary underline" onClick={() => setMode("register")}>
                {t('login.signUpLink')}
              </button>
            </>
          ) : (
            <>
              {t('login.hasAccount')}{" "}
              <button className="text-primary underline" onClick={() => setMode("login")}>
                {t('login.loginLink')}
              </button>
            </>
          )}
        </div>
        <div className="mt-6 text-xs text-center text-muted-foreground">
          <strong>{t('login.note').split('.')[0]}:</strong> {t('login.note').split('. ')[1]}<br/>
          <span className="bg-accent px-2 py-0.5 rounded">{t('login.docs')}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
