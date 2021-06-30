<template>
  <div class="mix-phone-wrapper">
    <a-form-model
      ref="ruleForm"
      :model="formInline"
      :rules="formRules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="手机号码" prop="phone">
        <a-input v-model="formInline.phone" placeholder="手机号码"></a-input>
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="code">
        <a-input v-model="formInline.code" placeholder="验证码"></a-input>
      </a-form-model-item>
      <a-form-model-item label="昵称" prop="nickname">
        <a-input v-model="formInline.nickname" placeholder="昵称"></a-input>
        <span v-if="!isNeedNickName" style="color: red; font-size: 12px">昵称不是必填</span>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'MixPhone',
  props: ['isNeedNickName'],
  data() {
    return {
      formInline: {
        phone: '',
        code: '',
        nickname: '',
      },
      formRules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        nickname: [
          {
            validator: (rule, value, callback) => {
              if (this.isNeedNickName && value === '') {
                callback(new Error('请输入昵称'));
              } else {
                callback();
              }
            },
          },
        ],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  watch: {
    isNeedNickName: function (val) {
      if (val) {
        this.handleChangeValidator();
      }
    },
  },
  methods: {
    vaildate() {
      return this.$refs['ruleForm'].validate();
    },
    getData() {
      return this.formInline;
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    },
    handleChangeValidator() {
      this.$nextTick(() => {
        // this.$refs['ruleForm'].validateField(['nickname'], { force: true });
        this.formRules.nickname = [{ required: true }];
      });
    },
  },
};
</script>
