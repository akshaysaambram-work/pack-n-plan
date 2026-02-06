export const string = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replaceAll(/[^\w\s-]/g, "")
      .replaceAll(/[\s_-]+/g, "-")
      .replaceAll(/^-+|-+$/g, "");
  },

  truncate: (str: string, length: number, ending: string = "..."): string => {
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    }
    return str;
  },

  formatNumber: (num: number, locale: string = "en-US"): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  generateUUID: (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll(/[xy]/g, (c) => {
      const r = Math.trunc(Math.random() * 16);
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};
