import Api from "@/services";

export default {
  index() {
    return Api().get("spin-word");
  },
  create(data) {
    console.log("data thêm", data);
    return Api().post("spin-word/create", data);
  },
  getById(wordId) {
    console.log("wordId", wordId);
    return Api().get(`spin-word/detail/${wordId}`);
  },
  delete(wordId) {
    return Api().delete(`spin-word/delete/${wordId}`);
  },
  update(wordId, data) {
    return Api().patch(`spin-word/update/${wordId}`, data);
  },
  indexOptions(data) {
    console.log("data indexoptions", data);
    return Api().post("spin-word/index-options", data);
  }
};
