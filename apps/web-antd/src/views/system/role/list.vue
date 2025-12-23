<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SysRoleApi } from '#/api';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  apiSysRoleDelete,
  apiSysRolePage,
  apiSysRoleUpdateStatus,
  apiSysRoleView,
} from '#/api';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './module/form.vue';
import View from './module/view.vue';

const { hasAccessByCodes } = useAccess();

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [ViewDrawer, viewApi] = useVbenDrawer({
  connectedComponent: View,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    fieldMappingTime: [
      [
        'createTime',
        ['createTimeStart', 'createTimeEnd'],
        'YYYY-MM-DD HH:mm:ss',
      ],
    ],
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useColumns(
      onActionClick,
      hasAccessByCodes(['sys_role:update']) ? onStatusChange : undefined,
    ),
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await apiSysRolePage({
            pageNumber: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
  } as VxeTableGridOptions<SysRoleApi.SysRole>,
});

function onActionClick({ code, row }: OnActionClickParams<SysRoleApi.SysRole>) {
  switch (code) {
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
    case 'view': {
      handleView(row);
      break;
    }
  }
}

/**
 * 将Antd的Modal.confirm封装为promise，方便在异步函数中调用。
 * @param content 提示内容
 * @param title 提示标题
 */
function confirm(content: string, title: string) {
  return new Promise((reslove, reject) => {
    Modal.confirm({
      content,
      onCancel() {
        reject(new Error('已取消'));
      },
      onOk() {
        reslove(true);
      },
      title,
    });
  });
}

/**
 * 状态开关即将改变
 * @param newStatus 期望改变的状态值
 * @param row 行数据
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 */
async function onStatusChange(newStatus: boolean, row: SysRoleApi.SysRole) {
  const status: Recordable<string> = {
    false: '禁用',
    true: '启用',
  };
  try {
    await confirm(
      `你要将${row.name}的状态切换为 【${status[newStatus.toString()]}】 吗？`,
      `切换状态`,
    );
    await apiSysRoleUpdateStatus(row.id, { enabled: newStatus });
    return true;
  } catch {
    return false;
  }
}

function onEdit(row: SysRoleApi.SysRole) {
  formDrawerApi.setData(row).open();
}

function handleView(row: SysRoleApi.SysRole) {
  const res = apiSysRoleView({ id: row.id });
  viewApi.setData(res).open();
}

function onDelete(row: SysRoleApi.SysRole) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  apiSysRoleDelete([row.id])
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  formDrawerApi.setData({}).open();
}
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <ViewDrawer />
    <Grid table-title="角色列表">
      <template #toolbar-tools>
        <Button
          type="primary"
          @click="onCreate"
          v-access:code="'sys_role:create'"
        >
          <Plus class="size-5" />
          新增角色
        </Button>
      </template>
    </Grid>
  </Page>
</template>
