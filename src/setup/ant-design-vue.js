import Vue from 'vue';

import {
  // need
  Button,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(Layout.name, Layout);
Vue.component(Menu.name, Menu);

Vue.prototype.$message = message;
Vue.prototype.$Modal = Modal;
