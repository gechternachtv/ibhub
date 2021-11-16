<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Channels from './Channels.svelte';
	import Feed from './Feed.svelte';
</script>

<nav>
	<a  href="/#/">Channels</a>
	<a href="/#/feed">Feed</a>
</nav>

<Router routes={{
	'/': Channels,
	'/feed': Feed
}} />

<hr>
/#{$location}