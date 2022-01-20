<template>
  <div class="contacts-container">
      <div class="contacts-title">
          <span class="contacts-title__text">Contact Book</span>
        <div class="search-item">
        <input class="inp-search"  v-model="searchContact" placeholder="Search contact..." type="search" />
        <div class="search-result" v-if="searchContact">
            <div id="searchDiv" ref="searchRes" class="search-items">
                <span v-for="contact in searchHandler" :key="contact.id">
                   <router-link :to="{name: 'ContactDetails', params: {id: contact.id, contact: contact}}">
                   <p class="search-list">{{contact.name}}</p>
                   </router-link>
                </span>
            </div>
        </div>
        <div v-else>
            <div class="close"></div>
        </div>
    </div>
      </div>
      <table class="contacts-table">
          <thead>
              <tr class="contacts-table__head">
                  <th class="contacts-table__head_id">
                      #
                      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L0 0H10L5 5Z" fill="#244677"/></svg>
                  </th>
                  <th class="contacts-table__head_name">
                      Name
                  </th>
                    <th class="contacts-table__head_name">
                      Username
                  </th>
                  <th class="contacts-table__head_email">
                      Email
                  </th>
                  <th class="contacts-table__head_country">
                      City
                  </th>
                  <th class="contacts-table__head_company">
                      Company
                  </th>
                  <th></th>
              </tr>
          </thead>
          <tr class="line">
              <th class="line"></th>
              <th class="line"></th>
              <th class="line"></th>
              <th class="line"></th>
              <th class="line"></th>
              <th class="line"></th>
              <th class="line"></th>
          </tr>
          <tbody class="contacts-table__body">
              <tr v-for="contact in paginatedContacts" :key="contact.id">
              <td>{{contact.id}}</td>
              <td>{{contact.name}}</td>
              <td>{{contact.username}}</td>
              <td>{{contact.email}}</td>
              <td>{{contact.address.city}}</td>
              <td>{{contact.company.name}}</td>
              <td id="links"> <router-link :to="{name: 'ContactDetails', params: {id: contact.id, contact: contact}}"> Contact details </router-link> </td>
              </tr>
          </tbody>
      </table>
      <div class="contact-table__footer">
      <ul class="pagination">
          <li>&laquo;</li>
          <li
            v-for="page in pages"
            :key="page"
            @click="pageClick(page)"
            :class="{'active': page === pageNumber}"
           >
              {{page}}
          </li>
          <li>&raquo;</li>
      </ul>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactsTable',
  data () {
    return {
      contactsData: [],
      searchContact: '',
      perPage: 10,
      pageNumber: 1
    }
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts'
    }),
    searchHandler () {
      return this.contacts.filter(elem => {
        return elem.name.includes(this.searchContact)
      })
    },
    // pagination
    pages () {
      return Math.ceil(this.contacts.length / 10)
    },
    paginatedContacts () {
      const from = (this.pageNumber - 1) * this.perPage
      const to = from + this.perPage
      return this.contacts.slice(from, to)
    }
  },
  methods: {
    pageClick (page) {
      this.pageNumber = page
    }
  },
  mounted () {
    // get all contacts
    this.$store.dispatch('getAllContacts')
  }
}
</script>

<style>
body{
  background-color: #F7F8FC;
}

.contacts-table{
  border-spacing: 0px;
  width: 100%;
}

.contacts-table > tbody{
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 148%;
  color: #495057;
}

.contacts-table tr:nth-child(even) {
  background-color: #fff;
}

.contacts-table tr:nth-child(odd) {
  background-color: #eee;
}

th, td{
  padding: 10px;
}

.contacts-table tr:hover td{
  background-color:#a2c6f8;
  color: #F1F3F5;
}

.contacts-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.contacts-title__text{
  /* font-family: 'Poppins', sans-serif; */
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 110%;
  color: #244677;
}

.contacts-container{
  margin: 150px 40px;
  background: #ffffff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
}

.contacts-table__head{
  color: #244677;
  text-align: left;
  width: 100%;
  background-color: #fff;
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 120%;
  cursor: pointer;
}

.line{
  background: #ADB5BD;
  padding: 1px;
}

#links{
    text-decoration: none;
}

.search-item{
    position: relative;
}

.search-result{
    max-width: 100%;
    z-index: 10;
    background: #EFF3FA;
    border-radius: 15px;
    min-height: 85px;
    padding: 13px 20px;
    font-weight: 300;
    font-size: 15px;
    line-height: 110%;
    color: #D2D2D2;
    position: absolute;
}

.search-result div{
    margin-bottom: 5px;
    padding: 15px 10px;
    border-top: 1px solid #BFBFBF;
    color: black;
}

.search-result p:hover{
    background-color: #f2f2f2;
}

.search-list{
    text-decoration: none;
    color: black;
    /* border-bottom: 1px solid black; */
    cursor: pointer;
}

.close{
    display: none;
}

.inp-search{
    margin-top: 0;
    width: 160px;
    height: 30px;
    font-weight: 400;
    font-size: 15px;
    border-radius: 15px;
    border: none;
    border: 2px solid #bbbbbb;
}

.pagination {
  display: inline-block;
}

.pagination li {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  list-style-type: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
}

.pagination li.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination li:hover:not(.active) {
    background-color: #ddd;
}
.contact-table__footer{
    display: flex;
    justify-content: center;
}

@media all and (max-width: 900px){
    .contacts-container{
      margin: 150px 0px;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .contacts-title{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }

    .contacts-table__body td{
      font-size: 10px;
    }

    .contacts-table__head{
      text-align: center;
      font-size: 10px;
    }

    .contacts-title__text{
      font-size: 20px;
    }
}
</style>
