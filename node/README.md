# ibhub

Static-site observer server, with optional frontend interface and rss,
The server is a webscrapper that watch a list of pages saved and check if there are any updates on it.
you can add, remove or update the entries on the frontend or directly from the api.
It presents your updates on a feed like thing, and rss.

to setup pocketbase:

- execute the pocketbase binary
- import the data collection from db.collections.json
- make an admin
- set an smtp email server
- create a .env file with your admin credentials, EMAIL PASSWORD and PORT and the pocketbase server as POCKETBASE, usually "http://127.0.0.1:8090"
---

now to run the server (important that pocketbase still up):

```
npm install
```
```
npm run build
```
```
npm run start
```
---
To add a page go to `New!` and fill the form
Put the url first, it will try to get metadata from the site if available.
Target selector is the valid CSS selector string, you can learn more here: [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

if you want to watch the entire page, just put "body" on it.

If you already have entries on the same website, it will fill the selector automatically.

It works around text, so if an image changes, it will not update, not like its hard to add it, but i see no reason to watch elements attributes.

Very useful for:

- Follow your replies on anonymous forums
- Cool pages on neocities
- Watch price changes on online stores


## todo:
- smarter way to put linebreaks on content 
- fix "added" no id bug (done)
- feed filter (done)
- make more components (done)
- delete confirmation on update page (done)
- get a way to put the frontend source availible in a more organized way (probably git submodules)
- text explanations on inputs (done)
- newsontop illustrations on inputs (nah)

- default values on "observe" (done???)
- add a way to save selectors for domains on the db so you dont have to keep retyping them (done)

- add support for custom server location, and not always same origin
- add more complex theme support, like theme from js object or external css AND custom css
- add settings page to change themes (?) and custom server location (?)
- about page with github link

-  more error handling cases
    -  front end no server connection (done)

- use pocketbase instead of lowdb (done)
- make it deployable friendly
- make a tutorial on how to self host it




added : 

json support, observe apis

todo: 
- explain items on json
- explain "lastchild" and "totext" on json