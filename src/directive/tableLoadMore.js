export default {
  // eslint-disable-next-line no-unused-vars
  inserted(el, binding, vnode) {
    let lastPotion = 0;
    const scrollWrap = el.querySelector('.ant-table-body');

    scrollWrap.onscroll = function () {
      const distanceRelativeToBottom = this.scrollHeight - this.scrollTop - this.clientHeight;
      const direction = getDirection(lastPotion, this.scrollTop);
      if (direction === 'down' && distanceRelativeToBottom === 0) {
        this.scrollTop = 1;
      } else if (direction === 'up' && this.scrollTop === 0) {
        this.scrollTop = distanceRelativeToBottom - 1;
      }
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
