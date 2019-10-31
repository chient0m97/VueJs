import CookieFunction from "@/utils/functions/cookie";
export default {
  data() {
    return {
      roles: "",
      menus: [
        {
          text: "Bảng điều khiển",
          icon: {
            iconName: "home",
            tagName: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "admin_dashboard"
        },
        {
          text: "Gói tài khoản",
          icon: {
            iconName: "package",
            tagName: "icon-post",
            width: 20,
            height: 20,
            viewBox: "0 0 540 540"
          },
          to: "manage_package"
        },
        {
          text: "Quản lý tài khoản",
          icon: {
            iconName: "manage-account",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_users"
        },
        {
          text: "Quản lý ảnh",
          icon: {
            iconName: "manage-album",
            tagName: "icon-image",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "album"
        },
        {
          text: "Quản lý VPS",
          icon: {
            iconName: "fbaccount",
            tagName: "icon-location",
            width: 24,
            height: 24,
            viewBox: "0 0 65 65"
          },
          to: "admin_server"
        },
        {
          text: "Trợ giúp",
          icon: {
            iconName: "help",
            tagName: "icon-info",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24"
          },
          to: "admin_help"
        },
        {
          text: "Dữ liệu mẫu",
          icon: {
            iconName: "folder",
            tagName: "icon-folder",
            width: 24,
            height: 24,
            viewBox: "0 0 540 540"
          },
          to: "simple_data"
        },
        {
          text: "Chiến dịch mẫu",
          icon: {
            iconName: "folder",
            tagName: "icon-folder",
            width: 24,
            height: 24,
            viewBox: "0 0 540 540"
          },
          to: "campaigns"
        },
        {
          text: "Quản lý market",
          icon: {
            iconName: "manage-market",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "manage_product"
        },
        {
          text: "Quản lý đại lý",
          icon: {
            iconName: "manage-agency",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "agency_list"
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  },
  async created() {
    const res = CookieFunction.getCookie("cfr");
    this.roles = res;
  }
};
