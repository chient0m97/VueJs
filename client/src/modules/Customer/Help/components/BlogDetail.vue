<template>
  <div>
    <!-- Start: Blog Detail -->
    <div class="section blog--detail py_2">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="content" v-html="blog.content"></div>
    </div>
    <!-- End: Blog Detail -->
    <!-- Start: Related Blog -->
    <div class="section related--blog">
      <h3 class="title">Bài viết có liên quan</h3>
      <div class="list--group">
        <div class="list--group-item">
          <a class="link" href="">
            Tại sao tôi được yêu cầu nhập thông tin đăng nhập email của mình
            trong khi cố gắng đặt lại mật khẩu Facebook?
          </a>
        </div>
        <div class="list--group-item">
          <a class="link" href="">
            Làm cách nào để sử dụng mật khẩu ứng dụng?
          </a>
        </div>
        <div class="list--group-item">
          <a class="link" href="">
            Tại sao bài niêm yết của tôi trên Marketplace không được duyệt?
          </a>
        </div>
      </div>
    </div>
    <!-- End: Related Blog -->
  </div>
</template>

<script>
export default {
  props: ["blog"]
};
</script>

<style scoped lang="scss">
/* Blog Detail */
.blog--detail {
  .title {
    color: #1c1e21;
    font-weight: 700;
    font-size: 2rem;
    line-height: 48px;
    margin-bottom: 1.5rem;
  }
  .content {
    /deep/ * {
      font-size: 1.125rem;
    }
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      margin-bottom: 1.125rem;
    }
  }
  .line {
    background: #e4e4e4;
    border-width: 0;
    height: 1px;
  }
}

/* Related Blog */
.related--blog {
  .title {
    border-bottom: 1px solid #e4e4e4;
    color: #1c1e21;
    font-size: 1.125rem;
    font-weight: 700;
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  .list--group {
    &-item {
      margin: 0.75rem 0;
      .link {
        color: #365899;
        cursor: pointer;
        font-size: 1.125rem;
        text-transform: none;
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
