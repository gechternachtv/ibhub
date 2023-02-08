import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const pb = new PocketBase('POCKETBASE');

export const updateCount = writable(0);
export const hosts = writable([]);


export const currentDomain = writable("");
export const showall = writable(true);
export const showdead = writable(false)
