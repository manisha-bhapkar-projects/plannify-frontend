const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value) ? 'Invalid email address' : undefined;
const password = (value) => value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(value) ? 'The password must contain at least one number and one uppercase character and one lowercase letter and one symbol, and it must be at least 8 characters' : undefined;
const pwdMatch = (value, allValues) => value !== allValues.password ? 'These passwords do not match' : undefined;

export { required, maxLength, maxLength15, number, minValue, email, password, pwdMatch};