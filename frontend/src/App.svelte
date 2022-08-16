<script lang="ts">
	import Router from 'svelte-spa-router';
	import Channels from './Channels.svelte';
	import Feed from './Feed.svelte';
	import New from './New.svelte';
	import Updateall from './Updateall.svelte';
	import About from './About.svelte';
	import { updateCount } from './stores';
	import {location} from 'svelte-spa-router'

	(async ()=>{
		const news:string[]  = await (await (fetch(`/api/getnews`))).json();
		updateCount.update(n => news.length)
	})()
let count = ""
$:{
	if($updateCount > 0){
		count = `(${$updateCount})`
	}else{
		count = ""
	}
}

// const configs  = {
// 			"--alert":"#fb0000",
// 			"--news":"#fb0000",
// 			"--header-bg": "red",
// 			"--main-font-1": "#800000",
// 			"--main-font-2": "#800000",
// 			"--button-bg":"#800000",
// 			"--button-color":"#ffffee",
// 			"--header-color":"#ffffee",
// 			"--card-bg": "#f0e0d6",
// 			"--container-bg":"#ffffee",
// 			"--gradient-col-1":"#fed6af",
// 			"--gradient-col-2":"#ffffee"
// 		}
		



// $: cssVarStyles = Object.entries(configs)
// 		.map(([key, value]) => `--${key}:${value}`)
// 		.join(';');

</script>
<svelte:head>
	<title>{count} ibhub</title>
	<style>
		:root {
			--alert:#fb0000;
			--news:#fb0000;
			--header-bg: #e04001;
			--main-font-1: #800000;
			--main-font-2: #800000;
			--button-bg:#800000;
			--button-color:#ffffee;
			--header-color:#ffffee;
			--card-bg: #f0e0d6;
			--container-bg:#ffffee;
			--gradient-col-1:#fed6af;
			--gradient-col-2:#ffffee;
			--container:1300px;
		}
		body {
			background: var(--gradient-col-1);
			background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
			background-repeat: no-repeat;
			background-attachment: fixed;
		}
	</style>
</svelte:head>

<main>

<nav >
	<a  class:active={$location === "/"} href="/#/">Channels</a>
	<a  class:active={$location === "/feed"} href="/#/feed">Feed 
			<strong>{count}</strong>
	</a>
	<a  class:active={$location === "/new"} href="/#/new">Add</a>
	<a   class:active={$location === "/updateall"} href="/#/updateall">GET!</a>
	<!-- <a   class:active={$location === "/about"} href="/#/about">GET!</a> -->
</nav>

<Router routes={{
	'/': Channels,
	'/feed': Feed,
	'/new': New,
	'/updateall': Updateall,
	'/about': About
}} />



</main>

<style>



	nav{
		background:var(--header-bg);
        display: flex;
	}
	nav a {
		color:var(--header-color);
		text-decoration: none;
		padding-right: 20px;
		padding: 4px;
		display: block;
		min-width: 72px;
		text-align: center;
		box-sizing: border-box;
	}

	nav a.active{
		border-bottom: 4px solid var(--card-bg);
	}
</style>