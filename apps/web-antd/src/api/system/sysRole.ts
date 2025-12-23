import type { Recordable } from '@vben/types';

import type { PageQuery, PageResp } from '.';

import { requestClient } from '#/api/request';

export namespace SysRoleApi {
  export interface SysRole {
    /** 唯一标识ID*/
    id: number;
    /** 角色代码*/
    code: string;
    /** 角色名称*/
    name: string;
    /** 备注*/
    remark: string;
    /** 是否启用*/
    enabled: boolean;
    /** 创建时间*/
    createTime: string;
    /** 更新时间*/
    updateTime: string;
  }
}

export const apiSysRolePage = async (
  params?: PageQuery<{
    code?: string;
    enabled?: boolean;
    name?: string;
  }>,
): Promise<PageResp<SysRoleApi.SysRole>> => {
  return requestClient.get('/sys_role/page', {
    params,
  });
};

export const apiSysRoleView = async (params?: {
  id: number | string;
}): Promise<SysRoleApi.SysRole> => {
  return requestClient.get('/sys_role/view', {
    params,
  });
};

export const apiSysRoleCreate = async (data: any): Promise<Recordable<any>> => {
  return requestClient.post('/sys_role/create', {
    ...data,
  });
};

export const apiSysRoleUpdate = async (
  id: number,
  data: any,
): Promise<Recordable<any>> => {
  return requestClient.put(`/sys_role/update/${id}`, data);
};

export const apiSysRoleUpdateStatus = async (
  id: number,
  data: {
    enabled: boolean;
  },
): Promise<Recordable<any>> => {
  return requestClient.put(`/sys_role/update_status/${id}`, data);
};

export const apiSysRoleDelete = async (
  ids: number[],
): Promise<Recordable<any>> => {
  return requestClient.delete('/sys_role/delete', {
    data: { ids },
  });
};
