<template>
  <div id="app">
    <router-view />
  </div>

</template>

<script>
export default {
  name: 'App',
  created() {
  }
}
</script>

<style>
.p-10 {
  padding: 10px;
}

.pl-10 {
  padding-left: 10px;
}

.pr-10 {
  padding-right: 10px;
}

.pt-10 {
  padding-top: 10px;
}

.pb-10 {
  padding-bottom: 10px;
}

.m-10 {
  margin: 10px !important;
}

.ml-10 {
  margin-left: 10px;
}

.mr-10 {
  margin-right: 10px;
}

.mt-10 {
  margin-top: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mg-5 {
  margin: 5px !important;
}

.ml-5 {
  margin-left: 5px;
}

.mr-5 {
  margin-right: 5px;
}

.mt-5 {
  margin-top: 5px;
}

.mb-5 {
  margin-bottom: 5px;
}

.el-table .cell {
  word-break: unset !important;
}

.vertical-middle {
  vertical-align: middle !important;
}

.el-message-box__message p, .el-form-item--medium .el-form-item__label {
  word-break: break-word;
}
/* , .table-bordered thead th, .table td, .table th */
.word-break, .table-bordered thead td {
  word-break: break-word;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.el-table .cell {
  text-overflow: unset !important;
}
</style>
<style lang="scss">
.tab_image {
  .el-tabs__content {
    height: 600px;
    max-height: 65vh;
    overflow-y: scroll;
  }
}
.width-100 {
  width: 100%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex {
  display: flex !important;
}

.colum {
  flex-direction: column !important;
}
.justify-content-center {
  justify-content: center !important;
}
.justify-content-space-between {
  justify-content: space-between !important;
}
.align-items-center {
  align-items: center;
}
.text-align-center {
  text-align: center;
}
.cursor-pointer {
  cursor: pointer !important;
}
.mx-10 {
  margin: 0 10px;
}
.m-0 {
  margin: 0;
}
</style>
<style lang="scss">
  @media screen and (min-width: 0px) and (max-width: 700px) {
    .el-dialog {
      min-width: 95%;
      max-width: 500px;
    }
    .el-select-dropdown__list {
      max-width: 90vw;
    }
  }
</style>
