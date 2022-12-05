<script lang="ts">
        export let feed:any;
        export let isNew:boolean;

console.log(feed)
</script>

<div class="card" class:newpost={isNew}>
    <div class="card-container">
        <div class="date">{feed.created}</div>
        <h2>{feed.title}</h2>

        {#if isNew}
            <div class="newposttag">[ NEW !]</div>
        {/if}
        <div class="channelcontent-holder">
            <div class="thumb"><img loading="lazy" src="{feed["@expand"]?.channel?.thumb}" alt=""></div>
            <div class="channelcontent">
                {#each feed.content.split("\n") as content}
                    <div>{content}</div>
                {/each}
            </div>
        </div>
    </div>
    <div class="feed-btn-holder">
        <div class="card-container feed-btn-container">
            <div class="feed-btn"><a target="_blank" href="{feed["@expand"]?.channel?.link}">visit 
                <svg fill="var(--button-color)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="15px" height="15px"><path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/></svg>
             </a></div>
            <div class="feed-btn"><a href="#/new?id={feed["@expand"]?.channel?.id}">more</a></div>
        </div>
    </div>
    

</div>



<style>
    h2{
                color:var(--main-font-2);
                word-break: break-all;
            }
            .thumb img{
                max-width: 150px;
                margin-left:20px;
            }
    
            .card{
                background-color:var(--card-bg);
                max-width: 991px;
                margin: auto;
                width: 100%;
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
                word-break: break-word;
                overflow: hidden;
                line-height: 3ch;
                max-height: calc(12 * 3ch);
            }
            @media only screen and (max-width: 991px){
                .channelcontent{
                    margin: 13px 0;
                }
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
                display: flex;
                gap: 4px;
                height: 13px;
                padding: 4px 12px;
            }

            .feed-btn a:hover {
                text-decoration: none;;
            }
            @media only screen and (min-width: 1200px){
            .channelcontent-holder{
                display:grid;
                grid-template-columns:180px auto;
                gap:10px;
                margin-top:30px;
                }

                .channelcontent-holder img{
                max-width:100%;
                margin:auto;
                display: block;
                }
            }
</style>