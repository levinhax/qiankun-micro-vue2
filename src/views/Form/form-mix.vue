<template>
  <div class="mix-form-wrapper">
    <a-form-model
      ref="ruleForm"
      :model="formInline"
      :rules="formRules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="用户名" prop="name">
        <a-input v-model="formInline.name" placeholder="用户名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="类型" prop="type">
        <a-select v-model="formInline.type" placeholder="请选择">
          <a-select-option v-for="item in local_TypeOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="昵称必填" prop="isNeedNickName" v-if="formInline.type === 'phone'">
        <a-checkbox v-model="formInline.isNeedNickName"></a-checkbox>
      </a-form-model-item>
      <ComMixMail ref="mail" v-if="formInline.type === 'mail'" />
      <com-mix-phone
        ref="phone"
        :isNeedNickName="formInline.isNeedNickName"
        v-if="formInline.type === 'phone'"
      ></com-mix-phone>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleSubmitForm1()">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import ComMixMail from './components/mix-mail.vue';
import ComMixPhone from './components/mix-phone.vue';

export default {
  name: 'MixForm',
  components: {
    ComMixMail,
    ComMixPhone,
  },
  data() {
    return {
      formInline: {
        name: '',
        type: 'mail',
        isNeedNickName: false,
      },
      formRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // type和ref名称的映射
      typeRefMap: {
        mail: 'mail',
        phone: 'phone',
      },
      // 模拟的不同类型表单的提交
      fakeSubmit: {
        mail: data => alert(`邮箱类型提交创建成功${JSON.stringify(data)}`),
        phone: data => alert(`手机类型提交创建成功${JSON.stringify(data)}`),
      },
    };
  },
  created() {
    this.local_TypeOptions = [
      {
        value: 'mail',
        label: '邮箱',
      },
      {
        value: 'phone',
        label: '手机号',
      },
    ];
  },
  methods: {
    // 父表单，子表单一起验证，也可先验证父表单，再验证子表单
    handleSubmitForm1() {
      console.log('数据提交');
      const templateType = this.typeRefMap[this.formInline.type];
      const validate1 = this.$refs['ruleForm'].validate();
      const validate2 = this.$refs[templateType].vaildate();

      Promise.all([validate1, validate2])
        .then(res => {
          // 都通过时，发送请求
          console.log('res: ', res); // true
          if (res) {
            const reqData = {
              ...this.$refs[templateType].getData(),
              ...this.formInline,
            };
            this.fakeSubmit[this.formInline.type](reqData);
          }
        })
        .catch(err => {
          console.log('err: ', err);
          this.$message.error('信息校验失败');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mix-form-wrapper {
  width: 600px;
  margin: 0 auto;
  padding-top: 120px;
}
</style>
