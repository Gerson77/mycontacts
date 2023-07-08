import HttpClient from './HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_URL_API}`);
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContacts(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }
}

export default new ContactService();
