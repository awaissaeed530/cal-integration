export class UrlBuilder {
  url: UrlUtil = {
    baseUrl: "",
    path: "",
    params: new Map(),
  };

  baseUrl(url: string): this {
    this.url.baseUrl = url;
    return this;
  }

  path(path: string): this {
    this.url.path = path;
    return this;
  }

  param(key: string, value: string): this {
    this.url.params.set(key, value);
    return this;
  }

  build(): string {
    if (this.url.baseUrl === undefined || this.url.baseUrl.length === 0)
      throw new Error("Please provide baseURL");
    const url = new URL(this.url.path, this.url.baseUrl);
    this.url.params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    return url.toString();
  }
}

interface UrlUtil {
  baseUrl: string;
  path: string;
  params: Map<string, string>;
}
