class CacheService {
  getValueByKey(key: string): any {
    const valueString = localStorage.getItem(key);

    if (!valueString) return valueString;

    return JSON.parse(valueString);
  }

  setValue(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default new CacheService();
