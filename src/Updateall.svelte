<script>
	let result = "updating...";
	(async()=>{
		const data = await (await fetch('/update')).json()
		console.log(data)
		result = "success!"

	})()



</script>
<h2>
	{result}
</h2>
