<script>
	import Router from 'svelte-spa-router';
	import Channels from './Channels.svelte';
	import Feed from './Feed.svelte';
	import New from './New.svelte';
	import Updateall from './Updateall.svelte';
	import { updateCount } from './stores.js';

	(async ()=>{
		const news  = await (await (fetch(`/getnews`))).json();
		updateCount.update(n => news.length)
	})()

</script>

<nav>
	<a  href="/#/">Channels</a>
	<a href="/#/feed">Feed 
		{#if $updateCount > 0}
			<strong>({$updateCount})</strong>
		{/if}
	</a>
	<a href="/#/new">Add</a>
	<a  href="/#/updateall">GET!</a>
</nav>

<Router routes={{
	'/': Channels,
	'/feed': Feed,
	'/new': New,
	'/updateall': Updateall
}} />

<hr>


<style>
	nav{
		background:#e04001;
        padding:4px;
	}
	nav a {
		color:white;
		text-decoration: none;
		padding-right: 20px;
	}
</style>