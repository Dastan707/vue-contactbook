import axios from 'axios'

export default {
  state: {
    contacts: [],
    contactDetails: {}
  },
  getters: {
    contacts: state => state.contacts,
    contactDetails: state => state.contactDetails
  },
  actions: {
    async getAllContacts ({ commit }) {
    // if in the local storage there is no data, then we will make a request to api
      if (!localStorage.contacts) {
        await axios.get('https://demo.sibers.com/users')
          .then(res => {
            localStorage.setItem('contacts', JSON.stringify(res.data))
            commit('setAllContacts', res.data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        // if in the local storage there is data, then we get from local storage
        commit('setAllContacts', JSON.parse(localStorage.getItem('contacts')))
      }
    },
    getContactDetails ({ commit }, contactDetails) {
      commit('setContactDetails', contactDetails)
      localStorage.setItem('contactDetails', JSON.stringify(contactDetails))
    },
    editContact ({ commit }, editedContact) {
      commit('setEditContact', editedContact)
    }
  },
  mutations: {
    setAllContacts (state, payload) {
      state.contacts = payload
    },
    setContactDetails (state, payload) {
      state.contactDetails = payload
    },
    setEditContact (state, payload) {
      state.contactDetails = payload
      state.contacts[payload.id] = payload
      // save new edited contact to local storage
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
      localStorage.setItem('contactDetails', JSON.stringify(payload))
    }
  }
}
