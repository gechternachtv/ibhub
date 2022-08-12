<script>

    import { onMount } from "svelte";
    import { updateCount } from './stores.js';
    
    
        let channels = []
        let loading = true
        let news = []
    
        onMount(async () => {
            channels  = await (await (fetch(`/feed`))).json()
            loading = false
            console.log(channels)
            news = await (await (fetch(`/getnews`))).json()
            window.channels = channels;
            window.news = news;

            updateCount.update(n => 0)
            fetch(`/readallnews`)

        });
    
    
    
    </script>
        
        <main>
            <h1>Feed</h1>
            <div class="container">
            {#each [...channels].reverse() as channel, i}
                <div class="card">

                    {#if news.find(x => x === channel.postid)}
                         <div class="newpost">[ NEW !]</div>
                    {/if}
                    <div class="thumb"><img loading="lazy" src="{channel.image}" alt=""></div>
                    <h2>{channel.title}</h2>
                    <div>{channel.content}</div>
                    <div><a href="{channel.link}">{channel.link}</a></div><!-- content here -->

                </div>
            {/each}
            </div>
        </main>
        
        <style>
            main{
                background:#ffffee;
                color:#800000;
            }
            h1{
                background:#e04001;
                color:#ffffee;
                padding:4px;
            }
            .thumb img{
                max-width: 150px;
            }
    
            .card{
                background-color:#f0e0d6;
                padding:13px;
            }
            .container{
                display: flex;
                gap:20px;
                flex-direction:column
            }
        </style>