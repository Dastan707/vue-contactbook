<template>
      <div v-bind:class="message.type">
        <span class="closebtn" @click="close">&times;</span>
        <strong v-if="message.type != 'danger'" >Success!</strong>
        {{message.text}}
    </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {}
  },
  props: {
    message: {
      type: Object
    }
  },
  methods: {
    close () {
      this.message.type = 'notDisplayed'
    }
  }
}
</script>

<style>
.success {
    display: "";
    padding: 20px;
    background-color: #04AA6D;
    color: white;
    border-radius: 8px;
}
.danger {
    display: "";
    padding: 20px;
    background-color: rgba(255, 99, 71, 0.8);
    border-radius: 8px;
    margin-bottom: 10px;
}
.notDisplayed{
    display: none;
}
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

}
.closebtn:hover {
color: black;
}
</style>
