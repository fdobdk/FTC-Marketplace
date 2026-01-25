import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Listings from './pages/Listings'
import ListingDetail from './pages/ListingDetail'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import CreateTeam from './pages/CreateTeam'
import JoinTeam from './pages/JoinTeam'
import EditTeam from './pages/EditTeam'
import MemberProfile from './pages/MemberProfile'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="listings" element={
            <ProtectedRoute><Listings /></ProtectedRoute>
          } />
          <Route path="listings/:id" element={
            <ProtectedRoute><ListingDetail /></ProtectedRoute>
          } />
          <Route path="listings/create" element={
            <ProtectedRoute><CreateListing /></ProtectedRoute>
          } />
          <Route path="listings/:id/edit" element={
            <ProtectedRoute><EditListing /></ProtectedRoute>
          } />
          <Route path="teams" element={
            <ProtectedRoute><Teams /></ProtectedRoute>
          } />
          <Route path="teams/:id" element={
            <ProtectedRoute><TeamDetail /></ProtectedRoute>
          } />
          <Route path="teams/join" element={
            <ProtectedRoute><JoinTeam /></ProtectedRoute>
          } />
          <Route path="teams/create" element={
            <ProtectedRoute><CreateTeam /></ProtectedRoute>
          } />
          <Route path="teams/:id/edit" element={
            <ProtectedRoute><EditTeam /></ProtectedRoute>
          } />
          <Route path="members/:id" element={
            <ProtectedRoute><MemberProfile /></ProtectedRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
