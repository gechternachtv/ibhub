<script>

    import { onMount } from "svelte";
    
    
        let channels = []
        let loading = true
    
        onMount(async () => {
            channels  = await (await (fetch(`/channels`))).json()
            loading = false
            console.log(channels)
        
        });
    
    
    
    </script>
        
        <main>
            <h1>Active Channels</h1>
            <div class="container">
            {#each [...channels].reverse() as channel}
                <div class="card">

                    <div class="thumb">
                        <a href="{channel.link}" target="_blank">
                            <img loading=lazy src="{channel.thumb}" alt="">
                        </a>
                    </div>
                    <div>{channel.name}</div>
                    {#if channel.dead }
                        <div class="dead">[Dead]</div>
                    {/if}
                    {#if channel.contains != "" }
                        <div>[contains:]{channel.contains}</div>
                    {/if}
                    <div>posts:{channel.updates}</div>
                    <div><a href="{channel.link}" target="_blank">{channel.link}</a></div><!-- content here -->
                    <div><a href="/#/new?id={channel.id}&name={channel.name}&contains={channel.contains}&observeName={channel.observeName}&link={channel.link}&thumb={channel.thumb}&dead={channel.dead}">update</a></div>
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
                max-width: 180px;
            }
    
            .card{
                background-color:#f0e0d6;
                padding:13px;
                width:calc(100% - 20px);
                max-width: 300px;
            }
            .container{
                display: flex;
                gap:20px;
                flex-wrap: wrap;
                flex-direction: row;
                max-width: 1370px;
                margin: auto;
                width: calc(100% - 20px);
            }
            .dead{
                color: #f00;
                font-weight: bold;
                font-size: 19px;
            }
        </style>