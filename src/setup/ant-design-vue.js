import Vue from 'vue';

import {
  // need
  ConfigProvider,
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
  Table,
  Spin,
  Pagination,
} from 'ant-design-vue';

Vue.use(ConfigProvider);

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
Vue.component(Table.name, Table);
Vue.component(Spin.name, Spin);
Vue.component(Pagination.name, Pagination);

Vue.prototype.$message = message;
Vue.prototype.$Modal = Modal;
