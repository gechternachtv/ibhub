<script>

    import { onMount } from "svelte";
    
    
        let channels = []
        let loading = true
    
        onMount(async () => {
            channels  = await (await (fetch(`http://localhost:4000/channels`))).json()
            loading = false
            console.log(channels)
        
        });
    
    
    
    </script>
        
        <main>
            <h1>Active Channels</h1>
            <div class="container">
            {#each channels.filter(channel => channel.dead === false) as channel}
                <div class="card">

                    <div class="thumb">
                        <a href="{channel.link}">
                            <img loading=lazy src="{channel.thumb}" alt="">
                        </a>
                    </div>
                    <div>{channel.name}</div>
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
                background:#e04000;
                color:#ffffee;
                padding:4px;
            }
            .thumb img{
                max-width: 80px;
            }
    
            .card{
                background-color:#f0e0d6;
                padding:13px;
            }
            .container{
                display: grid;
                gap:20px;
                grid-template-columns:1fr 1fr 1fr
            }
        </style>