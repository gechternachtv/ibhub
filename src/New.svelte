<script>
	const data = {name:'', link:'', observe:'', contains:'', newestOnTop:false}
    let result
	
	async function postData () {

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
				"observeName": "post",
				"updates": 1,
				"dead": false,
			}
		)
		});
		console.log(response)
	}









</script>


<input bind:value={data.name} placeholder="name*"/>
<input bind:value={data.link} placeholder="link*"/>
<input bind:value={data.observe} placeholder="observer*"/>
<input bind:value={data.contains} placeholder="contains"/>
<button type="button" on:click={postData}>
	Post it.
</button>
<p>
	Result:
    {result}
</p>
<pre>
{data.name}
{data.link}
{data.observe}
{data.contains}
</pre>