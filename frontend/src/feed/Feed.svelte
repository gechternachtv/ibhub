<script lang="ts">

    import { onMount } from "svelte";
    import {push} from "svelte-spa-router"
    import { updateCount, isnew, currentDomain, showall, showdead } from '../stores';
    import Feedcard from "./feedcard.svelte"
    import Filter from '../filter.svelte';


    
    
        let feeds:feed[] = []
        let filteredfeeds:feed[] = feeds;
        let news:newsfeed[] = []
        let allRead:boolean = false
        let loading:boolean = true

        const readAll = async ()=>{
            const readalldata = await (await (fetch(`/api/readallnews`))).json()
            console.log(readalldata)
            updateCount.update(n => 0)
            allRead = true
        }

        onMount(async () => {
            try {
                feeds  = await (await (fetch(`/api/feed`))).json()
                news = await (await (fetch(`/api/getnews`))).json()
                console.log(feeds,news)
                loading = false
            } catch (error) {
                console.warn("connection error",error)
                push("/error")

            }
        });
    
    
    $:{
        filteredfeeds = [...feeds].reverse().filter(e => ($showall || e.host === $currentDomain))
    }




    </script>
        
            {#if !loading}
            <main>

            <h1>Feed</h1>
            <div class="feedoptions">
                <button on:click={readAll}>mark as read</button>
            </div>
            <div class="container">
                <Filter/>
                <div class="feeds">
                    {#each filteredfeeds as feed, i}
                        <Feedcard feed={feed} isNew={isnew(news,feed.channelid) && !allRead}/>
                    {/each}
                </div>
            </div>
        </main>
            {/if}
        
        <style>
            .container{
                display: grid;
                grid-template-columns: 134px 1fr;
                gap: 20px;
                max-width: 100%;
            }

            @media only screen and (max-width: 991px){
                .container{
                    gap: 10px
                }
            }
            main{
                background:var(--container-bg);
                color:var(--main-font-1);
                max-width: 1300px;
                margin: auto;
                max-width: var(--container);
                width:100%;
            }
            h1{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
            }
            
            .feeds{
                display: flex;
                gap:3px;
                flex-direction:column;
                max-width:100%
            }


            button {
            background: var(--button-bg);
            color: var(--button-color);
            padding: 5px;
            font-weight: 700;
            font-size: 12px;
            border-radius: 8px;
            border:0px;
            min-width: 100px;
            margin: 0;
            cursor: pointer;
            }

            .feedoptions{
                margin-left: 8px;
                margin-bottom: 20px;
            }
        </style>