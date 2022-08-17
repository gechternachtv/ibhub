<script lang="ts">
	import Router from 'svelte-spa-router';
	import { Body, classList, style } from 'svelte-body';
	import Channels from './Channels.svelte';
	import Feed from './Feed.svelte';
	import New from './New.svelte';
	import Config from './Config.svelte';
	import { updateCount } from './stores';
	import {location} from 'svelte-spa-router'

	(async ()=>{
		const news:string[]  = await (await (fetch(`/api/getnews`))).json();
		updateCount.update(n => news.length)
	})()



	
let count = "";

$:{
	if($updateCount > 0){
		count = `(${$updateCount})`
	}else{
		count = ""
	}
}


let classes = 'yotsuba-nograd';
let styles = '';
const themes = ["yotsuba-nograd","yotsuba","yotsuba-b","nograd","bluesky","luckygreen","uboa","plankton"]

</script>

<svelte:head>
	<title>{count} ibhub</title>
</svelte:head>
<svelte:body use:classList={classes} use:style={styles} />

<main>

<nav >
	<a  class:active={$location === "/"} href="/#/">Channels</a>
	<a  class:active={$location === "/feed"} href="/#/feed">Feed 
			<strong>{count}</strong>
	</a>
	<a  class:active={$location === "/new"} href="/#/new">Add</a>
	<!-- <a  class:active={$location === "/config"} href="/#/settings">Settings</a> -->
	<!-- <input id="name" bind:value={theme} placeholder="default"/> -->
	<div class="settings">
		<select bind:value={classes}>
			{#each themes as theme}
				<option value={theme}>
					{theme}
				</option>
			{/each}
		</select>
	</div>
	

</nav>

<div class="app">

<Router routes={{
	'/': Channels,
	'/feed': Feed,
	'/new': New,
	'/settings': Config
}} />
</div>


</main>

<style>

:global(.yotsuba) {
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
			--body-background:linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);;
		}

		:global(.yotsuba-nograd) {
			--alert: #fb0000;
			--news: #fb0000;
			--header-bg: #e04001;
			--main-font-1: #800000;
			--main-font-2: #800000;
			--button-bg: #800000;
			--button-color: #ffe;
			--header-color: #ffe;
			--card-bg: #f0e0d6;
			--container-bg: #fff3e6;
			--gradient-col-1: #fff3e6;
			--gradient-col-2: #fff3e6;
			--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
		}

		:global(.yotsuba-b) {
			--alert: #AF0A0F;
			--news: #AF0A0F;
			--header-bg: #98e;
			--main-font-1: #0F0C5D;
			--main-font-2: #0F0C5D;
			--button-bg: #074f2a;
			--button-color: #ffe;
			--header-color: #000;
			--card-bg: #D6DAF0;
			--container-bg: #ffe;
			--gradient-col-1: #d1d5ee;
			--gradient-col-2: #ffe;
			--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
			}

			:global(.nograd) {
				--alert: #fb0000;
				--news: #fb0000;
				--header-bg: #800000;
				--main-font-1: #800000;
				--main-font-2: #800000;
				--button-bg: #117743;
				--button-color: #ffe;
				--header-color: white;
				--card-bg: #f0e0d6;
				--container-bg: #fff3e6;
				--gradient-col-1: #fff3e6;
				--gradient-col-2: #fff3e6;
				--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
			}

			:global(.bluesky) {
				--alert: #d3152e;
				--news: #cb4e16;
				--header-bg: #42a0bd;
				--main-font-2: black;
				--button-bg: #428194;
				--button-color: #fff;
				--header-color: #fff;
				--card-bg: #fff;
				--container-bg: #eef2f3;
				--gradient-col-1: #eef2f3;
				--gradient-col-2: #e8e8e8;
				--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
				--main-font-1: #214049;
			}

			:global(.luckygreen) {
				--alert: #d3152e;
				--news: #cb4e16;
				--header-bg: #36a672;
				--main-font-2: #000;
				--button-bg: #297d56;
				--button-color: #fff;
				--header-color: #fff;
				--card-bg: #fff;
				--container-bg: #eef2f3;
				--gradient-col-1: #eef2f3;
				--gradient-col-2: #e8e8e8;
				--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
				--main-font-1: #214049;
			}

			:global(.uboa) {
				--alert: #D33;
				--news: #D33;
				--header-bg: #603030;
				--main-font-2: #AAA;
				--button-bg: #168a4f;
				--button-color: white;
				--header-color: #fff;
				--card-bg: #383838;
				--container-bg: #1c1c1c;
				--gradient-col-1: #1c1c1c;
				--gradient-col-2: #1c1c1c;
				--body-background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
				--main-font-1: #8080E0;
			}
			:global(.plankton) {
				--alert: #FF2164;
				--news: #FF2164;
				--header-bg: #c1c1c1;
				--main-font-1: black;
				--main-font-2: black;
				--button-bg: #0394fc;
				--button-color: #ffe;
				--header-color: black;
				--card-bg: #eaeaea;
				--container-bg: #ffffff08;
				--gradient-col-1: #fff3e6;
				--gradient-col-2: #fff3e6;
				--body-background: repeat center url('https://zonaplankton.net/backgrounds/pattern2.png');
							}
			:global(.uboa .new-section) {
				color: var(--button-color);
			}
	:global(body) {
			--container: 1300px;
			background: var(--gradient-col-1);
			background: var(--body-background);
			background-repeat: no-repeat;
			background-attachment: fixed;
		}


.app {
margin-bottom: 50px;
padding-bottom: 30px;
}

	nav{
		background:var(--header-bg);
        display: flex;
		display: grid;
grid-template-columns: auto auto auto 1fr;
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
	.settings{
		display: flex;
		align-content: center;
		justify-content: flex-end;
	}
	select {
		font-size: 11px;
		padding: 2px;
		border:0px;
		background:var(--button-bg);
		color:var(--button-color);
		border-radius: 4px;
		margin: 4px;
		cursor: pointer;
	}
</style>