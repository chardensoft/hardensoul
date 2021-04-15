<template>
  <div class="photopage">
    <img :src="photo.path" />
    <div class="photoInfo">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
    </div>
    <p class="photoDate">{{formatDate(photo.created)}}</p>
    <div class="comment">
      <!-- Display "Comments" already made here (if comments for the photo exist) -->
     <p>Comments</p>
     <hr>
     <p v-if="commentArray.length === 0" style="text-align: center;">Comments have yet to be posted for this photo.</p>
     <div class="display-comments" v-for="c in commentArray" v-bind:key="c._id">
       <div class="comment-name-date"><p style="font-weight: bold;">{{c.user.firstName}} {{c.user.lastName}}</p><p> commented {{formatDate(c.created)}}</p></div>
       <p class="comment-data">{{c.data}}</p>
       <hr>
     </div>
     <br>
     <!-- Display "Leave a comment"  (if user is logged in) -->
     <div class="leave-comment" v-if="$root.$data.user != null" >
       <p>Leave a Comment</p>
       <textarea v-model="data" cols=72 rows=4 placeholder="Your Comment" ></textarea>
       <button style="display: block" @click="uploadComment">Upload</button>
     </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      photo: null,
      photoUser: null,
      data: "",
      commentArray: [],
      error: '',
    }
  },
  created() {
    this.getPhoto();
    this.getComments();
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data.photo;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async uploadComment() {
      await axios.post('/api/comments/', {
        photo: this.$route.params.id,
        data: this.data,
      });
      this.data = "";
      this.getComments();
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.$route.params.id);
        this.commentArray = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}

</script>

<style scoped>
.comment-data {
  padding-left: 15px;
  color: #898989;
}
.comment-name-date {
  font-size: 1.2rm;
  display: flex;
}
.photo-page {
  width: 65%;
  margin: auto;
  padding-top: 118px;
  padding-bottom: 60px;
}
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}
.photoInfo p {
  margin: 1px;
}
.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}
.photoTitle {
  font-size: 1.2rm;
  font-weight: bold;
  text-decoration: underline;
}
p {
  margin: 3px;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}
.image img {
  width: 100%;
}
</style>
