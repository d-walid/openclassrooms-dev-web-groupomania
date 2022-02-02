export const dateParser = num => {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long'
  };

  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

  return date.toString();
};

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};
