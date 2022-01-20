<template>
<div class="modal-wrapper" ref="modal-wrapper">
      <div class="v-modal">
          <div class="v-modal-header">
              <h3 class="v-modal-title">Edit contact</h3>
          </div>
          <div class="v-modal-content">
            <div class="v-modal-content__left">
            <input type="text" class="v-modal-inp" v-model="contactEdit.name">
            <input type="text" class="v-modal-inp" v-model="contactEdit.username">
            <input type="text" class="v-modal-inp" v-model="contactEdit.email">
            <input type="text" class="v-modal-inp" v-model="contactEdit.address.country">
            <input type="text" class="v-modal-inp" v-model="contactEdit.address.city">
            </div>
            <div class="v-modal-content__right">
            <input type="text" class="v-modal-inp" v-model="contactEdit.address.state">
            <input type="text" class="v-modal-inp" v-model="contactEdit.address.streetA">
            <input type="text" class="v-modal-inp" v-model="contactEdit.company.name">
            <input type="text" class="v-modal-inp" v-model="contactEdit.company.catchPhrase">
            <input type="text" class="v-modal-inp" v-model="contactEdit.website">
            </div>
          </div>
          <div class="v-modal-footer">
                <button id="save" class="button_modal" @click="saveContact">Save</button>
                <button class="button_modal" @click="closeModal">Close Modal</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {}
  },
  props: {
    contactEdit: {
      type: Object
    }
  },
  computed: {},
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    saveContact () {
      this.$store.dispatch('editContact', this.contactEdit)
        .then(() => {
          this.$emit('saveContact')
        })
    }
  },
  mounted () {
    const vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['modal-wrapper']) { vm.closeModal() }
    })
  }
}
</script>

<style>
.button_modal{
    background-color: #043488;
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    cursor: pointer;
    border-radius: 12px;
}
.modal-wrapper{
    background: rgba(64, 64, 64, 0.4);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.v-modal{
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 800px;
    height: 400px;
    background: #ffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
}
.v-modal-header{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 35px;
}
 .v-modal-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.v-modal-content{
    display: flex;
    justify-content: center;
    align-items: center;
}
.v-modal-inp{
    width: 340px;
    height: 40px;
    border: 1px solid #bbbbbb;
    border-left: 0;
    border-right: 0;
}
#save{
    margin-right: 10px;
}
@media all and (max-width: 900px){
    .v-modal-title{
        font-size: 15px;
    }
    .v-modal-inp{
        font-size: 10px;
    }
}
</style>
