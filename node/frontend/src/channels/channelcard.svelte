<script lang="ts">
    	export let channel;
        export let isNew:boolean;
</script>



<div class:newpost={isNew} class="card">
    <div class="card-container">
        <div class="thumb">
            <div class="tooltip">
                {#each channel.laspost.split("\n") as content}
                <div>{content}</div>
                {/each}
            </div>
            <a href="#/new?id={channel.id}">
                <img loading=lazy src="{channel.thumb}" alt="">
            </a>
        </div>
        <div class="title">{channel.name}</div>
        <div class="hostName">{channel.host}</div>
        {#if isNew}
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
        <div class="feed-btn"><a target="_blank" href="{channel.link}">visit 
            <svg fill="var(--button-color)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="15px" height="15px"><path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/></svg>
        </a></div>
        <div class="feed-btn"><a href="#/new?id={channel.id}">more</a></div>
    </div>
</div>


<style>
     .thumb img{
                width: auto;
                max-width: min(100%, 180px);
            }
    
            .card{
                background-color:var(--card-bg);
                padding:13px;
                width:calc(100% - 20px);
                max-width: 265px;;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 20px;
                box-sizing: border-box;
                position:relative
            }
            @media only screen and (max-width: 568px){
                .card{
                    width:100%;
                }
            }

            .dead{
                color: var(--alert);;
                font-weight: bold;
                font-size: 19px;
            }

            .feed-btn a{
                background: var(--button-bg);
                color: var(--button-color);
                padding: 5px;
                font-weight: bold;
                font-size: 11px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .feed-btn a:hover {
                text-decoration: none;
            }

            .feed-btn-container{
                display: flex;
                gap: 10px;
                align-items: center;
                flex-wrap: wrap;
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
            margin-bottom: 4px;
            
            }

            .hostName {
				font-size:10px;
				opacity:0.6;
				margin-bottom:1em;
			}

            .updates{
                font-size:11px
            }

            .tooltip {
            font-size: 10px;
            background: var(--button-color);
            color: var(--button-bg);
            padding: 14px;
            position: absolute;
            left: 0;
            top: 0;
            border: 1px solid;
            opacity:0;
            transition:all .3s;
            max-width: 100%;
            word-break: break-word;
            pointer-events: none;
            max-height: 180px;
            overflow: hidden;
            }

            .thumb:hover .tooltip{
                opacity:1;
            }


            @media only screen and (max-width: 991px){
            .thumb a {
                    pointer-events: none;
                }
            }

</style>