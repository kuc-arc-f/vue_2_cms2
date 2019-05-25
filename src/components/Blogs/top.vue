<template>
<div>
    <NavUser />
    <a href="#" class="page-top" style="color: #fff;"><img src="/images/arrow_5.png" /></a>
    <div class="container">
        <div id="div_img_main2"  class="cover" style="" valign="bottom">
            <div id="div_img_layer">
                <h1>△△△ ブログ<br />
                </h1>
            </div>
        </div>
        <div class="row conte" style="margin-top:10px;">
        <div class="col-sm-12">
            <div id="div_news">
                <h2 class="h4_td_title" >新着の投稿</h2>
                <hr class="hr_ex1" />
                <!-- -->
                <div v-for="blog in blogs" v-bind:key="blog.id">
                    <div class="div_news_rows" style="width:100%;">
                        <span class="glyphicon glyphicon-circle-arrow-right" style="font-size: 28px; float :left;">
                        </span>
                        <h3 class="">&nbsp;
                            <router-link :to="'/show/' + blog.id">{{ blog.title }}</router-link>
                        </h3>
                        <div style="width:100%;">
                            <ul class="ul_time_box">
                                <li class="li_time_box">
                                    <span class="glyphicon glyphicon glyphicon-time"
                                    style="font-size: 16px; float :left;">
                                    </span>
                                </li>
                                <li class="li_time_box">
                                    <p class="p_time_box">{{ blog.up_date }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr class="hr_ex1" />
                </div>

            </div>
        </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import firebase from 'firebase'
import {Mixin} from '../../mixin'
import NavUser from '../../components/Layouts/NavUser'
import Footer from '../../components/Layouts/Footer'


export default {
  mixins:[Mixin],
  components: { NavUser ,Footer },
  created () {
    this.database = firebase.firestore()
    this.getTasks()
  },
  data () {
    return {
      blogs: [],
      user_id : '',
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
div#div_img_main2 {
    height: 300px;
    color: #FFF;
    margin: 0 0 0px;
    width: 100%;
    background:#ddd url(/images/bill-2.jpg ) no-repeat center center;
    background-size: cover;
    text-align: center;
}
</style>
