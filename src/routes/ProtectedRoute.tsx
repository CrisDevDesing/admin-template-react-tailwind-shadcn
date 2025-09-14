// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles?: string[]  // Roles permitidas
  redirectPath?: string    // Rota para redirecionar se não autorizado
}

export function ProtectedRoute({ allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) {
  const userRole = localStorage.getItem("role")

  // Usuário não logado
  if (!userRole) {
    return <Navigate to={redirectPath} replace />
  }

  // Role não permitida
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redireciona para dashboard do usuário, ou rota padrão "/"
    const defaultPath = userRole === "super_admin" ? "/super-admin/dashboard" : "/"
    return <Navigate to={defaultPath} replace />
  }

  return <Outlet />
}
