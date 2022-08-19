<script lang="ts">
    import { currentDomain, showall,showdead } from './stores';
    import { onMount } from "svelte";
    let hosts:hosts = []

    onMount(async () => {
            try {
                hosts =  await (await (fetch(`/api/activehosts`))).json()
            } catch (error) {
                console.warn("connection error",error)
                //pushto error page               
            }
        });

</script>

<div class="filter">
    <button class="showdead" class:active={$showdead} on:click={()=>showdead.update(m => !$showdead)}>show inactive</button>
    <button class:active={$showall} on:click={()=>showall.update(n=>true)}>all domains</button>
    {#each hosts as host}
    <button class:active={$showall === false && $currentDomain === host} on:click={()=>{currentDomain.update(n => host);showall.update(n=>false)}}>{host}</button>
    {/each}
</div>

<style>
    .filter{
                display:flex;
                flex-direction: column;
                width: 100%;
            }

            .filter button {
                font-size: 10px;
                opacity: 0.5;
                margin-bottom: 0px;
                border: 0px;
                cursor: pointer;
                background: transparent;
                text-align: left;
                color: var(--button-bg);
                border-radius: 0;
                transition:all .2s;
            }

            .filter button.active {
                opacity:1;
                background: var(--card-bg);
            }

            .filter button.showdead{
                margin-bottom:8px
            }

            @media only screen and (max-width: 991px){
                .filter button{
                    min-height: 40px;
                }

            }
</style>