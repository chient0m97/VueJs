<template>
  <div class="theme">
    <div class="r">
      <div class="c_lg_5 c_md_12 c_sm_12 c_xs_12">
        <div class="theme--top p_3">
          <div class="theme--title text_center text_uppercase py_3">
            <span v-if="currentTheme._id">Cập nhật chủ đề</span>
            <span v-else>Tạo mới chủ đề</span>
          </div>
          <div class="theme--body">
            <div class="form_group">
              <label>Tên chủ đề</label>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên chủ đề"
                v-model="currentTheme.name"
              />
              <div class="text--error mt_3" v-if="isShowAlert === true">
                <span>Tên chủ đề không được bỏ trống</span>
              </div>
            </div>
            <div class="form_group">
              <label>Mô tả về chủ đề</label>
              <textarea
                class="form_control"
                v-model="currentTheme.description"
              ></textarea>
            </div>
          </div>
          <div
            class="theme--footer d_flex align_items_center justify_content_between"
          >
            <button class="btn--cancel" @click="resetSpinTheme">Hủy</button>
            <button
              class="btn--submit"
              v-if="currentTheme._id"
              @click="updateSpinTheme"
            >
              Cập nhật
            </button>
            <button class="btn--submit" v-else @click="createSpinTheme">
              Thêm mới
            </button>
          </div>
        </div>
      </div>

      <div class="c_lg_7 c_md_12 c_sm_12 c_xs_12">
        <div
          class="search--module--div d_flex align_items_center justify_content_between"
        >
          <div class="search--bar--div">
            <span class="search--icon">
              <icon-base
                icon-name="Tìm kiếm"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-input-search />
              </icon-base>
            </span>
            <input
              class="search--input"
              type="text"
              placeholder="Tìm kiếm"
              v-model="searchKey"
            />
          </div>
          <select class="page-size" v-model="pageSize">
            <option value="10" selected>Hiển thị 10</option>
            <option value="25">Hiển thị 25</option>
            <option value="50">Hiển thị 50</option>
          </select>
        </div>
        <div class="navigation-div">
          <div class="d_flex align_items_center justify_content_between">
            <span
              >Trang {{ currentPage }} trong tổng số
              {{ totalPages }} trang</span
            >
            <div>
              <button
                class="btn"
                @click="nextOrPrevPage(-1)"
                :disabled="currentPage === 1"
              >
                Trang trước
              </button>
              <button
                class="btn"
                @click="nextOrPrevPage(1)"
                :disabled="currentPage === totalPages"
              >
                Trang sau
              </button>
            </div>
          </div>
          <form v-on:submit.prevent id="page-jump">
            <label for="">Nhảy tới trang</label>
            <input
              class="form--control"
              type="number"
              v-on:keyup.enter="jumpToPage($event)"
            />
          </form>
        </div>
        <div class="theme--content">
          <div class="post--data">
            <div class="item--header d_flex align_items_center px_3 py_2">
              <div class="col col--name px_2">
                <span class="sort">Tên chủ đề</span>
              </div>
              <div class="col col--category px_2">Mô tả</div>
              <div class="col col--action px_4">Hành động</div>
            </div>
            <div
              class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2"
              v-if="themeList.length === 0"
            >
              Không có dữ liệu.
            </div>
            <theme-item
              v-else
              v-for="(item, index) in themeList"
              :key="index"
              :theme="item"
              @deleteTheme="handleDelete($event)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- POPUP: DELETE THEME -->
    <transition name="popup">
      <theme-delete
        v-if="isShowDeleteTheme === true"
        :theme="themeSelected"
        @closePopup="isShowDeleteTheme = $event"
      />
    </transition>
    <!-- POPUP: DELETE THEME -->
  </div>
</template>

<script>
import ThemeItem from "./ThemeItem";
import ThemeDelete from "../../popup/Theme/ThemeDelete";
export default {
  components: {
    ThemeItem,
    ThemeDelete
  },
  data() {
    return {
      isShowDeleteTheme: false,
      isShowAlert: false,
      themeSelected: {}
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.currentTheme;
    },
    themeList() {
      return this.$store.getters.themeList;
    },
    currentPage() {
      return this.$store.getters.currentPage;
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    searchKey: {
      get() {
        return this.$store.getters.searchKey;
      },
      set(val) {
        this.$store.dispatch("search", val);
      }
    },
    pageSize: {
      get() {
        return this.$store.getters.pageSize;
      },
      set(val) {
        this.$store.dispatch("setPageSize", val);
      }
    }
  },
  created() {
    this.$store.dispatch("index");
  },
  watch: {
    "currentTheme.name"(val) {
      if (val !== "") {
        this.isShowAlert = false;
      }
    }
  },
  methods: {
    async createSpinTheme() {
      if (this.currentTheme.name === "") {
        this.isShowAlert = true;
        return;
      } else {
        await this.$store.dispatch("createNewSpinTheme", this.currentTheme);
        await this.$store.dispatch("setThemeDefault");
      }
    },
    handleDelete(theme) {
      this.isShowDeleteTheme = true;
      this.themeSelected = theme;
    },
    async updateSpinTheme() {
      if (this.currentTheme.name === "") {
        this.isShowAlert = true;
        return;
      } else {
        await this.$store.dispatch("updateSpinTheme", this.currentTheme);
        await this.$store.dispatch("setThemeDefault");
      }
    },
    resetSpinTheme() {
      this.$store.dispatch("setThemeDefault");
    },
    nextOrPrevPage(val) {
      this.$store.dispatch("nextOrPrevPage", val);
    },
    jumpToPage(e) {
      this.$store.dispatch("jumpToPage", e.target.value);
      document.getElementById("page-jump").reset();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
