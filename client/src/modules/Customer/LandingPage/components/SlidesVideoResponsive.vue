<template>
  <section id="utilities" class="utilities ct">
    <div class="content--options position_relative pt_5">
      <div class="slide--image">
        <transition name="slide-fade">
          <div class="items display" v-if="currentIndexInfo === 0">
            <div class="mb_2">Hướng dẫn đăng ký Hoot</div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/dgOyLfhlgos"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="content items" v-if="currentIndexInfo === 1">
            <div class="mb_2">
              Hướng dẫn kết nối facebook với tài khoản Hoot
            </div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/FEnUaAghtqo"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="automation items" v-if="currentIndexInfo === 2">
            <div class="mb_2">Hướng dẫn tổng quan về kho nội dung</div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/Bbo6txouMc0"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="function items" v-if="currentIndexInfo === 3">
            <div class="mb_2">
              Hướng dẫn tích hợp Profile, Fanpage, Group trên tài khoản Hoot
            </div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/Ku5sFPqTIWQ"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="function items" v-if="currentIndexInfo === 4">
            <div class="mb_2">Hướng dẫn tổng quan về chiến dịch đăng bài</div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/_qstuWBI2V8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="function items" v-if="currentIndexInfo === 5">
            <div class="mb_2">Hướng dẫn tổng quan về hẹn giờ đăng bài</div>
            <iframe
              :style="widthDefault"
              height="500"
              src="https://www.youtube.com/embed/39ZR5wdgSPY"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </transition>
      </div>
      <div class="action text_center">
        <ul>
          <li
            :class="[currentIndexInfo === 0 ? 'active' : '']"
            @click="currentIndexInfo = 0"
          ></li>
          <li
            :class="[currentIndexInfo === 1 ? 'active' : '']"
            @click="currentIndexInfo = 1"
          ></li>
          <li
            :class="[currentIndexInfo === 2 ? 'active' : '']"
            @click="currentIndexInfo = 2"
          ></li>
          <li
            :class="[currentIndexInfo === 3 ? 'active' : '']"
            @click="currentIndexInfo = 3"
          ></li>
          <li
            :class="[currentIndexInfo === 4 ? 'active' : '']"
            @click="currentIndexInfo = 4"
          ></li>
          <li
            :class="[currentIndexInfo === 5 ? 'active' : '']"
            @click="currentIndexInfo = 5"
          ></li>
        </ul>
      </div>
      <!-- <div
        class="position_absolute action--slider-info d_flex align_items_center"
      >
        <span
          class="prev action"
          @click="prevInfo"
          v-if="currentIndexInfo !== 0"
        >
          <icon-base
            class="icon--arrow-left"
            icon-name="Prev"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-arrow-left></icon-arrow-left>
          </icon-base>
        </span>
        <span
          class="next ml_auto action"
          @click="nextInfo"
          v-if="currentIndexInfo !== 3"
        >
          <icon-base
            class="icon--arrow-left"
            icon-name="Next"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-arrow-left></icon-arrow-left>
          </icon-base>
        </span>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndexInfo: 0,
      widthDefault: { width: "100%" }
    };
  },
  methods: {
    nextInfo() {
      if (this.currentIndexInfo === 5) {
        this.currentIndexInfo = 5;
      } else {
        this.currentIndexInfo++;
      }
    },
    prevInfo() {
      if (this.currentIndexInfo === 0) {
        this.currentIndexInfo = 0;
      } else {
        this.currentIndexInfo--;
      }
    }
  }
  // mounted() {
  //   this.sliderWhyChooseZinbee();
  // }
};
</script>

<style scoped lang="scss">
// slides
.utilities {
  margin-bottom: 0 !important;
  color: #333;
  .options {
    border-bottom: 1px solid #ebebeb;
    .first,
    .second {
      flex: 1;
    }
    .title {
      flex: 1;
      p {
        line-height: 92px;
        margin-bottom: 0;
        display: inline-block;
        cursor: pointer;
        transition: 0.4s;
        position: relative;
        &::before {
          content: "";
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          position: absolute;
          background: transparent;
          transition: all 0.5s linear;
        }
      }
      &.active,
      &:hover {
        p {
          color: #333;
          &::before {
            background: #333;
            width: 100%;
          }
        }
      }
    }
  }
  .content--options {
    color: #333;
    overflow: hidden;
    &:hover {
      .action--slider-info {
        opacity: 1;
      }
    }
    .title--why {
      font-size: 1.8rem;
      margin: 0 0 1rem 0;
      font-weight: 500;
    }
    .section--title-content {
      margin-bottom: 10px;
    }
    .slide--image {
      // overflow: hidden;
      // height: 260px;
      .items {
        // overflow: hidden;
        width: 100%;
        // height: 260px;
      }
      .title {
        font-size: 1.2rem;
      }
      .left,
      .right {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        flex: 1;
        &.text {
          padding: 0 1rem;
        }
      }
    }
  }
  .action {
    margin-top: 1rem;
    li {
      cursor: pointer;
      display: inline-block;
      margin-right: 5px;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: #ccc;
      &.active {
        background: #f8b448;
      }
    }
  }
  .action--slider-info {
    opacity: 0;
    transition: 0.3s;
    width: 100%;
    top: 40%;
    transform: translateY(-50%);
    left: 0px;
    .action {
      cursor: pointer;
      // background: #ccc;
      border-radius: 50%;
      color: #f8b448;
      transition: 0.4s;
      &:hover {
        background: #f8b448;
        color: #fff;
      }
    }
    .next {
      transform: rotate(180deg);
      padding: 0.25rem 0.625rem;
      height: 44px;
      width: 44px;
      svg {
        margin-top: 6px;
      }
    }
    .prev {
      padding: 0.25rem 0.625rem;
      height: 44px;
      width: 44px;
      svg {
        margin-top: 6px;
      }
    }
  }
}
</style>
