import { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "../config/supabase";
import { API_BASE } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeUserId = useRef(null);

  const profileFallback = (authUser) => {
    const name = authUser?.user_metadata?.name?.trim() || authUser?.email || "User";
    return {
      id: authUser?.id,
      email: authUser?.email,
      username: name,
      name,
    };
  };

  // Fetch profile data from backend
  const fetchProfile = async (session) => {
    const authUser = session?.user;
    if (!authUser?.id) return;

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (!res.ok) throw new Error(`Profile request failed (${res.status})`);
      const data = await res.json();

      // Ignore late responses after logout or an account switch.
      if (activeUserId.current !== authUser.id) return;

      if (data.success && data.user?.id === authUser.id) {
        const name = data.user.username?.trim()
          || authUser.user_metadata?.name?.trim()
          || data.user.name?.trim()
          || authUser.email
          || "User";
        setProfile({ ...data.user, username: name, name });
      } else {
        setProfile(profileFallback(authUser));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      if (activeUserId.current === authUser.id) {
        setProfile(profileFallback(authUser));
      }
    }
  };

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      activeUserId.current = session?.user?.id ?? null;
      setUser(session?.user ?? null);
      setProfile(null);
      if (session) {
        fetchProfile(session);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      activeUserId.current = session?.user?.id ?? null;
      setUser(session?.user ?? null);
      setProfile(null);
      if (session) {
        fetchProfile(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Get the current access token
  const getToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  // Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // Register
  const register = async (name, email, password) => {
    // First register via backend to create profile
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);

    // Then sign in to get the session
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // Registration succeeded but auto-login failed — user might need to confirm email
      return data;
    }

    return signInData;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    activeUserId.current = null;
    setUser(null);
    setProfile(null);
  };

  // Refresh profile
  const refreshProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      await fetchProfile(session);
    }
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    getToken,
    refreshProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
