<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Channels from './Channels.svelte';
	import Feed from './Feed.svelte';
	import New from './New.svelte';
	import Updateall from './Updateall.svelte';
</script>

<nav>
	<a  href="/#/">Channels</a>
	<a href="/#/feed">Feed</a>
	<a href="/#/new">Add</a>
	<a  href="/#/updateall">GET!</a>
</nav>

<Router routes={{
	'/': Channels,
	'/feed': Feed,
	'/new': New,
	'/updateall': Updateall
}} />

<hr>
/#{$location}

<style>
	nav{
		background:#e04000;
        padding:4px;
	}
	nav a {
		color:white;
		text-decoration: none;
		padding-right: 20px;
	}
</style>