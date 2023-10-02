import HttpClient from './HttpClient';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_URL_API}`);
  }

  listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoryService();
