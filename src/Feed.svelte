<script>

    import { onMount } from "svelte";
    
    
        let channels = []
        let loading = true
    
        onMount(async () => {
            channels  = await (await (fetch(`http://localhost:4000/feed`))).json()
            loading = false
            console.log(channels)
        
        });
    
    
    
    </script>
        
        <main>
            <h1>Feed</h1>
            <div class="container">
            {#each channels as channel}
                <div class="card">
                  
                    <div class="thumb"><img src="{channel.image}" alt=""></div>
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
                background:#e04000;
                color:#ffffee
            }
            .thumb img{
                max-width: 150px;
            }
    
            .card{
                background-color:#f0e0d6;
                padding:13px;
            }
            .container{
                display: grid;
                gap:20px;
                grid-template-columns:1fr
            }
        </style>