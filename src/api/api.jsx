import endpoints from './endpoints';

export default class ApiServices {
  async getUser() {
    const res = await endpoints.getUser();

    if (res.status !== 200) {
      throw new Error();
    }

    return res.data;
  }

  async editProfile(data) {
    const res = await endpoints.editProfile(data);

    if (res.status !== 200) {
      throw new Error();
    }

    return res.data;
  }

  async getArticles() {
    const res = await endpoints.getArticles();

    if (res.status !== 200) {
      throw new Error();
    }

    return res.data;
  }

  async getArticle(Slug) {
    const res = await endpoints.getArticle(Slug);

    if (res.status !== 200) {
      throw new Error();
    }

    return res.data;
  }

  async registration(data) {
    const res = await endpoints.registration(data);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async login(data) {
    const res = await endpoints.login(data);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }
}
