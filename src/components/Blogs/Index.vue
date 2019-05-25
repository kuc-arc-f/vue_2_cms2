<template>
    <div>
        <navbar />
        <div class="container">
            <flash-message></flash-message>

            <!-- -->
            <h1>Blogs - Index:</h1>
            <hr />
            <router-link :to="'/blogs/new/'" class="btn btn-primary"> add </router-link><br />
            <br />
            <table class="table">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">date</th>
                <th scope="col">action</th>
            </tr>
            </thead>
            <tbody v-for="blog in blogs" v-bind:key="blog.id">
            <tr>
                <td>{{ blog.id }}</td>
                <td>
                    <h3>
                    <router-link :to="'/show/' + blog.id" target="_blank">{{ blog.title }}</router-link>
                    </h3>
                </td>
                <td>{{ blog.up_date }}</td>
                <td>&nbsp;<router-link :to="'/blogs/edit/' + blog.id" class="btn btn-default"> edit </router-link>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {Mixin} from '../../mixin'
import flashMessage from '../../components/Layouts/FlashMessage'
import navbar from '../../components/Layouts/Navbar'
// Footer

export default {
  mixins:[Mixin],
  components: { flashMessage , navbar},
  created () {
    this.database = firebase.firestore()
    this.baseUrl = this.sysConst.API_BASE;
    this.site_name = this.sysConst.SITE_NAME;
//    console.log( this.baseUrl )
    this.getTasks()
  },
  data () {
    return {
      blogs: [],
      user_id : '',
      baseUrl : '',
      site_name : ''
    }
  },
  methods: {
    getTasks() {
        var items = []
        var self = this
        var dbRef = this.database.collection('blogs')
        dbRef = dbRef.orderBy("up_date", "desc")
        dbRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.id, " => ", doc.data())
                var item = doc.data()
                var dt = item.up_date.toDate()
                var dt_str = dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
                console.log( dt_str )
                items.push({
                    id : doc.id,
                    title : item.title,
                    content : item.content,
                    up_date : dt_str
                })            
            })
            self.blogs = items
        })        
    },
  }
}
</script>
<!-- -->
<style>

</style>
