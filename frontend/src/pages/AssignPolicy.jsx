import { useEffect, useMemo, useState } from 'react';
import { assignmentApi } from '../api/assignmentApi';
import { customerApi } from '../api/customerApi';
import { getErrorMessage } from '../api/httpClient';
import { policyApi } from '../api/policyApi';
import AlertMessage from '../components/AlertMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';

const initialForm = {
  customerId: '',
  policyId: '',
  startDate: new Date().toISOString().split('T')[0]
};

function AssignPolicy() {
  const [form, setForm] = useState(initialForm);
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canSubmit = useMemo(
    () =>
      form.customerId &&
      form.policyId &&
      form.startDate &&
      !saving,
    [form, saving]
  );

  const loadData = async () => {
    try {
      setLoading(true);

      const [customerResponse, policyResponse, assignmentResponse] =
        await Promise.all([
          customerApi.getAll(),
          policyApi.getAll(),
          assignmentApi.getAll()
        ]);

      setCustomers(customerResponse.data);
      setPolicies(policyResponse.data);
      setAssignments(assignmentResponse.data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await assignmentApi.assign({
        customerId: Number(form.customerId),
        policyId: Number(form.policyId),
        startDate: form.startDate
      });

      setSuccess('Policy assigned successfully.');

      setForm({
        customerId: '',
        policyId: '',
        startDate: new Date().toISOString().split('T')[0]
      });

      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this assignment?')) {
      return;
    }

    try {
      await assignmentApi.remove(id);
      setSuccess('Assignment removed successfully.');
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section>
      <PageHeader
        title="Assign Policy"
        subtitle="Link customers to policies."
      />

      <AlertMessage type="success" message={success} />
      <AlertMessage message={error} />

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="content-panel h-100">
            <h2 className="panel-title">New Assignment</h2>

            {loading ? (
              <LoadingState label="Loading..." />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Customer
                  </label>

                  <select
                    className="form-select"
                    name="customerId"
                    value={form.customerId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Customer</option>

                    {customers.map((customer) => (
                      <option
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Policy
                  </label>

                  <select
                    className="form-select"
                    name="policyId"
                    value={form.policyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Policy</option>

                    {policies.map((policy) => (
                      <option
                        key={policy.id}
                        value={policy.id}
                      >
                        {policy.name} ({policy.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {saving ? 'Assigning...' : 'Assign Policy'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="col-lg-7">
          <div className="content-panel h-100">
            <h2 className="panel-title">
              Current Assignments
            </h2>

            {loading ? (
              <LoadingState />
            ) : assignments.length === 0 ? (
              <div className="empty-state">
                No assignments found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Policy</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.id}</td>
                        <td>{assignment.customerName}</td>
                        <td>{assignment.policyName}</td>
                        <td>{assignment.startDate}</td>
                        <td>{assignment.status}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(assignment.id)
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssignPolicy;