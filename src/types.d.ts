type channel = {
	id: string,
	name: string,
	link: string,
	observeName: string,
	contains: string,
	newestOnTop: boolean,
	thumb: string,
	dead: boolean,
	updates: number
}

type feed = {
	title: string,
	content: string,
	link: string,
	postid: string,
	image: string,
	date: string
}


type dbData = {
	channels: channel[],
	feeds: feed[],
	news: string[]
  }