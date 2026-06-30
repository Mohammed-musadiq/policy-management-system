import httpClient from './httpClient';

export const policyApi = {
  getAll: () => httpClient.get('/policies'),
  getById: (id) => httpClient.get(`/policies/${id}`),
  create: (payload) => httpClient.post('/policies', payload),
  update: (id, payload) => httpClient.put(`/policies/${id}`, payload),
  remove: (id) => httpClient.delete(`/policies/${id}`)
};
