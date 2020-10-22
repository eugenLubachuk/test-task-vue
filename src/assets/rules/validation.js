const requiredRule = (v) => !!v || 'Field is required';

const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+/.test(v) || 'E-mail must be valid',
];

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 6) || 'Password must be more than or equal 6 characters',
];

export { emailRules, passwordRules, requiredRule };
