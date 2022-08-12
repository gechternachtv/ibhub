<script>
	import { updateCount } from './stores.js';

	let result = "updating...";
	(async()=>{
		try {
			const data = await (await fetch('/update')).json()
			console.log(data)
		
			const news  = await (await (fetch(`/getnews`))).json();
			updateCount.update(n => news.length)
			result = "success!"	
		} catch (error) {
			result = ":c"	
			console.warn(error)
		}

	})()

	


</script>
<h2>
	{result}
</h2>
