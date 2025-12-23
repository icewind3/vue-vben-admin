import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SysRoleApi } from '#/api';

import { useAccess } from '@vben/access';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: '角色编码',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名称',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: true },
          { label: $t('common.disabled'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: true,
      fieldName: 'enabled',
      label: '状态',
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名称',
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: '角色编码',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: '是', value: 'true' },
          { label: '否', value: 'false' },
        ],
      },
      defaultValue: 'true',
      fieldName: 'enabled',
      label: '是否启用',
    },
    {
      component: 'RangePicker',
      componentProps: {
        showTime: {
          defaultValue: [
            dayjs('00:00:00', 'HH:mm:ss'),
            dayjs('23:59:59', 'HH:mm:ss'),
          ],
        },
      },
      fieldName: 'createTime',
      label: '创建时间',
    },
  ];
}

export function useColumns<T = SysRoleApi.SysRole>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  const { hasAccessByCodes } = useAccess();

  return [
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'name',
      title: '角色名称',
      width: 200,
    },
    {
      field: 'code',
      title: '角色编码',
      width: 200,
    },
    {
      cellRender: {
        attrs: { beforeChange: onStatusChange },
        name: onStatusChange ? 'CellSwitch' : 'CellTag',
      },
      field: 'enabled',
      title: '是否启用',
      width: 100,
    },
    {
      field: 'remark',
      minWidth: 100,
      title: '备注',
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'edit',
            show: hasAccessByCodes(['sys_role:edit']),
          },
          {
            code: 'delete',
            show: hasAccessByCodes(['sys_role:delete']),
          },
          {
            code: 'view',
            show: hasAccessByCodes(['sys_role:view']),
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      showOverflow: true,
      title: '操作',
      width: 160,
    },
  ];
}
