<template>
  <a-card>
    <a-result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <a-button key="console" type="primary"> Go Console </a-button>
        <a-button key="buy"> Buy Again </a-button>
      </template>
      <div>
        <a-steps :current="1">
          <template #progressDot="{ index, status, prefixCls }">
            <a-popover>
              <template #content>
                <span>step {{ index }} status: {{ status }}</span>
              </template>
              <span :class="`${prefixCls}-icon-dot`" />
            </a-popover>
          </template>
          <a-step title="Finished" description="You can hover on the dot." />
          <a-step title="In Progress" description="You can hover on the dot." />
          <a-step title="Waiting" description="You can hover on the dot." />
          <a-step title="Waiting" description="You can hover on the dot." />
        </a-steps>
      </div>
    </a-result>
  </a-card>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
</style>
