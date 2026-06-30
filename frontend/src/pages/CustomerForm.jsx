import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { customerApi } from '../api/customerApi';
import { getErrorMessage } from '../api/httpClient';
import AlertMessage from '../components/AlertMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';

const initialForm = {
  name: '',
  email: '',
  phone: ''
};

function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCustomer = async () => {
      if (!isEdit) {
        return;
      }

      try {
        const response = await customerApi.getById(id);
        const { name, email, phone } = response.data;
        setForm({ name: name || '', email: email || '', phone: phone || '' });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');

      if (isEdit) {
        await customerApi.update(id, form);
      } else {
        await customerApi.create(form);
      }

      navigate('/customers');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <PageHeader
        title={isEdit ? 'Edit Customer' : 'Add Customer'}
        subtitle="Capture the customer details required for policy assignment."
      />

      <AlertMessage message={error} />

      <div className="content-panel form-panel">
        {loading ? (
          <LoadingState label="Loading customer..." />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-control"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={20}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Customer'}
              </button>
              <Link className="btn btn-outline-secondary" to="/customers">
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default CustomerForm;
