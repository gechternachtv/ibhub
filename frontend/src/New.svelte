<script>
	import {querystring} from 'svelte-spa-router'
	import { updateCount } from './stores.js';

	let btnActive = true

	const params = new URLSearchParams($querystring)


	const data = {
		id: params.get("id") ? params.get("id") : "",
	 	name:params.get("name") ? params.get("name") : "",
	  	link:params.get("link") ? params.get("link") : "",
		observeName:params.get("observeName") ? params.get("observeName") : "",
	    contains:params.get("contains") ? params.get("contains") : "",
		newestOnTop:params.get("newestOnTop") ? params.get("newestOnTop") : false,
		thumb:params.get("thumb") ? params.get("thumb") : "",
		dead:params.get("dead") ? (params.get("dead")==="true" ? true : false) : false
	}


	let result = ""
	
	const responseOptions = {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(
			{
				...data,
				"dead": false,
			}
		)
		}

	function clearData(){
		data.id= "",
		data.name="",
		data.link="",
		data.observeName="",
	    data.contains="",
		data.newestOnTop= false,
		data.thumb="",
		data.dead= false
		
	}


	async function updateData() {
		console.log(data)
		result = "posting...";
		btnActive = false

		const response = await fetch('/channels/update', {
			...responseOptions,
			body: JSON.stringify(data)
		});

		console.log(response)
		result = "target updated!"
		btnActive = true
	}

	async function addData () {
		result = "creating...";
		btnActive = false

		const response = await fetch('/channels/new', {
			...responseOptions,
			body: JSON.stringify(
			{
				...data,
				"dead": false,
			}
		)
		});
		const ress = await response.json()
		console.log(ress)
		data.id = ress.id

		result = "updating...";
		const updatedata = await (await fetch('/update')).json()
		console.log(updatedata)

		const news  = await (await (fetch(`/getnews`))).json();
		updateCount.update(n => news.length)
		result = "new target created!"
		btnActive = true
	}



	async function deleteData () {
		result = "deleting..."
		btnActive = false
		const response = await fetch('/channels/delete', {
			...responseOptions,
			body: JSON.stringify(
			{
				id:data.id
			}
		)
		});

		result = "target deleted!";
		btnActive = true
		clearData();
	}



</script>



<section class:btnActive>


{#if data.id != ""}
	<div class="id">Updating: {data.id} <button on:click={clearData}>Clear</button> </div>
{/if}

<form>
	<input bind:value={data.name} placeholder="name*"/>
	<input bind:value={data.link} placeholder="link*"/>
	<input bind:value={data.observeName} placeholder="observer*"/>
	<input bind:value={data.contains} placeholder="contains"/>
	<input bind:value={data.thumb} placeholder="thumb"/>
	{#if data.id != ""}
		dead: <input type="checkbox" bind:checked={data.dead}/>
	{/if}	
	
		{#if data.id != ""}
		<button type="button" on:click={updateData}>Update!</button>
		{:else}
		<button type="button" on:click={addData}>New!</button>
		{/if}
		{#if data.id != ""}
		<button type="button" on:click={deleteData}>Delete!</button>
		{/if}
</form>

{#if data.thumb != ""}
<div class="thumb">
	<img src={data.thumb} alt="data.name"/>
</div>
{/if}

</section>


{#if result != ""}
	Result:	
	<h2>
		{result}
	</h2>
{/if}

<style>
	.id{
		background: #e04001;
		color: #ffe;
		padding: 4px;
		margin: 10px 0;
		grid-column: span 2;
		display: flex;
		gap: 20px;
		align-items: center;
	}
	section{
		margin-top:10px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
	section button,section input{
		opacity:0.7;
		pointer-events: none;
		display:block
	}
	.btnActive button,.btnActive input{
		opacity:1;
		pointer-events: initial;
	} 
</style>