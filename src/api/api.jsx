import endpoints from './endpoints';

export default class ApiServices {
  async getUser() {
    const res = await endpoints.getUser();

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async editProfile(data) {
    const res = await endpoints.editProfile(data);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async getArticles(currentPage) {
    const res = await endpoints.getArticles(currentPage);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async getCurrentArticle() {
    const res = await endpoints.getArticles();

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async getArticle(slug) {
    const res = await endpoints.getArticle(slug);

    if (res.status >= 400) {
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

  async createArticle(data) {
    const res = await endpoints.createArticle(data);

    if (res.status >= 400) {
      throw new Error();
    }
  }

  async editArticle(data, slug) {
    const res = await endpoints.editArticle(data, slug);

    if (res.status >= 400) {
      throw new Error();
    }
  }

  async deleteArticle(slug) {
    const res = await endpoints.deleteArticle(slug);

    if (res.status >= 400) {
      throw new Error();
    }
  }

  async unfavorite(slug) {
    const res = await endpoints.unfavorite(slug);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }

  async favorite(slug) {
    const res = await endpoints.favorite(slug);

    if (res.status >= 400) {
      throw new Error();
    }

    return res.data;
  }
}
