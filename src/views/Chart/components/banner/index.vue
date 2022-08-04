<template>
  <div class="banner-wrapper">
    <div class="slider-list">
      <div v-for="(item, index) in propList" :key="index" class="slider-list-item">
        <div class="db-type">{{ item.dbType }}</div>
        <div class="db-text db-count">
          <div class="db-text-value">{{ item.count }}</div>
          数据源数
        </div>
        <div class="db-text db-table">
          <div class="db-text-value">{{ item.tableCount }}</div>
          数据表数
        </div>
        <div class="db-text db-percent">
          <div class="db-text-value">{{ item.percent }}</div>
          数据源占比(%)
        </div>
      </div>
    </div>
    <div class="prev-btn" @click="handlePlayPrev">&lt;</div>
    <div class="next-btn" @click="handlePlayNext">&gt;</div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      data_PlayInd: 0,
    };
  },
  props: {
    propList: {
      type: Array,
      default: () => [
        {
          dbType: 'MYSQL',
          count: 1,
          tableCount: 1230,
          percent: '25%',
        },
        {
          dbType: 'KINGBASE',
          count: 2,
          tableCount: 2230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 3,
          tableCount: 3230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 4,
          tableCount: 4230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 5,
          tableCount: 5230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 6,
          tableCount: 6230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 7,
          tableCount: 7230,
          percent: '25%',
        },
        {
          dbType: 'MYSQL',
          count: 8,
          tableCount: 8230,
          percent: '25%',
        },
      ],
    },
  },
  mounted() {
    setTimeout(() => {
      console.log(5);
    });
    this.$nextTick(() => {
      console.log(2);
      this.$nextTick(() => {
        console.log(3);
      });
    });
    setTimeout(() => {
      console.log(1);
    });
    setTimeout(() => {
      console.log(4);
    });
    this.$nextTick(() => {
      this.handleAutoPlay();
    });
  },
  methods: {
    handlePlay() {
      // const len = Math.floor(this.propList.length / 2);
      const slideList = document.getElementsByClassName('slider-list')[0];
      this.data_PlayInd++;
      slideList.style.left = -this.data_PlayInd * (844 + 24) + 'px';
      slideList.style.transition = 'all 1.2s';
      if (this.data_PlayInd >= 4) {
        this.data_PlayInd = 0;
        slideList.style.left = 0;
        slideList.style.transition = 'none';
      }

      // 显示/隐藏
      // const slideListItems = document.getElementsByClassName('slider-list-item');
      // for (let i = 0; i < 8; i++) {
      //   slideListItems[i].style.display = 'none';
      // }
      // if (this.data_PlayInd >= 4) {
      //   this.data_PlayInd = 0;
      // }
      // slideListItems[2 * this.data_PlayInd].style.display = 'block';
      // slideListItems[2 * this.data_PlayInd + 1].style.display = 'block';

      // slideList.addEventListener('mouseenter', () => {
      //   clearInterval(this.timer);
      //   this.timer = null;
      // });
      // slideList.addEventListener('mouseleave', () => {
      //   this.handleAutoPlay();
      // });
    },
    handleAutoPlay() {
      this.timer = setInterval(() => {
        this.handlePlay();
      }, 3000);
    },
    handlePlayNext() {
      clearInterval(this.timer);
      this.timer = null;
      this.data_PlayInd++;
      if (this.data_PlayInd >= 4) {
        this.data_PlayInd = 0;
      }
      this.handleAutoPlay();
    },
    handlePlayPrev() {
      clearInterval(this.timer);
      this.timer = null;
      this.data_PlayInd--;
      if (this.data_PlayInd <= 0) {
        this.data_PlayInd = 0;
      }
      this.handleAutoPlay();
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-wrapper {
  width: 844px;
  height: 88px;
  position: relative;
  overflow: hidden;
  border: 1px solid red;

  .slider-list {
    display: flex;
    position: relative;
    left: 0;
    width: 844px;
    height: 88px;
    // transform: translateX(-844px);
    // transition: all 1s;
  }

  .slider-list .slider-list-item {
    flex-shrink: 0;
    display: inline-block;
    width: 410px;
    height: 88px;
    background: url(../../../../assets/images/banner-item-bg.png);
    background-size: 410px 88px;
    margin-right: 24px;
    position: relative;

    .db-type {
      width: 54px;
      height: 100%;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-shadow: 0 1px 0 #016da2;
      font-weight: 600;
      word-break: break-all;
      position: absolute;
      left: 32px;
      display: flex;
      align-items: center;
    }

    .db-text {
      position: absolute;
      width: 100%;
      text-align: center;
      padding-top: 24px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #5e696b;
      line-height: 18px;

      .db-text-value {
        width: 100%;
        font-family: DS-Digital-Bold;
        font-size: 24px;
        color: #17a8bf;
        text-align: center;
        line-height: 18px;
        font-weight: 700;
        margin-top: 5px;
      }
    }

    .db-count {
      left: 128px;
      width: 60px;
    }

    .db-table {
      left: 216px;
      width: 60px;
    }

    .db-percent {
      left: 306px;
      width: 90px;
    }
  }

  .prev-btn {
    color: red;
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 1000;
    cursor: pointer;
  }
  .next-btn {
    color: red;
    position: absolute;
    right: 10px;
    top: 60px;
    z-index: 1000;
    cursor: pointer;
  }
}
</style>
