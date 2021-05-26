// 过滤空参数
export const helperFilterEmptyParam = obj => {
  const newObj = {};
  for (let key in obj) {
    if (obj[key] !== '') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
