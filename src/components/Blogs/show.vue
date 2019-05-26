<template>
<div>
    <NavUser />
    <div class="container">
        <!-- -->
        <br />
        <div class="div_news_rows" style="width:100%;">
            <ul class="ul_time_box">
                <li class="li_time_box">
                    <span class="glyphicon glyphicon-home"
                        style="font-size: 16px; float :left;">
                    </span>
                </li>
                <li class="li_time_box">
                    <p class="p_time_box">ホーム > </p>
                </li>
                <li class="li_time_box">
                    <span class="glyphicon glyphicon-folder-close"
                        style="font-size: 16px; float :left;">
                    </span>
                </li>
                <!--
                <li class="li_time_box">
                    <p class="p_time_box">
                    </p>
                </li>		
                -->
                <li class="li_time_box"><p class="p_time_box"> > {{ item.title }} </p></li>
            </ul>
            <h1 class="" style="font-size: 42px;">&nbsp;{{ item.title }}
            </h1>
            <div style="width:100%;">
                <ul class="ul_time_box">
                    <li class="li_time_box">
                        <span class="glyphicon glyphicon glyphicon-time"
                            style="font-size: 16px; float :left;">
                        </span>
                    </li>
                    <li class="li_time_box">
                    <p class="p_time_box">
                        <time datetime="2018-07-08T00:07:05.000Z"
                            itemprop="datePublished">{{ item.date_str }}</time>
                    </p>
                    </li>
                </ul>
            </div>
            <hr />
            <div class="entry-content">
                <div id="post_item" v-html="item.content"></div>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import firebase from 'firebase'
import marked from  'marked'
import {Mixin} from '../../mixin'
import NavUser from '../../components/Layouts/NavUser'
import Footer from '../../components/Layouts/Footer'

export default {
    mixins:[Mixin],
    components: { NavUser, Footer },
    created() {
        this.database = firebase.firestore()
        this.TBL_BLOGS = this.sysConst.TBL_BLOGS;
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            baseUrl : '',
            TBL_BLOGS : '',
        }
    },
    mounted: function() {
        this.getItem()
    },
    methods: {
        getItem: function() {
            var docRef = this.database.collection(this.TBL_BLOGS).doc( this.$route.params.id )
            var self = this
            docRef.get().then(function(doc) {
                var dat = doc.data()
                var dt = dat.up_date.toDate()
                var dt_str = dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
                console.log( dt_str )
                dat.date_str = dt_str
                dat.content = marked(dat.content)
                self.item =  dat
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })            
        },
    }
}
</script>
<!-- -->
<style>
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>


