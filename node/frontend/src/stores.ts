import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const client = new PocketBase('https://ibhub-pocketbase.fly.dev');


export const updateCount = writable(0);
export const hosts = writable([]);


export const currentDomain = writable("");
export const showall = writable(true);
export const showdead = writable(true)