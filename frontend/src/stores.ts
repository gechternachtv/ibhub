import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const client = new PocketBase('http://127.0.0.1:8090');


export const updateCount = writable(0);
export const hosts = writable([]);


export const currentDomain = writable("");
export const showall = writable(true);
export const showdead = writable(true)