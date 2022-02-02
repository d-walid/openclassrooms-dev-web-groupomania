export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    console.log('user auth key || ' + user['token']);
    return { 'x-access-token': user.token };
  } else {
    return {};
  }
};
