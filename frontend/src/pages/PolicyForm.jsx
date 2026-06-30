import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../api/httpClient';
import { policyApi } from '../api/policyApi';
import AlertMessage from '../components/AlertMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';

const initialForm = {
  policyNumber: '',
  name: '',
  type: '',
  premiumAmount: '',
  coverageAmount: '',
  durationInMonths: '',
  description: ''
};

const policyTypes = ['HEALTH', 'LIFE', 'VEHICLE', 'TRAVEL', 'PROPERTY'];

function PolicyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPolicy = async () => {
      if (!isEdit) return;

      try {
        const response = await policyApi.getById(id);
        const policy = response.data;

        setForm({
          policyNumber: policy.policyNumber || '',
          name: policy.name || '',
          type: policy.type || '',
          premiumAmount: policy.premiumAmount || '',
          coverageAmount: policy.coverageAmount || '',
          durationInMonths: policy.durationInMonths || '',
          description: policy.description || ''
        });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      policyNumber: form.policyNumber,
      name: form.name,
      type: form.type,
      premiumAmount: Number(form.premiumAmount),
      coverageAmount: Number(form.coverageAmount),
      durationInMonths: Number(form.durationInMonths),
      description: form.description
    };

    try {
      setSaving(true);
      setError('');

      if (isEdit) {
        await policyApi.update(id, payload);
      } else {
        await policyApi.create(payload);
      }

      navigate('/policies');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <PageHeader
        title={isEdit ? 'Edit Policy' : 'Add Policy'}
        subtitle="Create policies that can be assigned to customers."
      />

      <AlertMessage message={error} />

      <div className="content-panel form-panel">
        {loading ? (
          <LoadingState label="Loading policy..." />
        ) : (
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Policy Number</label>
              <input
                className="form-control"
                name="policyNumber"
                value={form.policyNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Policy Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Policy Type</label>
              <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Policy Type</option>
                {policyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Premium Amount</label>
              <input
                className="form-control"
                type="number"
                name="premiumAmount"
                value={form.premiumAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Coverage Amount</label>
              <input
                className="form-control"
                type="number"
                name="coverageAmount"
                value={form.coverageAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (Months)</label>
              <input
                className="form-control"
                type="number"
                name="durationInMonths"
                value={form.durationInMonths}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Policy'}
              </button>

              <Link
                className="btn btn-outline-secondary"
                to="/policies"
              >
                Cancel
              </Link>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}

export default PolicyForm;