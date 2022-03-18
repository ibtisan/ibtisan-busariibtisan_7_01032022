<script>
import Card from "../../components/ui/Card/Card.vue"
import PostForm from "./PostForm.vue"

export default {
    name: "WallPage",
    components: {
        Card,
        PostForm
    },
    data() {
        if (localStorage.getItem('token') == null) {
            this.$router.push('/login');
        }
    }
}
</script>

<template>
<div class="container-sm">
   <PostForm></PostForm>
    <Card></Card>
</div>
</template>

<style module>


</style>