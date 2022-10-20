<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { updateCount, currentDomain, showall, client } from "../stores";
    import Feedcard from "./feedcard.svelte";
    import Filter from "../filter.svelte";

    if(!window.localStorage.getItem('pocketbase_auth')){
		push("/");
	}

    let localToken = window.localStorage.getItem('pocketbase_auth') ? JSON.parse(window.localStorage.getItem('pocketbase_auth')) : false
    
    let result = ``
    const notification = (text)=>{
        result = text;
        setTimeout(()=>{result = ``},3000)
    }

    const isnew: (news: any[], feedid: string) => boolean = (
        news,
        feedid
    ) => {
        console.log("%c ====","color:red")
        console.log(news,feedid)
        const arr = news.find((x) => x.feeds === feedid);
        return arr != undefined;
    };

    let feeds: any[] = [];
    let filteredfeeds: any[] = feeds;
    let news: any[] = [];
    let allRead: boolean = false;
    let loading: boolean = true;

    const readAll = async () => {
        try {
            const deleteAllnews = await Promise.all(
                news.map(async (item) => {
                    client.records.delete("news", item.id);
                })
            );
            console.log(deleteAllnews);
            updateCount.update((n) => 0);
            allRead = true;
            notification("nothing new")
        } catch (error) {
            console.error(error);
        }
    };

    const getRsslink = async () => {
        try {
			const rssLink = await(await (await fetch(`IBHUB/api/getrsslink/${localToken.model.id}`)).json())
            if(!rssLink.error){
                console.log(rssLink.rss)
                await navigator.clipboard.writeText(rssLink.rss);
                notification("rss link copied to clipboard")
            }else{
                throw rssLink.error
            }
        } catch (error) {
            console.error(error);
        }
    };


    onMount(async () => {
        try {
            feeds = await client.records.getFullList("feeditem", 50, {
                expand: "channel",
                sort: '-created'
            });
            news = await client.records.getFullList("news");
            console.log(feeds, news);
            loading = false;
        } catch (error) {
            console.warn("connection error", error);
            push("/error");
        }
    });

    $: {
        console.log(feeds)
        if (feeds.length > 0) {
            filteredfeeds = [...feeds]
                .filter(
                    (e) =>
                        $showall || e["@expand"]?.channel?.host === $currentDomain
                );
        }
    }
</script>

{#if !loading}
    <main>
        <h1>Feed</h1>
        <div class="feedoptions">
            <button on:click={readAll}>mark as read</button>
            <button on:click={getRsslink}>get RSS</button>
            <span class="result">{result}</span>
        </div>
        <div class="container">
            <Filter />
            <div class="feeds">
                {#each filteredfeeds as feed, i}
                    <Feedcard {feed} isNew={isnew(news, feed.id) && !allRead} />
                {/each}
            </div>
        </div>
    </main>
{/if}

<style>
    .container {
        display: grid;
        grid-template-columns: 134px 1fr;
        gap: 20px;
        max-width: 100%;
    }

    @media only screen and (max-width: 991px) {
        .container {
            gap: 10px;
        }
    }
    main {
        background: var(--container-bg);
        color: var(--main-font-1);
        max-width: 1300px;
        margin: auto;
        max-width: var(--container);
        width: 100%;
        padding-bottom: 40px;
    }
    h1 {
        background: var(--header-bg);
        color: var(--header-color);
        padding: 4px;
        margin: 0;
        margin-top:17px;
    }

    .feeds {
        display: flex;
        gap: 3px;
        flex-direction: column;
        max-width: 100%;
    }

    button {
        background: var(--button-bg);
        color: var(--button-color);
        padding: 5px;
        font-weight: 700;
        font-size: 12px;
        border-radius: 8px;
        border: 0px;
        min-width: 100px;
        margin: 0;
        cursor: pointer;
    }

    .feedoptions {
        margin: 17px 10px;
        display: flex;
        gap: 11px;
    }

    .result{
                font-size:10px;
                opacity: 0.7;
                display: flex;
                margin-left: 20px;
                align-items: center;
            }
</style>
