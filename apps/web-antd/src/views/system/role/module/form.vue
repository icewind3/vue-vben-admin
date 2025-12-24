<script lang="ts" setup>
import type { SysRoleApi } from '#/api/system/sysRole';

import { useVbenDrawer } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { apiSysRoleCreate, apiSysRoleUpdate } from '#/api/system/sysRole';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emits = defineEmits(['success']);

const formData = ref<SysRoleApi.SysRole>();

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const id = ref();
const isEdit = ref(false);
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    drawerApi.setState({ confirmLoading: true });
    (id.value
      ? apiSysRoleUpdate({ id: id.value, ...values })
      : apiSysRoleCreate(values)
    )
      .then(() => {
        emits('success');
        message.success(isEdit ? '修改成功' : '新增成功');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
        drawerApi.setState({ confirmLoading: false });
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<SysRoleApi.SysRole>();
      formApi.resetForm();

      if (data) {
        formData.value = data;
        id.value = data.id;
        isEdit.value = true;
      } else {
        id.value = undefined;
      }
      // Wait for Vue to flush DOM updates (form fields mounted)
      await nextTick();
      if (data) {
        formApi.setValues(data);
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', '角色')
    : $t('common.create', '角色');
});
</script>
<template>
  <Drawer :title="getDrawerTitle">
    <Form />
  </Drawer>
</template>
<style lang="css" scoped></style>
