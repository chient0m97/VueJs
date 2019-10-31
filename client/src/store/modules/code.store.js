import CodeServices from "@/services/modules/code.services";
const state = {
  allCode: [],
  infoUserUsedCode: {}
};
const getters = {
  allCode: state => state.allCode,
  infoUserUsedCode: state => state.infoUserUsedCode
};
const mutations = {
  setAllCode: (state, payload) => {
    state.allCode = payload.reverse();
  },
  setDeleteCode: (state, payload) => {
    state.allCode = payload;
  },
  setUpdate: (state, payload) => {
    const position = state.allCode
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.allCode[position] = payload;
  },
  setInfoUserUsedCode: (state, payload) => {
    state.infoUserUsedCode = payload;
  }
};
const actions = {
  createCode: async ({ commit }, payload) => {
    CodeServices.createCode(payload);
    const result = await CodeServices.getAllCode();
    commit("setAllCode", result.data.data);
  },
  deleteCode: async ({ commit }, payload) => {
    const code = state.allCode.filter(item => item._id !== payload._id);
    commit("setDeleteCode", code);
    await CodeServices.deleteCode(payload._id);
  },
  // Get all code
  getAllCode: async ({ commit }) => {
    const result = await CodeServices.getAllCode();
    commit("setAllCode", result.data.data);
  },
  getInfoById: async ({ commit }, payload) => {
    const result = await CodeServices.getInfoById(payload);
    commit("setInfoUserUsedCode", result.data.data);
  },
  updateCode: async ({ commit }, payload) => {
    await CodeServices.updateCode(payload._id, payload);
    commit("setUpdate", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
