<script lang="ts">
	import { onMount } from "svelte";
	import {push, querystring} from 'svelte-spa-router'
	import { updateCount } from './stores';
	import archiveph from './assets/archiveph.png'



let btnActive = false
let linkvalid = false
let containsstr = ""
let result = "Creating new"
let news:newsfeed[] = []
let statusActive = false

const params = new URLSearchParams($querystring)

const data:channel = {
    id: "",
    name:"",
    link:"",
	host:"",
    observeName:"",
    contains:[],
    newestOnTop: false,
    thumb:"",
    dead: false,
    laspost:"",
    meta:"",
	updates:1,
}

const responseOptions:RequestInit = {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		}

const validateSelector = (str:string)=> {
    try {
		if(str === "") throw "empty selector";
        document.querySelector(str);
        return true;
    }
    catch(error) {
        console.warn(error)
    }
    return false;
}

const validateURL = (str:string)=> {
    try {
        new URL(str)
        return true;
    }
    catch(error) {
        console.warn(error)
    }
    return false;
}

	function clearData(){
		data.id= "",
		data.name="",
		data.link="",
		data.observeName="",
	    data.contains=[],
		data.newestOnTop= false,
		data.thumb="",
		data.dead= false,
		data.meta="",
		data.laspost = "",
		data.host = ""

		result = "Creating new"
		statusActive = false
	}


	async function updateData() {
	try {
	
		console.log(data)
		statusActive = true
		result = "posting...";
		btnActive = false

		if (data.name === "") throw "empty name";
		if (!linkvalid) throw "invalid url";
		if (!validateSelector(data.observeName)) throw "invalid selector";
		data.host = (new URL(data.link)).hostname

		const response = await fetch('/api/update', {
			...responseOptions,
			body: JSON.stringify(data)
		});

		if(response.ok){
			statusActive = true
			result =  `${data.id} updated!`
			btnActive = true
		}


	} catch (error) {
			console.warn(error)
			statusActive = true
			result = `error updating, ${error}`;
			btnActive = true
			return false;
	}
	}

	async function addData () {

		try {
			if (data.name === "") throw "empty name";
			if (!linkvalid) throw "invalid url";
			if (!validateSelector(data.observeName)) throw "invalid selector";

			data.host = (new URL(data.link)).hostname
			statusActive = true
			result = "creating...";
		btnActive = false

		console.log("sneding...",data)
		const response = await fetch('/api/new', {
			...responseOptions,
			body: JSON.stringify(data)
		});


		const ress = await response.json()

		if(ress.error){
			throw ress
		}else{
			console.log(ress)
			data.id = ress.id
			const ids:ids = []
			ids.push(data.id)
			statusActive = true
			result = "updating...";
			const getnewupdatesResponse = await fetch('/api/getnewupsates', {
			...responseOptions,
			body: JSON.stringify(ids)
			});

			const getnewupdatesData = await getnewupdatesResponse.json();
			console.log(getnewupdatesData)

			const news  = await (await (fetch(`/api/getnews`))).json();
			updateCount.update(n => news.length)
			statusActive = true
			result = "New target created!"
			btnActive = true
		}


		} catch (error) {
			console.warn(error)
			result = `error updating, ${error}`;
			btnActive = true
			return false;
		}

	}



	async function deleteData () {
		result = "deleting..."
		btnActive = false
		const response = await fetch('/api/delete', {
			...responseOptions,
			body: JSON.stringify(
			{
				id:data.id
			}
		)
		});
		clearData();
		result = `${data.id} deleted!`;
		btnActive = true
	}

	async function tryinfo(url:string){
		console.log(url)
		if(linkvalid){
			statusActive = true
			result = "checking url..."
			const metares = await fetch('/api/trymeta', {
			...responseOptions,
			body: JSON.stringify({link:data.link})
			})

			if(metares.ok){
					const metainfo:meta = await (metares).json()
					console.log(metainfo)

					data.name = metainfo.name === "" ? data.name : metainfo.name
					data.thumb = metainfo.thumb === "" ? data.thumb : metainfo.thumb

					result = (metainfo.name != "" || metainfo.thumb != "") ? "fetched metadata from url" : "metadata not available" 

				}else{
					statusActive = true
					result = "page is not available right now"
				}
		}
	} 

	onMount(async () => {
			for (const key in data) {
				if (params.get(key)){
					if (typeof data[key] === "string") {
						data[key] = params.get(key)
					}else if (typeof data[key] === "boolean"){
						data[key] = params.get(key) === "true" ? true : false
					}else if (typeof data[key] === "object"){
						data[key] = params.get(key).split(",")
					}
				}
			}					
			if(params.get("id")){
				try {
				statusActive = true
				result = "fetching data..."
				const channelRes = await (fetch(`/api/channels/${params.get("id")}`))

				if(channelRes.ok){
					const channel:channel[] = await (channelRes).json()
					console.log(channel)

					for (const key in data) {
						data[key]=channel[0][key];
					}
					statusActive = false
					result = `Updating ${data.id}`
					containsstr = data.contains.toString()
					news = await (await (fetch(`/api/getnews`))).json()
					console.log(channel[0])
				}else{
					clearData()
					result = "Url id not found"
					statusActive = true 
				}
				} catch (error) {
					console.warn(error)
					push("/error")
				}
			}
			
			btnActive = true
        });

	$:{
		data.contains = (containsstr === "") ? [] : containsstr.split(",")
		linkvalid = validateURL(data.link)
	}


</script>

<main>
	<div class="container-header">				
		{#if data.id != ""}
			<h1>Updating!</h1>
		{:else}
			<h1>New!</h1>
		{/if}
	</div>



	<section class="new-section" class:btnActive>
		
		<form>
			{#if data.id != ""}
			<div class="id"> <strong>Id: {data.id} </strong></div> 
			{/if}
			<div>
				<label for="link">url:</label>
				<input id="link" bind:value={data.link} placeholder="link*" on:input={() => tryinfo(data.link)} on:change={() => tryinfo(data.link)} />
			</div>


			<div>
			<label for="name">name</label>
			<input id="name" bind:value={data.name} placeholder="name*"/>
			</div>

			<div>
			<label for="observeName">observeName</label>
			<input id="observeName" bind:value={data.observeName} placeholder="observer*"/>
			</div>

			<div>
			<label for="containsstr">contains</label>
			<input id="containsstr" bind:value={containsstr} placeholder="contains"/>
			</div>

			<div>
			<label for="thumb">thumb</label>
			<input id="thumb" bind:value={data.thumb} placeholder="thumb"/>
			</div>

			<div>
			<label for="meta">meta</label>
			<textarea id="meta" bind:value={data.meta} placeholder="meta"/>
			</div>

				<div class="select-holder">
				<label for="newestOnTop">news on top</label>				
				<input id="newestOnTop" type="checkbox" bind:checked={data.newestOnTop}/>
				</div>


			{#if data.id != ""}
				<div class="select-holder"><label for="dead">dead</label>
					 <input id="dead" type="checkbox" bind:checked={data.dead}/></div>
			{/if}

			<div class="form-btns-holder">
				{#if data.id != ""}
				<button type="button" on:click={updateData}>Update!</button>
				{:else}
				<button type="button" on:click={addData}>New!</button>
				{/if}
				{#if data.id != ""}
				<button type="button" on:click={deleteData}>Delete!</button>
				{/if}
			</div>
		</form>
		<div class="thumb-holder">
			<div class="thumb">
				{#if data.thumb != ""}
					<img src={data.thumb} alt="data.name"/>
				{/if}
				<div class="postdata">
					{#if data.dead }<span class="dead">[Dead]</span>{/if}
					<h3>{data.name}</h3>
					<div class="hostName">{data.host}</div>
					{#if data.contains.length > 0 }
					<div class="contains">
						{#each data.contains as contain}
						<span>{contain}</span>
						{/each}
					</div>
					{/if}
					{#if data.id != ""}
					<div class="replies">
						Updates: {data.updates}
					</div>
					{/if}

					{#if linkvalid}
					<div class="btn-links-holder">
						<a class="btn-link" target="_blank" href="{data.link}">visit 
							<svg fill="var(--button-color)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="15px" height="15px"><path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/></svg>
						</a>
						<a class="btn-link" target="_blank" href="https://archive.today/?run=1&url={data.link}"> <img alt="" src={archiveph}> archive.ph
							<svg fill="var(--button-color)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="15px" height="15px"><path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/></svg>
						</a>
					</div>
					{/if}
				</div>
			</div>
			

			<div class="status">
			{#if data.laspost != ""}
			<div class:newpost={news.find(x => x.channelid === data.id)}>
				<div class="status-content">
					<h4 class="data-content">Last update:</h4>
					<div class="status-text">
						{#each data.laspost.split("\n") as content}
							<div>{content}</div>
						{/each}
					</div>
				</div>
			</div>

			{/if}

			<div class:statusActive={statusActive} class="status-box">
				<h4>STATUS:</h4>
					<div class="status-content">
						<div class="status-text">
						{result}
						</div>
					</div>
				</div>


			</div>
		</div>
		
		</section>
		
</main>


<style>
	main{
		background:var(--container-bg);
		margin:auto;
        max-width: var(--container);
		width:100%;
	}
	section{
		margin-top:10px;
		display: grid;
		grid-template-columns: 1fr 1.6fr;
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
	form{
		padding: 50px;
		padding-top: 0px;
		padding-left:8px;
	}
	form > div {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 10px 0;
	}

	h4{
		background: var(--header-bg);
		color: var(--header-color);
		padding: 5px;
	}
	.newpost{
                border-left: 4px solid var(--news);
            }

	.newpost h4::before {
		content:"[new!]";
  color:var(--news);
	position: absolute;
	top: 29px;
	font-size: 10px;
	left: 4px;
	}

	.newpost h4 {
	position: relative;
	}

	.thumb-holder{
		padding-right: 20px;
	}

	button, .btn-link {
	background: var(--button-bg);
	color: var(--button-color);
	padding: 5px;
	font-weight: 700;
	font-size: 12px;
	border-radius: 8px;
	border:0px;
	min-width: 100px;
	margin: 0;
	cursor: pointer;
	}

	a.btn-link:hover {
		text-decoration: none;
	}

	.form-btns-holder{
		max-width: 160px;
	}

	.dead{
                color: var(--alert);;
                font-weight: bold;
                font-size: 1.17em;
            }

			.contains {
            font-size: 11px;
            opacity:0.8
            }

            .contains span{
            display: inline-block;
            margin-right: 4px;
            padding:0 4px;
            border-radius:5px;
            font-weight: bold;
            background:var(--header-bg);
            color:var(--header-color);
            }

			.status-text{
				margin:10px;
				word-break: break-word;
			}

			.hostName {
				font-size:10px;
				opacity:0.6;
				margin-bottom:1em;
			}

			.postdata > h3 {
				margin-bottom: 0px;
			}

			.replies{
				font-size:11px;
			}

			a.btn-link{
			display: flex;
			justify-content: center;
			align-items: center;
			gap:8px;
			}

			a.btn-link img{
			display: block;
			max-width: 20px;
			}

			.btn-links-holder{
				display: flex;
				gap: 8px;
				margin-top: 14px;
			}
			a.btn-link {
				padding: 2px;
				font-size: 11px;
			}
			.select-holder{
				align-items: center;
				flex-direction: revert;
			}
			.select-holder input{
				margin: 0;
			}

			.thumb img {
				max-width:100%;
			}

			
			@media only screen and (max-width: 991px){
				section{
					grid-template-columns: 1fr;
				}

				.thumb-holder {
					grid-row: 1;
					padding: 18px;
				}
				.select-holder {
				margin:26px 0;
				}

			}

			.container-header{
                background:var(--header-bg);
                color:var(--header-color);
                padding:4px;
                margin:15px 0;
                display: grid;
                grid-template-columns: 1fr auto;
            }
            .container-header h1{
                margin: 0;
            }

			.id{
				margin-bottom: 29px;
				font-size: 17px;
			}



			@media only screen and (max-width: 991px){

			.status-box{
				opacity:0
			}
			.status-box.statusActive{
				opacity:1;
			}

			
				button, .btn-link {
				min-height: 40px;
				width: 100%;
				}

				.form-btns-holder {
				flex-direction: row;
				}

				.form-btns-holder {
				max-width: 100%;
				}


			.status > .status-box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: var(--button-color);
			color: var(--button-bg);
			border-top:1px solid var(--button-bg);
			}

			/* index.da370f4e.css | http://localhost:4001/assets/index.da370f4e.css */

			.status-box h4 {
			display:none;
			}

			}



</style>