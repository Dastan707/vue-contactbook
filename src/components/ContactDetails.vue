<template>
<div>
  <div class="nav">
      <!-- Navbar -->
    <Navbar />
  </div>
  <div class="contacts-container">
  <div class="message">
      <!-- Message  -->
    <Message
    v-if="isMessageVisible"
    :message="message"
    />
  </div>
    <div class="contacts-title">
        <span class="contacts-title__text">Contact Details</span>
    </div>
    <div class="contact-details">
        <div class="contact-details__button">
          <button class="button_modal" @click="openModal">Edit contact</button>
        </div>
        <table class="contact-details__table">
            <tbody>
                <tr class="contact-details__table-row">
                  <td>Name: </td>
                  <td>{{contactDetails.name}}</td>
                </tr>
                <tr class="contact-details__table-row">
                  <td>Username: </td>
                  <td>{{contactDetails.username}}</td>
                </tr>
                <tr class="contact-details__table-row">
                  <td>Email: </td>
                  <td>{{contactDetails.email}}</td>
                </tr>
                <tr class="contact-details__table-row">
                  <td>Address: </td>
                  <td>{{contactDetails.address.country}}, {{contactDetails.address.city}}, {{contactDetails.address.state}} (street: {{contactDetails.address.streetA}})</td>
                </tr>
                <tr class="contact-details__table-row">
                  <td>Company: </td>
                  <td>{{contactDetails.company.name}} (<b>"{{contactDetails.company.catchPhrase}}"</b>)</td>
                </tr>
                <tr class="contact-details__table-row">
                  <td>Website: </td>
                  <td> <a href="#">{{contactDetails.website}}</a> </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Modal for edit -->
    <Modal
      v-if="isModalVisible"
      @closeModal="closeModal"
      @saveContact="saveContact"
      :contactEdit="contactDetails"
    />
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from './Message.vue'
import Modal from './Modal.vue'
import Navbar from './Navbar.vue'
export default {
  name: 'ContactDetails',
  components: {
    Modal,
    Navbar,
    Message
  },
  data () {
    return {
      isModalVisible: false,
      isMessageVisible: false,
      message: {
        text: '',
        type: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      contactDetails: 'contactDetails'
    })
  },
  methods: {
    closeModal () {
      this.isModalVisible = false
    },
    openModal () {
      this.isModalVisible = true
    },
    saveContact () {
      this.isModalVisible = false
      this.isMessageVisible = true
      this.message.text = 'Contact successfully edited'
      this.message.type = 'success'
      setTimeout(() => {
        this.message.type = 'notDisplayed'
      }, 1700)
    }
  },
  mounted () {
    this.$store.dispatch('getContactDetails', this.$route.params.contact)
  }
}
</script>
<style>
.contact-details{
    display: flex;
    justify-content: space-evenly;
}
.contact-details__button{
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.img-details{
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}
.contact-details__table-row{
    border-top: 1px solid rgb(221, 221, 221);
}
.contact-details__table-row:first-child{
    border-top: 0;
}
.contact-details__table-row > td{
    border-top: 0;
}
.message{
    margin-bottom: 25px;
}
@media all and (max-width: 900px){
  .contact-details__table td{
    font-size: 10px;
  }
  .button_modal{
    padding: 10px 20px;
    font-size: 10px;
  }
}

</style>
