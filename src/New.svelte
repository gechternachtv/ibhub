<script>
	import {location, querystring} from 'svelte-spa-router'

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
	
	async function postData () {
		console.log("posting...")
		const response = await fetch('/channels/new', {
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
				"updates": 1,
				"dead": false,
			}
		)
		});
		console.log(response)
		result = "success!" 
	}






console.log($querystring)

</script>




<input bind:value={data.id} placeholder="id"/>
<input bind:value={data.name} placeholder="name*"/>
<input bind:value={data.link} placeholder="link*"/>
<input bind:value={data.observeName} placeholder="observer*"/>
<input bind:value={data.contains} placeholder="contains"/>
<input bind:value={data.thumb} placeholder="thumb"/>
dead: <input type="checkbox" bind:checked={data.dead}/>

<button type="button" on:click={postData}>
	{#if data.id != ""}
	Update!
	{:else}
	New!
	{/if}
</button>
<p>
	{#if data.thumb != ""}
	<div>
		<img src={data.thumb} alt="data.name"/>
	</div>
	{/if}
</p>

Result:
<h2>
	{result}
</h2>
