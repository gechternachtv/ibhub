<script lang="ts">
	import { updateCount } from './stores';
	import {push, pop} from 'svelte-spa-router'

	let result = "updating...";
	(async()=>{
		try {
			const data = await (await fetch('/api/updateall')).json()
			console.log(data)
		
			const news  = await (await (fetch(`/api/getnews`))).json();
			updateCount.update(n => news.length)
			result = "success!"	
			pop()
			
			
		} catch (error) {
			result = `${error}`	
			console.warn(error)
		}

	})()

	


</script>
<main>
	<h2>
		{result}
	</h2>
	
</main>

<style>
	main{
		margin:auto;
        max-width: var(--container);
	}
</style>