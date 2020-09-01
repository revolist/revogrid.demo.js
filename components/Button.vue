<template>
    <div class="panel-button">My button</div>
</template>

<script>
    export default {
        name: 'Button'
    }
</script>

<style scoped lang="scss">
    .panel-button {
        content: '';
        -webkit-box-shadow: 0 0.25rem 0.125rem 0 rgba(0,0,0,0.05);
        box-shadow: 0 0.25rem 0.125rem 0 rgba(0,0,0,0.05);
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        -webkit-transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
</style>