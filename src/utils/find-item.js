export default function (data) {
  const {
    id, commit, resolve, reject,
  } = this;
  const foundItem = data.find((item) => (item.id === id));
  if (foundItem) {
    commit('SET_DATA_BY_ID', foundItem);
    resolve(foundItem);
  } else {
    reject({ status: 404 });
  }
}
