<script lang="ts">

    import { onMount } from "svelte";
    import {push} from 'svelte-spa-router'
    import { updateCount, currentDomain, showall, showdead, pb,hosts } from '../stores';

    import Channelcard from './channelcard.svelte';
    import Filter from '../filter.svelte';

    if(!window.localStorage.getItem('pocketbase_auth')){
		push("/");
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
                channels  = await pb.collection("channel").getFullList()
                news = await pb.collection("news").getFullList()
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
        const notification = (text)=>{
        result = text;
            setTimeout(()=>{result = ``},3000)
        }

        const updateCurrent = async () => {
            try {
            buttonLoading = true
            result = `updating${$showall ? "" : ` ${$currentDomain}`}...`

            const ids = filteredChannel.map(e => e.id)
                console.log("ids",ids)
            const localUser = JSON.parse(window.localStorage.getItem("pocketbase_auth"))?.model?.id
                console.log("localuser:",localUser)

                console.log("update current", {
                user:localUser,
                host: `${$showall ? "" : `${$currentDomain}`}`
            })


            const response =await fetch(`IBHUB/api/getnewsupdates`,{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                user:localUser,
                host: `${$showall ? "" : `${$currentDomain}`}`
            })
        })
            const data = await response.text()
            console.log(data)

            channels  = await pb.collection("channel").getFullList()
            news  = await pb.collection("news").getFullList();
            updateCount.update(n => news.length)
            buttonLoading = false
            notification(`updated! ${$updateCount > 0 ? `${$updateCount} new update${$updateCount === 1 ? "" : "s"}` : `nothing new right now`}`)
        

            } catch (error) {
            console.warn(error)
            buttonLoading = false
            notification("error while updating")

            }
        }

let filteredChannel = channels



$:{
    filteredChannel = [...channels].reverse().filter(e => ($showall ? true : e.host === $currentDomain)).filter(e => $showdead ? true : (e.dead === false))
}

</script>
        
       
            {#if !loading}
            <main>
            <div class="container-header"><h1>Dashboard</h1></div>
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
                padding-bottom: 40px;
            }
            .container-header{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
                margin-top:17px;
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
            @media only screen and (max-width: 568px){
                .main-container {
                gap:0px;
                grid-template-columns:114px 1fr;
                }
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
                margin: 17px 10px;

            }
            @media only screen and (max-width: 568px){
                .container-header-buttons button {
                    min-height: 43px
                }
            }
        </style>