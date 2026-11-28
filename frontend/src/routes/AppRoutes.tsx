import { Navigate, Route, Routes } from 'react-router'
import { useCurrentUser } from '../hooks/useCurrentUser'
import AppLayout from '../layouts/AppLayout'
import { homePathForRole } from '../layouts/navigation'
import ErrorPage from '../pages/ErrorPage'
import LoginPage from '../pages/LoginPage'
import PlaceholderPage from '../pages/PlaceholderPage'
import RegisterPage from '../pages/RegisterPage'
import RequireRole from './RequireRole'
import RoleSwitcher from './RoleSwitcher'
import { APP_ROUTES } from './routeTable'

/** The layout for signed-in pages, filled with the current user. */
function SignedInLayout() {
  const { user, signOut } = useCurrentUser()
  if (!user) return null
  return (
    <AppLayout
      userName={user.name}
      role={user.role}
      onLogout={signOut}
      topBarExtra={<RoleSwitcher />}
    />
  )
}

/** "/" sends signed-in users to their role's home page, others to login. */
function HomeRedirect() {
  const { user } = useCurrentUser()
  return <Navigate to={user ? homePathForRole(user.role) : '/login'} replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <RequireRole>
            <SignedInLayout />
          </RequireRole>
        }
      >
        {APP_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RequireRole roles={route.roles}>
                <PlaceholderPage
                  title={route.title}
                  description={route.description}
                  workPackage={route.workPackage}
                />
              </RequireRole>
            }
          />
        ))}
      </Route>

      <Route
        path="/unauthorized"
        element={
          <ErrorPage
            code="403"
            title="No access"
            message="Your role does not have access to this page."
          />
        }
      />
      <Route
        path="*"
        element={
          <ErrorPage code="404" title="Page not found" message="This page does not exist." />
        }
      />
    </Routes>
  )
}
