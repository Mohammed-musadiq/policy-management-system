import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customerApi } from '../api/customerApi';
import { getErrorMessage } from '../api/httpClient';
import AlertMessage from '../components/AlertMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getAll();
      setCustomers(response.data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this customer?');
    if (!confirmed) {
      return;
    }

    try {
      await customerApi.remove(id);
      setSuccess('Customer deleted successfully.');
      await loadCustomers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section>
      <PageHeader
        title="Customers"
        subtitle="Manage customer records and contact details."
        action={
          <Link className="btn btn-primary" to="/customers/new">
            Add Customer
          </Link>
        }
      />

      <AlertMessage type="success" message={success} />
      <AlertMessage message={error} />

      <div className="content-panel">
        {loading ? (
          <LoadingState />
        ) : customers.length === 0 ? (
          <div className="empty-state">No customers found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td className="fw-medium">{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <Link className="btn btn-outline-primary" to={`/customers/${customer.id}/edit`}>
                          Edit
                        </Link>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(customer.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerList;
