<template>
  <div class="home">
    <ContactsTable />
  </div>
</template>

<script>
import ContactsTable from '../components/ContactsTable.vue'

export default {
  name: 'Home',
  components: {
    ContactsTable
  }
}
</script>
