"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ⚙️ Verificación de sesión y permisos
  useEffect(() => {
    const verificarAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        // ❌ No hay usuario logueado → redirige a login
        setLoading(false);
      } else if (data.user.email !== "daniel.diazd@uniagustiniana.edu.co") {
        // ❌ Usuario logueado, pero no es el autorizado → redirige
        router.push("/login");
      } else {
        // ✅ Usuario autorizado
        router.push("/user"); // o la ruta protegida que necesites
      }
    };
    verificarAdmin();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Verificando sesión...</p>;

  // 🚀 Login con Supabase
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Error al iniciar sesión: " + error.message);
      return;
    }

    if (data.user) {
      setMessage("✅ Bienvenido, sesión iniciada correctamente.");
      router.push("/user"); // Redirige después del login exitoso
    } else {
      setMessage("⚠️ No se encontró el usuario. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Inicio de sesión</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Iniciar sesión
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
