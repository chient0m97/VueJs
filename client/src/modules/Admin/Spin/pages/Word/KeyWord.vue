<template>
  <div class="container">
    <!-- =-=-=-=-=-=-= notification =-=-=-=-=-=-=-=-=-= -->
    <div style="border-radius: 25px" class="alert-popup">
      <div
        class="alert notification text-center"
        v-if="statusWord === 'delete'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Xóa từ khóa thành công !!!
      </div>
      <div
        class="alert notification text-center"
        v-if="statusWord === 'update'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Cập nhật từ khóa thành công !!!
      </div>
      <div
        class="alert notification text-center"
        v-if="statusWord === 'insert'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Tạo mới từ khóa thành công !!!
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6 col-xs-12 d-flex">
        <div class="search-bar-div float_left mr-2">
          <i class="fas fa-search"></i>
          <input
            class="search-input form-control"
            type="text"
            placeholder="Tìm kiếm"
            v-model="searchKeyWords"
          />
        </div>
        <button class="ml-2" @click="showModalInsert">
          Tạo mới
        </button>
      </div>
      <div class="col-6 col-xs-12 text-right">
        <button
          class="btn-page"
          @click="nextOrPrevPage(-1)"
          :disabled="currentPagesWord === 1"
        >
          <i class="fas fa-backward"></i>
          Trang trước
        </button>
        &nbsp;
        <span>{{ this.currentPagesWord }} / {{ this.totalPagesWord }}</span>
        &nbsp;
        <button
          class="btn-page"
          @click="nextOrPrevPage(1)"
          :disabled="currentPagesWord === totalPagesWord"
        >
          Trang sau <i class="fas fa-forward"></i>
        </button>
        &nbsp;&nbsp;
        <select class="page-size" v-model="pageSizeWord">
          <option value="10" selected>Hiển thị 10</option>
          <option value="25">Hiển thị 25</option>
          <option value="50">Hiển thị 50</option>
        </select>
      </div>
    </div>
    <div class="col-12">
      <table class="table table-hover">
        <thead style="background:#f5f5f5">
          <tr>
            <td scope="col">Tên từ khóa</td>
            <td scope="col">Giá trị</td>
            <td scope="col">Chủ đề</td>
            <td scope="col">Hành động</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in words"
            :key="index"
            style="background: white"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.key }}</td>
            <td v-if="item.theme._id">{{ item.theme.name }}</td>
            <td>
              <i
                class="far fa-trash-alt mr-3"
                style="font-size:25px"
                @click="showModalDelete(item)"
              ></i>
              <i
                class="far fa-edit"
                style="font-size:25px"
                @click="showModalUpdate(item)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <modal-insert
        v-if="isShowModalInOrUp === true"
        @closePopup="isShowModalInOrUp = $event"
        :modalControl="modalControl"
      ></modal-insert>
    </transition>
    <transition>
      <modal-delete
        v-if="isShowModalDelete === true"
        :words="wordSelected"
        @closePopup="isShowModalDelete = $event"
      ></modal-delete>
    </transition>
  </div>
</template>
<script>
import "./style.css";
import ModalInsert from "../../modal/Modal.InsertOrUpdate.Word";
import ModalDelete from "../../modal/Modal.Word.Delete";
export default {
  components: {
    ModalInsert,
    ModalDelete
  },
  data() {
    return {
      isShowModalInOrUp: false,
      isShowModalDelete: false,
      wordSelected: {},
      modalControl: false
    };
  },
  async created() {
    await this.$store.dispatch("getWords");
  },
  computed: {
    words() {
      return this.$store.getters.words;
    },
    totalPagesWord() {
      return this.$store.getters.totalPagesWord;
    },
    currentPagesWord() {
      return this.$store.getters.currentPagesWord;
    },
    pageSizeWord: {
      get() {
        return this.$store.getters.pageSizeWord;
      },
      set(val) {
        return this.$store.dispatch("setPageSizeWord", val);
      }
    },
    searchKeyWords: {
      get() {
        return this.$store.getters.searchKeyWord;
      },
      set(val) {
        return this.$store.dispatch("searchWords", val);
      }
    },
    statusWord() {
      return this.$store.getters.statusWord;
    },
    wordsObj() {
      return this.$store.getters.wordsObj;
    }
  },
  methods: {
    nextOrPrevPage(val) {
      this.$store.dispatch("nextOrPrevPageWord", val);
    },
    showModalInsert() {
      this.isShowModalInOrUp = true;
      this.modalControl = false;
      this.$store.dispatch("resetWords");
    },
    showModalUpdate(val) {
      this.$store.dispatch("getIdWord", val);
      this.isShowModalInOrUp = true;
      this.modalControl = true;
    },
    showModalDelete(val) {
      this.isShowModalDelete = true;
      this.wordSelected = val;
    }
  }
};
</script>
