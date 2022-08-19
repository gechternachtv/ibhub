import { writable } from 'svelte/store';


export const updateCount = writable(0);

export const isnew:(news:newsfeed[],channelid:string)=>boolean = (news,channelid)=>{
    const arr = news.find(x => x.channelid === channelid)
    return arr != undefined
}


export const currentDomain = writable("");
export const showall = writable(true);
export const showdead = writable(true)