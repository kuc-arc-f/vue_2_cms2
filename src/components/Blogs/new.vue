<template lang="html">
    <div>
    <navbar />
    <div class="container">
        <h1>Blogs - new</h1>
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <input type="text" class="form-control" id="title" v-model="title">
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
        </div>
        <button v-on:click="createTask()" class="btn btn-primary">投稿</button>    
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {Mixin} from '../../mixin'
import navbar from '../../components/Layouts/Navbar'

export default {
    mixins:[Mixin],
    components: {  navbar},
    created() {
        this.database = firebase.firestore()
        this.baseUrl = this.sysConst.API_BASE;
        console.log(this.baseUrl);
    },
    data() {
        return {
            title:'',
            content:'',
            user_id: '',
            baseUrl : '',
        }
    },
    methods: {
        createTask: function() {
            console.log('#create')
            var self = this
            this.database.collection("blogs").add({
                title: this.title,
                content: this.content,
                uid : 0,
                up_date: new Date()
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
                self.$router.push('/blogs')
            }).catch(function(error) {
                console.log("Error adding document: ", error)
            })
        },
    }
}
</script>
