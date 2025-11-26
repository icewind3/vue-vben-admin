import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});

export const APP = {
  OAUTH: {
    // oauth中请求头内需加密的client_id
    client_id: 'c85b4d4e6d894c2a9fb6719c8875e114',
    // oauth中请求头内需加密的client_secret
    client_secret: 'af6814bed3fd435a8cd46cea00be2e80',
  },
};
