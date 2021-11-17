<script>
	const data = {name:'', link:'', thumb:'', observe:'', contains:''}
    let result
	
	async function postData () {
		const res = await fetch('https://httpbin.org/post', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		
		result = JSON.stringify(await res.json())
	}
</script>


<input bind:value={data.name} />
<input bind:value={data.link} />
<input bind:value={data.thumb} />
<input bind:value={data.observe} />
<input bind:value={data.contains} />
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
{data.thumb}
{data.observe}
{data.contains}
</pre>