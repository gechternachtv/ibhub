<script lang="ts">
	import Router from 'svelte-spa-router';
	import Dashboard from './channels/Channels.svelte';
	import Themeswitch from './themeswitch.svelte';
	import Feed from './feed/Feed.svelte';
	import New from './New/New.svelte';
	import Error from './Error.svelte';
	import Login from './Login.svelte';
	import { updateCount, pb } from './stores';
	import {location} from 'svelte-spa-router'
	


	// const askPermision = ()=>{
	// 		Notification.requestPermission().then((result) => {
  	// 		console.log(`%c ${result}`,"font-size:20px;color:tomato");
	// 	});
	// }

	(async ()=>{
		try {
			const news  = await pb.collection("news").getFullList();
		updateCount.update(n => news.length)

		// if(Notification.permission === "granted" && news.length > 0 ){
		// 	new Notification(`you have ${news.length} updates `, {
		// 		tag: 'notification-count'
		// 	}
		// 	)
		// }			
		} catch (error) {
			console.warn(error)
		}

		
	})()



	
let count = "";

$:{
	if($updateCount > 0){
		count = `(${$updateCount})`
	}else{
		count = ""
	}
}



</script>

<svelte:head>
	<title>{count} ibhub</title>
</svelte:head>


<main>

<nav >
	<a  class:active={$location === "/"} href="/#/">Home</a>
	<a  class:active={$location === "/dashboard"} href="/#/dashboard">Dashboard</a>
	<a  class:active={$location === "/feed"} href="/#/feed">Feed 
			<strong>{count}</strong>
	</a>

	<div class="settings">
		<Themeswitch/>
	</div>

</nav>

<div class="app">

<Router routes={{
	'/dashboard': Dashboard,
	'/feed': Feed,
	'/new': New,
	'/error':Error,
	'/':Login,
}} />
</div>


</main>

<style>


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
@media(max-width:376px){
	.settings {
		grid-column: span 4;
		margin-top: 9px;
		}
}

</style>