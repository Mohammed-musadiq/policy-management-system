import httpClient from './httpClient';

export const customerApi = {
  getAll: () => httpClient.get('/customers'),
  getById: (id) => httpClient.get(`/customers/${id}`),
  create: (payload) => httpClient.post('/customers', payload),
  update: (id, payload) => httpClient.put(`/customers/${id}`, payload),
  remove: (id) => httpClient.delete(`/customers/${id}`)
};
