<template>
  <div class="block-top">
      <div class="block-top__item">
          <h6 class="title block-top__title">{{ blockTop.title }}</h6>
      </div>
      <div class="block-top__item">
          <router-link :to="blockTop.btn.route ? blockTop.btn.route : { name: 'home' }" class="block-top__btn btn">{{ blockTop.btn.title }}<span><img src="../../assets/icons/right_arrow_gr.svg" alt="arrow"></span></router-link>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        blockTop: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">
.block-top {
    margin-bottom: 37.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__btn {
        padding: 6px 12px;
    }
}
</style>