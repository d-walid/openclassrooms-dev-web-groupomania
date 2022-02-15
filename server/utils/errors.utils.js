module.exports.signInErrors = error => {
  let errors = { email: '', password: '' };

  if (error.message.includes('Username'))
    errors.email = 'Email et/ou mot de passe incorrect.';

  return errors;
};
