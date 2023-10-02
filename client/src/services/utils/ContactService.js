import HttpClient from './HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_URL_API}`);
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContacts(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }
}

export default new ContactService();
