export default function (errors) {
  /* eslint-disable-next-line */
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      return Array.isArray(errors[key]) ? errors[key][0] : errors[key];
    }
  }
  return null;
}
