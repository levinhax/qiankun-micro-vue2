<template>
  <div class="mix-mail-wrapper">
    <a-form-model
      ref="ruleForm"
      :model="formInline"
      :rules="formRules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="邮箱" prop="mailAdd">
        <a-input v-model="formInline.mailAdd" placeholder="邮箱"></a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="mailPass">
        <a-input v-model="formInline.mailPass" placeholder="密码"></a-input>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'MixMail',
  data() {
    return {
      formInline: {
        mailAdd: '',
        mailPass: '',
      },
      formRules: {
        mailAdd: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mailPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
        ],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
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
  },
};
</script>
