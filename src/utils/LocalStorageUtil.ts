function addKeyPrefix(key: string) {
  const prefix = 'WEB_APP';
  return `${prefix}_${key}`;
}

const LocalStorageUtil = {
  // Function to set an item in local storage
  setItem: <T>(key: string, value: T): void => {
    try {
      key = addKeyPrefix(key);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item: ${key}`, error);
    }
  },

  // Function to get an item from local storage
  getItem: <T>(key: string): T | null => {
    try {
      key = addKeyPrefix(key);
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting localStorage item: ${key}`, error);
      return null;
    }
  },

  // Function to remove an item from local storage
  removeItem: (key: string): void => {
    try {
      key = addKeyPrefix(key);
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item: ${key}`, error);
    }
  },

  // Function to clear all items from local storage
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },
};

export default LocalStorageUtil;
