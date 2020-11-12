<template>
  <a-card>
    <a-alert
      message="Here we use window.print() to implement the feature of downloading PDF."
      type="info"
      show-icon
      style="margin-bottom:15px"
    />
    <router-link target="_blank" to="/pdf/download">
      <a-button type="primary"> Click to download PDF </a-button>
    </router-link>
  </a-card>
</template>
