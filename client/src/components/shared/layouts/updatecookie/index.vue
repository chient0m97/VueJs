<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
            icon-name="Cookie"
            width="440.4"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <div class="modal--body">
          <div class="modal--title">{{ nameBread }}</div>
          <div class="modal--desc">
            {{ subBread }}
          </div>
          <div class="alert p_2" v-if="isShowAlert === true">
            Mã cookie của bạn không chính xác, vui lòng xác nhận đây là mã
            cookie của tài khoản <span>{{ item.userInfo.name }}</span
            >.
          </div>
          <textarea
            placeholder="Nhập mã kích hoạt tại đây ..."
            v-model="cookie"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateCookie"
            @keydown.enter.shift.exact="newline"
          ></textarea>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-add" @click="updateCookie">
            CẬP NHẬT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StringFuntion from "@/utils/functions/string";
export default {
  props: ["item", "subBread", "nameBread"],
  data() {
    return {
      cookie: "",
      isShowAlert: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    async updateCookie() {
      const newUserId = StringFuntion.findSubString(
        this.cookie,
        "c_user=",
        ";"
      );
      const userId = this.item.userInfo.id;
      if (newUserId === userId) {
        await this.$store.dispatch("updateAccountFb", {
          fbId: this.item._id,
          cookie: this.cookie
        });
        this.$emit("closeAddPopup", false);
      } else {
        this.isShowAlert = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
