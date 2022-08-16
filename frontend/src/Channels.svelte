<script lang="ts">

    import { onMount } from "svelte";
    import {push} from 'svelte-spa-router'

    
    
        let channels:channel[] = []
        let news:newsfeed[] = []
        let loading = true
    
        onMount(async () => {
            news = await (await (fetch(`/api/getnews`))).json()
            channels  = await (await (fetch(`/api/channels`))).json()
            loading = false
            console.log(channels)
        
        });
    

    </script>
        
        <main>
            <h1>Active Channels</h1>
            <div class="container">
            {#each [...channels].reverse() as channel}
                <div class:newpost={news.find(x => x.channelid === channel.id)} class="card">
                    <div class="card-container">
                        <div class="thumb">
                            <a href="{channel.link}" target="_blank">
                                <img loading=lazy src="{channel.thumb}" alt="">
                            </a>
                        </div>
                        <div class="title">{channel.name}</div>
                        <div class="hostName">{channel.host}</div>
                        {#if news.find(x => x.channelid === channel.id)}
                            <div class="newposttag">new!</div>
                        {/if}
                        {#if channel.contains.length > 0 }
                        <div class="contains">
                            {#each channel.contains as contain}
                            <span>{contain}</span>
                            {/each}
                        </div>
                        {/if}
                        <div class="updates"><strong>Updates: </strong>{channel.updates}</div>
                    </div>
                    <div class="card-container feed-btn-container">
                        {#if channel.dead }
                            <div class="dead">[Dead]</div>
                        {/if}
                        <div class="feed-btn"><a target="_blank" href="{channel.link}">open link</a></div>
                        <div class="feed-btn"><a href="#/new?id={channel.id}">view channel</a></div>
                    </div>
                </div>
            {/each}
            </div>
        </main>
        
        <style>
            main{
                background:var(--container-bg);
                color:var(--main-font-1);
                margin:auto;
                max-width: var(--container);
            }
            h1{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
            }
            .thumb img{
                max-width: 180px;
            }
    
            .card{
                background-color:var(--card-bg);
                padding:13px;
                width:calc(100% - 20px);
                max-width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 20px;
                box-sizing: border-box;
                position:relative
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
                color: var(--alert);;
                font-weight: bold;
                font-size: 19px;
            }

            .feed-btn a {
                background: var(--button-bg);
                color: var(--button-color);
                padding: 5px;
                font-weight: bold;
                font-size: 11px;
                border-radius: 8px;
            }

            .feed-btn a:hover {
                text-decoration: none;
            }

            .feed-btn-container{
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .card.newpost{
                border-left: 4px solid var(--news);
            }

            .newposttag{
                position: absolute;
                top: 6px;
                color: var(--news);
                opacity: 0.6;
                font-size: 9px;
                font-weight: bold;
                top: 0px;
                left: 6px;
            }

            .title{
                font-weight: bold;
                color:var(--main-font-2);
            }
            .contains {
            font-size: 11px;
            opacity:0.8
            }

            .contains span{
            display: inline-block;
            margin-right: 4px;
            padding:0 4px;
            border-radius:5px;
            font-weight: bold;
            background:var(--header-bg);
            color:var(--header-color);
            }

            .hostName {
				font-size:10px;
				opacity:0.6;
				margin-bottom:1em;
			}

            .updates{
                font-size:11px
            }
        </style>