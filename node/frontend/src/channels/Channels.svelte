<script lang="ts">

    import { onMount } from "svelte";
    import {push} from 'svelte-spa-router'
    import { updateCount, currentDomain, showall, showdead, client,hosts } from '../stores';

    import Channelcard from './channelcard.svelte';
    import Filter from '../filter.svelte';

    if(!window.localStorage.getItem('pocketbase_auth')){
		push("/login");
	}

    const isnew:(news:any[],channelid:string)=>boolean = (news,channelid)=>{
    const arr = news.find(x => x.channel === channelid)
    return arr != undefined
    }

        let channels:any[] = []
        let news:any[] = []
        let loading = true
        

        onMount(async () => {
            try {
                console.log("%c ====","color:yellow")
                channels  = await client.records.getFullList('channel')
                news = await client.records.getFullList('news')
                console.log(news)
                loading = false
                $hosts = Array.from(new Set(channels.map(e => e.host)))
            } catch (error) {
                console.warn("connection error!",error)
                push("/error")
            }
        
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
            result = `updating${$showall ? "" : ` ${$currentDomain}`}...`

            const ids:ids = filteredChannel.map(e => e.id)
                console.log("ids",ids)
            const localUser = JSON.parse(window.localStorage.getItem("pocketbase_auth"))?.model?.id
                console.log("localuser:",localUser)
            const response =await fetch("https://ibhub.fly.dev/api/getnewupsates",{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({user:localUser})
        })
            const data = await response.text()
            console.log(data)

            channels  = await client.records.getFullList('channel')
            news  = await client.records.getFullList('news');
            updateCount.update(n => news.length)
            buttonLoading = false
            result = `updated! ${$updateCount > 0 ? `${$updateCount} new update${$updateCount === 1 ? "" : "s"}` : `nothing new right now`}`
            
            setTimeout(()=>{result = ""},2200)

            } catch (error) {
            console.warn(error)
            buttonLoading = false
            result = "error while updating"

            }
        }

let filteredChannel = channels



$:{
    filteredChannel = [...channels].reverse().filter(e => ($showall ? true : e.host === $currentDomain)).filter(e => $showdead ? true : (e.dead === false))
}

</script>
        
       
            {#if !loading}
            <main>
            <div class="container-header"><h1>Active Channels</h1></div>
            <div class="container-header-buttons">
                <button class:loading={buttonLoading} class="updateall" on:click={()=>push("/new")}>New!</button>
                <button class:loading={buttonLoading} class="updateall" on:click={updateCurrent}>
                    {#if $showall}
                        update all
                    {:else}
                        update domain
                    {/if}
                </button>
                <span class="result">{result}</span>
            </div>
<div class="main-container">
    <Filter />
    <div class="container">
        {#each filteredChannel as channel}
            <Channelcard channel={channel} isNew={isnew(news,channel.id)}/>
        {/each}
        </div>
</div>
</main>
    {/if}
        
        <style>
            main{
                background:var(--container-bg);
                color:var(--main-font-1);
                margin:auto;
                max-width: var(--container);
                width:100%;
            }
            .container-header{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
                margin:15px 0;
                display: grid;
                grid-template-columns: 1fr auto;
            }
            .container-header h1{
                margin: 0;
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
            @media only screen and (max-width: 991px){
                .container{
                    gap: 10px
                }
            }
            .main-container {
            display: grid;
            grid-template-columns: 134px 1fr;
            gap: 20px;
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
            }

            .updateall.loading{
                opacity:0.8;
                pointer-events: none;
            }
            .result{
                font-size:10px;
                opacity: 0.7;
                display: flex;
                margin-left: 20px;
                align-items: center;
            }

        
            .container-header-buttons{

                display: flex;
                align-content: center;
                gap: 11px;
                margin: 17px 0px;
                padding-left: 8px;

            }

        </style>