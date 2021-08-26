import Vue from 'vue';

import {
  // need
  Button,
  Form,
  FormModel,
  Input,
  Checkbox,
  Select,
  Layout,
  Menu,
  message,
  Modal,
} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormModel.name, FormModel);
Vue.component(FormModel.Item.name, FormModel.Item);
Vue.component(Input.name, Input);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Layout.name, Layout);
Vue.component(Menu.name, Menu);

Vue.prototype.$message = message;
Vue.prototype.$Modal = Modal;
