export default {
  // eslint-disable-next-line no-unused-vars
  inserted(el, binding, vnode) {
    let lastPotion = 0;
    const scrollWrap = el.querySelector('.ant-table-body');
    console.log('scrollWrap: ', scrollWrap);

    scrollWrap.onscroll = function () {
      const distanceRelativeToBottom = this.scrollHeight - this.scrollTop - this.clientHeight;
      const direction = getDirection(lastPotion, this.scrollTop);
      lastPotion = this.scrollTop;
      binding.value({
        direction,
        scrollTop: this.scrollTop,
        distanceRelativeToBottom,
      });
    };

    function getDirection(last, now) {
      return now - last > 0 ? 'down' : 'up';
    }
  },
};
