import httpClient from './httpClient';

export const assignmentApi = {
  getAll: () => httpClient.get('/assignments'),
  assign: (payload) => httpClient.post('/assignments', payload),
  remove: (id) => httpClient.delete(`/assignments/${id}`)
};
