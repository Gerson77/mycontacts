import CategoryMapper from '../mappers/CategoryMapper';
import HttpClient from './HttpClient';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_URL_API}`);
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoryService();
