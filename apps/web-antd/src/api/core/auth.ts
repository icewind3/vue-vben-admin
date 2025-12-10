import { useAccessStore } from '@vben/stores';

import qs from 'qs';

import { baseRequestClient, requestClient } from '#/api/request';
import { APP } from '#/preferences';

export const ContentTypeEnum = {
  json: 'application/json;charset=UTF-8',
  formData: 'multipart/form-data;charset=UTF-8',
  formURLEncoded: 'application/x-www-form-urlencoded;charset=UTF-8',
};
export enum GrantTypeEnum {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    data: {
      access_token: string;
      expires_in: string;
      refresh_token: string;
    };
  }
}

const createAuthHeader = () => {
  const { client_id, client_secret } = APP.OAUTH;
  return {
    'content-type': ContentTypeEnum.formURLEncoded,

    Authorization: `basic ${window.btoa(`${client_id}:${client_secret}`)}`,
  };
};

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return baseRequestClient.post<AuthApi.LoginResult>(
    '/oauth2/token',
    qs.stringify(
      { ...data, grant_type: GrantTypeEnum.PASSWORD },
      { arrayFormat: 'brackets' },
    ),
    {
      headers: createAuthHeader(),
    },
  );
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  const accessStore = useAccessStore();

  return baseRequestClient.post<AuthApi.LoginResult>(
    '/oauth2/token',
    {
      refresh_token: accessStore.refreshToken,
      grant_type: GrantTypeEnum.REFRESH_TOKEN,
    },
    {
      withCredentials: true,
      headers: createAuthHeader(),
    },
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/sys_menu/permissions');
}
