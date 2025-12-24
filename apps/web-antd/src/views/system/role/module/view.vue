<script setup lang="ts" name="user-view">
import { useVbenDrawer } from '@vben/common-ui';

const data = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  zIndex: 999,
  title: '详情',
  showCancelButton: false,
  onConfirm: () => {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any>>();
    }
  },
});
</script>
<template>
  <Drawer>
    <a-descriptions label-placement="left" :column="2" size="small" bordered>
      <a-descriptions-item label="角色编码">
        {{ data.code }}
      </a-descriptions-item>
      <a-descriptions-item label="角色名称">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">{{ data.remark }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ data.createTime }}
      </a-descriptions-item>
      <a-descriptions-item label="修改时间">
        {{ data.updateTime }}
      </a-descriptions-item>
    </a-descriptions>
  </Drawer>
</template>
<style lang="less" scoped></style>
