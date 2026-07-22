export const getStoredEntities = key => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

export const setStoredEntities = (key, entities) => {
  localStorage.setItem(key, JSON.stringify(entities));
};
