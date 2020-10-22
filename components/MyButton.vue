<template>
  <div id="Btn">
    <div class="text-h5">
      <slot name="header"></slot>
    </div>
    <div class="subtitle-2">
      <slot name="text"></slot>
    </div>
    <div id="Icon">
      <slot name="icon"></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "",
  components: {},
})
export default class MyButton extends Vue {}
</script>

<style lang='scss' scoped>
#Btn {
  position: relative;
  padding: 20px;
  z-index: 1;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: -2;
  }

  &:before {
    content: "";
    
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: black;
    transition: all 0.5s;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }

  .text-h5 {
    font-weight: 700;
  }

  .subtitle-2 {
    font-weight: 700;
    letter-spacing: 3px !important;
  }

  #Icon {
    position: absolute;
    right: 40px;
    transform: translateY(-150%);
  }
}
</style>