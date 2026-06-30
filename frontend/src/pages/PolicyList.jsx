import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../api/httpClient';
import { policyApi } from '../api/policyApi';
import AlertMessage from '../components/AlertMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';

function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadPolicies = async () => {
    try {
      setLoading(true);
      const response = await policyApi.getAll();
      setPolicies(response.data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this policy?');
    if (!confirmed) {
      return;
    }

    try {
      await policyApi.remove(id);
      setSuccess('Policy deleted successfully.');
      await loadPolicies();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section>
      <PageHeader
        title="Policies"
        subtitle="Maintain policy products, types, and premium amounts."
        action={
          <Link className="btn btn-primary" to="/policies/new">
            Add Policy
          </Link>
        }
      />

      <AlertMessage type="success" message={success} />
      <AlertMessage message={error} />

      <div className="content-panel">
        {loading ? (
          <LoadingState />
        ) : policies.length === 0 ? (
          <div className="empty-state">No policies found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Policy Name</th>
                  <th>Policy Type</th>
                  <th>Premium Amount</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id}>
                    <td>{policy.id}</td>
                    <td className="fw-medium">{policy.name}</td>
                    <td>{policy.type}</td>
                    <td>{formatCurrency(policy.premiumAmount)}</td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <Link className="btn btn-outline-primary" to={`/policies/${policy.id}/edit`}>
                          Edit
                        </Link>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(policy.id)}>
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

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return Number(value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  });
}

export default PolicyList;
