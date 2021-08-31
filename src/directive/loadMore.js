export default {
  // eslint-disable-next-line no-unused-vars
  inserted(el, binding, vnode) {
    // const selectDom = el.querySelector('.ant-select-selection');
    // console.log('selectDom: ', selectDom);
    el.addEventListener('scroll', function () {
      console.log('滚动');
      const isEnd = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (isEnd) {
        console.log('isEnd: ', isEnd);
        binding.value();
      }
    });
  },
};
