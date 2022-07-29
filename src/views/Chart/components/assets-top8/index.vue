<template>
  <div class="assets-top8-wrapper">
    <div class="assets-head">
      <div class="col1">任务名称</div>
      <div class="col2">执行次数</div>
      <div class="col3">敏感表发现</div>
      <div class="col4">敏感字段发现</div>
    </div>
    <div class="assets-content">
      <div v-for="(item, index) in list" :key="index" class="assets-item">
        <div class="assets-item-name">
          <div class="assets-item-rank">{{ index + 1 }}</div>
          <div class="assets-item-text">{{ item.name }}</div>
        </div>
        <div class="assets-item-block assets-item-execute">{{ item.executeCount }}</div>
        <div class="assets-item-block assets-item-discover">{{ item.discoverCount }}</div>
        <div class="assets-item-block assets-item-field">{{ item.fieldCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetsTop8',
  data() {
    return {
      list: [
        {
          name: '县政务数据办',
          executeCount: 1,
          discoverCount: 74,
          fieldCount: 1023,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 1,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 1,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 1,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 1,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 6,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局体育局',
          executeCount: 7,
          discoverCount: 62,
          fieldCount: 675,
        },
        {
          name: '县文化旅游体育局',
          executeCount: 8,
          discoverCount: 62,
          fieldCount: 675,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.assets-top8-wrapper {
  width: 376px;

  .assets-head {
    width: 100%;
    height: 36px;
    background: #f2f4f8;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #323233;
    font-weight: 600;
    margin-bottom: 12px;

    .col1 {
      width: 132px;
      padding-left: 28px;
    }

    .col2 {
      width: 80px;
    }
    .col3 {
      width: 80px;
    }
    .col4 {
      width: 86px;
    }
  }

  .assets-item {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #323233;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .assets-item-block {
    width: 56px;
    height: 20px;
    text-align: center;
    margin-right: 24px;
  }

  .assets-item-name {
    width: 132px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 4px;
    display: flex;
    align-items: center;
  }

  .assets-item-text {
    width: 102px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .assets-item-rank {
    width: 22px;
    height: 22px;
    text-align: center;
    font-family: DINAlternate-Bold;
    font-size: 12px;
    color: #ffffff;
    line-height: 21px;
    font-weight: 700;
    background: url('../../../../assets/images/rank4.png');
    background-size: 100%;
    margin-right: 3px;
  }

  .assets-item-execute {
    background: rgba(31, 90, 255, 0.2);
    color: #1f5aff;
  }

  .assets-item-discover {
    background: rgba(47, 190, 213, 0.2);
    color: #17a8bf;
  }
  .assets-item-field {
    background: rgba(255, 139, 44, 0.2);
    color: #ff8b2c;
  }

  .assets-content {
    .assets-item:nth-child(1) {
      .assets-item-rank {
        background: url('../../../../assets/images/rank1.png');
        background-size: 100%;
      }
    }
    .assets-item:nth-child(2) .assets-item-rank {
      background: url('../../../../assets/images/rank2.png');
      background-size: 100%;
    }
    .assets-item:nth-child(3) .assets-item-rank {
      background: url('../../../../assets/images/rank3.png');
      background-size: 100%;
    }
  }
}
</style>
