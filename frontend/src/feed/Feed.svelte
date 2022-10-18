<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { updateCount, currentDomain, showall, client } from "../stores";
    import Feedcard from "./feedcard.svelte";
    import Filter from "../filter.svelte";

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
                        $showall || e["@expand"]?.channel.host === $currentDomain
                );
        }
    }
</script>

{#if !loading}
    <main>
        <h1>Feed</h1>
        <div class="feedoptions">
            <button on:click={readAll}>mark as read</button>
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
    }
    h1 {
        background: var(--header-bg);
        color: var(--header-color);
        padding: 4px;
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
        margin-left: 8px;
        margin-bottom: 20px;
    }
</style>
