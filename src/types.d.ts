type channel = {
	id: string,
	name: string,
	link: string,
	host:string,
	observeName: string,
	contains: string[],
	newestOnTop: boolean,
	thumb: string,
	dead: boolean,
	updates: number,
	laspost:string,
	meta:string
}

type feed = {
	title: string,
	content: string,
	link: string,
	host:string,
	postid: string,
	image: string,
	date: string,
	channelid:string
}

type newsfeed = {
	postid: string,
	channelid: string,
  }

type pageupdateResponse = {
	channels:channel[],
	news:newsfeed[]
}

type hosts = string[]
type ids = string[]

type meta = {
	thumb:string,
	name:string
}


  type dbData = {
	channels: channel[],
	feeds: feed[],
	news: newsfeed[],
  }

  type genericapires = {
	  error:boolean,
	  message?:string 
  }