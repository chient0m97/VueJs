<template>
  <div class="wrap--footer p_4 pb_3">
    <div class="d_flex justify_content_center ct">
      <div class="d_flex flex_column c_lg_3 c_md_3 c_sm_6">
        <div class="component--heading pb_3">
          <h4 class="heading">
            <b>Masso </b>
          </h4>
        </div>
        <div class="component--content">
          <div class="content">
            Chúng tôi là ai
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Chia sẻ kinh nghiệm
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Kế hoạch phát triển
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Trạng thái trang
          </div>
        </div>
      </div>
      <div class="d_flex flex_column c_lg_3 c_md_3 c_sm_6">
        <div class="component--heading pb_3">
          <h4 class="heading">
            <b>Trợ giúp </b>
          </h4>
        </div>
        <div class="component--content">
          <div class="content">
            Hỗ trợ kỹ thuật
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Tài liệu
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Blog
          </div>
        </div>
        <div class="component--content">
          <div class="content">
            Cập nhật mới
          </div>
        </div>
      </div>
      <div class="d_flex flex_column c_lg_6 c_md_6 c_sm_12">
        <div class="component--heading-textblock pb_2">
          <h4 class="heading pb_3">
            <b>Liên hệ </b>
          </h4>
          <p class="m_0">Đăng ký mail để nhận thông tin mới nhất:</p>
        </div>
        <div class="component--form pb_4">
          <form class="d_flex justify_content_between">
            <input
              class="component--form-input"
              type="text"
              placeholder="Địa chỉ Email"
            />
            <span class="component--form-button">Subscribe</span>
          </form>
        </div>
        <div class="imkt--social d_flex align_items_center justify_content_end">
          <div class="imkt--social-heading mt_1 mr_3">
            <span>Các trang Social</span>
          </div>
          <div class="imkt--social-button">
            <ul class="d_flex pl_0 mb_0">
              <li>
                <a href="https://www.facebook.com/hootvietnam/" target="_blank">
                  <div class="mr_2">
                    <icon-base
                      class="mt_1"
                      icon-name="Facebook Hoot"
                      width="30"
                      height="30"
                      viewBox="0 0 115 115"
                    >
                      <icon-facebook-cirle />
                    </icon-base>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript: void(0)">
                  <div class="">
                    <icon-base
                      class="mt_1"
                      icon-name="Youtube ZinBee"
                      width="30"
                      height="30"
                      viewBox="0 0 520 520"
                    >
                      <icon-youtube-cirle />
                    </icon-base>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="m_0 text_center content">
      <div class="d_inline_flex">
        <div class="copyright d_flex align_items_center mr_3">
          <icon-base
            width="20"
            height="20"
            viewBox="0 0 417 301"
            icon-name="Hoot logo"
          >
            <hoot-logo-icon-black />
          </icon-base>
          <div class="ml_1">Hoot © 2019</div>
        </div>
        <div class="language d_flex align_items_center">
          <div class="text">Tiếng Việt</div>
          <div class="icon--edit ml_1">
            <icon-base
              icon-name="Chỉnh sửa"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <icon-edit />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap--footer {
  background-color: #eeeeee;
  color: #666666;
  font-size: 0.875rem;
  .language {
    color: #666;
    cursor: pointer;
    .icon--edit {
      margin: 0;
      color: #999999;
    }
    .text {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.component--content {
  .content {
    margin-bottom: 8px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.component--form-input {
  border: 1px solid #c1c7d0;
  border-radius: 3px;
  font-size: 0.875rem;
  height: 40px;
  width: 100%;
  padding: 0 12px;
}
.component--form-button {
  height: 40px;
  /*width: 22%;*/
  background-color: #ed1c24;
  border: 1px solid #ed1c24;
  border-radius: 3px;
  color: #ffffff;
  cursor: pointer;
  padding: 0.625rem 1.5rem;
  &:hover,
  &:focus {
    background-color: transparent;
    border-color: #e4e4e4;
    color: #444444;
    transition: all 0.5s ease;
  }
}
.imkt--social-button {
  ul {
    list-style: none;
  }
}
.imkt--social {
  .imkt--social-heading {
    padding-bottom: -5px;
  }
}
</style>
