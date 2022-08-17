<script lang="ts">

    import { onMount } from "svelte";
    import { updateCount } from './stores';
    import externalLink from './assets/external.svg'

    
    
        let channels:channel[] = []
        let news:newsfeed[] = []
        let hosts:hosts = []
        let loading = true
        let showall = true
        let currentfilter = ""
        let showdead = true;

        onMount(async () => {
            news = await (await (fetch(`/api/getnews`))).json()
            channels  = await (await (fetch(`/api/channels`))).json()
            hosts =  await (await (fetch(`/api/channelhosts`))).json()
            loading = false
            console.log(channels)
        
        });

	const responseOptions:RequestInit = {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		};

        let buttonLoading = false
        let result = ""
        const updateCurrent = async () => {
            try {
            buttonLoading = true
            result = `updating${showall ? "" : ` ${currentfilter}`}...`

            const ids:ids = filteredChannel.map(e => e.id)

            const response = await fetch('/api/getnewupsates', {
            ...responseOptions,
            body: JSON.stringify(ids)
            });

            const data = await response.json()
            console.log(data)

            news  = await (await (fetch(`/api/getnews`))).json();
            updateCount.update(n => news.length)
            buttonLoading = false
            result = "updated!"
            setTimeout(()=>{result = ""},1500)

            } catch (error) {
            console.warn(error)
            buttonLoading = false
            result = "error while updating"

            }
        }

let filteredChannel = channels


$:{
    filteredChannel = [...channels].reverse().filter(e => (showall ? true : e.host === currentfilter)).filter(e => showdead ? true : (e.dead === false))
}

</script>
        
        <main>

            {#if !loading}

            <h1>Active Channels</h1>

            <button class:loading={buttonLoading} class="updateall" on:click={updateCurrent}>
                {#if showall}
                    update all
                {:else}
                    update domain
                {/if}
            </button>
            <span class="result">{result}</span>
<div class="main-container">
    <div class="filter">
        <button class="showdead" class:active={showdead} on:click={()=>showdead = !showdead}>show inactive</button>
        <button class:active={showall} on:click={()=>showall = true}>all domains</button>
        {#each hosts as host}
        <button class:active={showall === false && currentfilter === host} on:click={()=>{currentfilter = host;showall=false}}>{host}</button>
        {/each}
    </div>
    <div class="container">
        {#each filteredChannel as channel}
            <div class:newpost={news.find(x => x.channelid === channel.id)} class="card">
                <div class="card-container">
                    <div class="thumb">
                        <div class="tooltip">
                            {channel.laspost}
                        </div>
                        <a href="#/new?id={channel.id}">
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
                    <div class="feed-btn"><a target="_blank" href="{channel.link}">visit <img src={externalLink} alt=""> </a></div>
                    <div class="feed-btn"><a href="#/new?id={channel.id}">more</a></div>
                </div>
            </div>
        {/each}
        </div>
</div>
    {/if}
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
                margin-bottom: 9px;
            }
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
            .container{
                display: flex;
                gap:20px;
                flex-wrap: wrap;
                flex-direction: row;
                max-width: 1370px;
                margin: auto;
                width: calc(100% - 20px);
                padding-bottom: 30px;
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
            }

            .hostName {
				font-size:10px;
				opacity:0.6;
				margin-bottom:1em;
			}

            .updates{
                font-size:11px
            }

            .filter{
                display:flex;
                flex-direction: column;
                width: 100%;
            }
            .main-container {
            display: grid;
            grid-template-columns: 134px auto;
            gap: 20px;
            }

            .filter button {
                font-size: 10px;
                opacity: 0.75;
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

            button.updateall {
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
            margin-bottom: 11px;
            margin-left: 10px;
            }

            .updateall.loading{
                opacity:0.8;
                pointer-events: none;
            }
            .result{
                font-size:11px;
                opacity: 0.7;
                display: inline-block;
                margin-left: 20px;
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
                .filter button{
                    min-height: 40px;
                }

                .thumb a {
                    pointer-events: none;
                }
            }

        </style>