export default {
  state: {
    users: [],
  },
  mutations: {
    createUser(state, newUser) {
      state.users.push(newUser);
    },
  },
  actions: {
  },
  getters: {
  },
}
