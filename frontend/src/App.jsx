import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar.jsx';
import CustomerForm from './pages/CustomerForm.jsx';
import CustomerList from './pages/CustomerList.jsx';
import PolicyForm from './pages/PolicyForm.jsx';
import PolicyList from './pages/PolicyList.jsx';
import AssignPolicy from './pages/AssignPolicy.jsx';

function App() {
  return (
    <>
      <AppNavbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
          <Route path="/policies" element={<PolicyList />} />
          <Route path="/policies/new" element={<PolicyForm />} />
          <Route path="/policies/:id/edit" element={<PolicyForm />} />
          <Route path="/assign-policy" element={<AssignPolicy />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
