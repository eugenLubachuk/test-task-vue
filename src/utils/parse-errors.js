import findFirstError from './find-first-error';

export default function parseErrors(response) {
  const { headers, data } = response;
  if (headers && headers['content-type'].includes('application/json') && data instanceof Object) {
    if ('errors' in data) {
      return findFirstError(data.errors) || 'Unexpected error';
    }
    if ('message' in data) {
      return data.message;
    }
  }
  return 'Unexpected error';
}
