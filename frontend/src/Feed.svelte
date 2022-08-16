<script lang="ts">

    import { onMount } from "svelte";
    import { updateCount } from './stores';


    
    
        let feeds:feed[] = []
        let news:newsfeed[] = []
        let hasNews = true

        const readAll = async ()=>{
            const readalldata = await (await (fetch(`/api/readallnews`))).json()
            console.log(readalldata)
            updateCount.update(n => 0)
            hasNews = false
        }

        onMount(async () => {
            feeds  = await (await (fetch(`/api/feed`))).json()
            news = await (await (fetch(`/api/getnews`))).json()
            console.log(feeds,news)
        });
    
    
    
    </script>
        
        <main>


            <h1>Feed</h1>
            <div class="feedoptions">
                <button on:click={readAll}>mark as read</button>
            </div>

            <div class="container">
            {#each [...feeds].reverse() as feed, i}
                <div class="card" class:newpost={news.find(x => x.postid === feed.postid) && hasNews}>
                    <div class="card-container">
                        <div class="date">{feed.date}</div>
                        <h2>{feed.title}</h2>

                        {#if news.find(x => x.postid === feed.postid) && hasNews}
                            <div class="newposttag">[ NEW !]</div>
                        {/if}
                        <div class="thumb"><img loading="lazy" src="{feed.image}" alt=""></div>
                        <div class="channelcontent">{feed.content}</div>
                    </div>
                    <div class="feed-btn-holder">
                        <div class="card-container feed-btn-container">
                            <div class="feed-btn"><a target="_blank" href="{feed.link}">open link</a></div>
                            <div class="feed-btn"><a href="#/new?id={feed.channelid}">view channel</a></div>
                        </div>
                    </div>
                    

                </div>
            {/each}
            </div>
        </main>
        
        <style>
            main{
                background:var(--container-bg);
                color:var(--main-font-1);
                max-width: 1300px;
                margin: auto;
                max-width: var(--container);
            }
            h1{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
            }
            h2{
                color:var(--main-font-2)
            }
            .thumb img{
                max-width: 150px;
                margin-left:20px;
            }
    
            .card{
                background-color:var(--card-bg);
                max-width: 991px;
                margin: auto;
                width: calc(100% - 30px);
                box-sizing: border-box;
                position: relative;
            }

            .card-container{
                padding:13px 13px;
                position: relative;
            }

            .card.newpost{
                border-left: 4px solid var(--news);
            }
            .container{
                display: flex;
                gap:3px;
                flex-direction:column
            }

            .newposttag{
                position: absolute;
                top: 6px;
                color: var(--news);
                opacity: 0.6;
                font-size: 12px;
                font-weight: bold;
            }

            .channelcontent{
                font-size: 12px;
                margin: 20px 0;
                margin-left:20px;
            }

            .date {
                font-size: 11px;
                position: absolute;
                right: 20px;
            }

            .feed-btn-holder{
                border-top: 2px solid #8408081f;
            }

            .feed-btn-container{
                display: flex;
                gap: 10px;
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
                text-decoration: none;;
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
                margin-left: 20px;
                margin-bottom: 20px;
            }
        </style>