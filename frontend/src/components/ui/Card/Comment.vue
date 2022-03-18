<script>
import Avatar from "../Avatar.vue"
export default {
    name: "Comment",
    components: {
        Avatar
    }
}
</script>

<template>
    <div class="d-flex gap-1">
        <Avatar />
        <div class="d-flex flex-column comment_text p-1">
            <p>Sylvie du marketing</p>
            <p>waooo cest super beau</p>  
        </div>      
    </div>
</template>

<style scoped>


</style>