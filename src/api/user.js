import Http from '../utils/http';

// 用户登录
export function login(data) {
  return Http({
    url: '/api/user/login',
    method: 'post',
    data,
  });
}

// 获取用户信息
export function getAccountByToken(params) {
  return Http({
    url: '/api/user/getAccountByToken',
    method: 'get',
    params,
  });
}
