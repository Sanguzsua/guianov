"use client";
// 👆 Este componente se ejecuta del lado del cliente (navegador)

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
  // 📦 Estados tipados con TypeScript
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  // ⚙️ Esta función maneja el login del usuario
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🚀 1️⃣ Autenticar usuario con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Error al iniciar sesión: " + error.message);
      return;
    }

    // ✅ 2️⃣ Si el login es exitoso
    if (data.user) {
      setMessage("✅ Bienvenido, sesión iniciada correctamente.");

      // ⏳ Redirige a la página de perfil después de unos segundos
      setTimeout(() => router.push("/user"), 1500);
    } else {
      setMessage("⚠️ No se encontró el usuario. Intenta de nuevo.");
    }
  };

  // 🔍 useEffect: verificar si ya hay sesión activa
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        // ✅ Si ya hay sesión → redirige a /user
        router.push("/user");
      } else {
        // ❌ Si no hay sesión → muestra formulario
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Verificando sesión...</p>;

  // 🎨 Interfaz visual
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Inicio de sesión</h1>

      {/* 📋 Formulario de login */}
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

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Iniciar sesión
        </button>
      </form>

      {/* 💬 Mostrar mensaje de éxito o error */}
      {message && <p className="mt-4 text-center">{message}</p>}
    {/* 🔗 Enlace a la página de registro */}
<p className="mt-4 text-center">
¿No tienes cuenta?{" "}
<button
onClick={() => router.push("/register")}
className="text-blue-600 underline"
>
Regístrate aquí
</button>
</p>
    
    </div>
  );
}
