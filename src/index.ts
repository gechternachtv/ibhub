import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import jsdom from "jsdom";
import RSS from "rss";
import uniqid from "uniqid";
import dotenv from "dotenv"
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';


dotenv.config();
//initialize

const __dirname = dirname(fileURLToPath(import.meta.url));


const file = join(__dirname, 'db.json');
const adapter = new JSONFile<dbData>(file);
const db = new Low(adapter);

await db.read();

db.data ||= {channels:[],news:[],feeds:[]};


await db.write();

    const app = express();
    app.use(cors());
    app.use(express.json());
    const PORT = process.env.PORT;
   
    
    const returnDomList:(sitecontent:string,observeName:string,contains:string[]) => Element[] = (sitecontent,observeName,contains) =>  {

        const dom = new jsdom.JSDOM(sitecontent);
        const rawobservedItems = Array.from(dom.window.document.querySelectorAll(observeName))
        return (contains.length > 0) ? rawobservedItems.filter((item:Element) => contains.some(x => item.innerHTML?.includes(x)) ) : rawobservedItems

    }


    const updatePages:(filterIds?:string[]) => Promise<pageupdateResponse> = async (filterIds = []) => {

        await db.read()

        const channels:channel[] = filterIds.length ? db.data.channels.filter((e:channel) => filterIds.includes(e.id)) : db.data.channels

        await Promise.all(channels.map(async (singlePage) => {


                if(!singlePage.dead){

                    const request = await (fetch(singlePage.link))
    
                    if (!request.ok) {
                        singlePage.dead = true
    
    
                        const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                        db.data.channels[query] = {...db.data.channels[query], ...singlePage}
    
                        await db.write()
    
                    } else {
    
                        const sitecontent = await request.text();
                        const observedItems:Element[] = returnDomList(sitecontent,singlePage.observeName,singlePage.contains)
    
                        observedItems.forEach(async (itemToObserve:Element) => {
    
                            const lastPost = singlePage.newestOnTop ? observedItems[0] : observedItems[observedItems.length - 1]
    
                            lastPost.innerHTML = lastPost?.innerHTML?.replaceAll("<li>","• ").replaceAll("</li>","\n").replaceAll("<br>","\n") //basic list formating

                            if (singlePage.updates != observedItems.length || lastPost.textContent != singlePage.laspost) {

                                
                                console.log(lastPost.textContent)

                                console.log("item updated!")
                                singlePage.dead = (observedItems.length === 0)
                                singlePage.updates = observedItems.length
                                singlePage.laspost = lastPost.textContent
    
                                const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                                db.data.channels[query] = {...db.data.channels[query], ...singlePage}
    
                                
                                const postId = uniqid()
                                
                                
                                const date = new Date()
                                db.data.feeds.push({
                                    title: singlePage.dead ? `[dead thread] ${singlePage.name}` : `${singlePage.contains.length > 0 ? `[new reply]` : `[thread update]`} ${singlePage.name}`,
                                    content: singlePage.dead ? `[dead thread]` : lastPost.textContent,
                                    link: singlePage.link,
                                    host:(new URL(singlePage.link)).hostname,
                                    postid: postId,
                                    image: singlePage.thumb,
                                    date: date.toLocaleString(),
                                    channelid:singlePage.id
                                })
    
                                db.data.news.push({
                                    "postid":postId,
                                    "channelid":singlePage.id
                                })
                                await db.write()
    
    
                            }
    
                        })
    
                    }
    
                }
                
        }));

        return {channels:channels,news: db.data.news}


    }


    await updatePages()
    console.log("updated!")


    //endpoints:
    app.use('/', express.static('frontend/dist'));

    app.get('/rss',async (req, res) => {
        res.header("Content-Type", "application/xml");

        await updatePages()

        const rssfeed = new RSS({
            title: 'ibhub',
            description: 'get your imageboard updates on rss!',
            feed_url: `http://localhost:${PORT}/rss`,
            site_url:`http://localhost:${PORT}`,
            image_url:""
           });
           
        
        db.data.feeds.forEach(item =>{
            rssfeed.item({
                title:  item.title,
                description: `
                <h1>${item.title}</h1>
                <p>${item.content}</p>
                <img src="${item.image}"/>
                <p><a href="${item.link}">${item.link}</a></p>
                `,
                guid:item.postid,
                url:item.postid,
                date: new Date()
            });


        })
        
        res.send(rssfeed.xml())
    })

    app.get('/api/channels/?',async (req, res) => {
        await db.read()
        console.log(req.query.value)
        
        let data:channel[] = db.data.channels

        for (const property in req.query) {
            console.log(`${property}: ${req.query[property]}`);
            data = data.filter((ch:channel) => ch[property] === req.query[property])
          }
          
        res.status(data[0] ? 200 : 404).send(data)
    })

    app.get('/api/feed', async (req, res) => {
        await db.read()
        console.log(db.data.feeds)
        res.send(db.data.feeds)
    })

    app.get('/api/activehosts', async (req, res) => {
        await db.read()
        const set = new Set(db.data.channels.map(e => e.host))
        res.send(Array.from(set))
    })

    app.get('/api/getnews', async (req, res) => {
        await db.read()
        res.send(db.data.news)     
    })

    app.get('/api/readallnews',async (req, res) => {
        await db.read()
        db.data.news = []
        await db.write()
       res.send({error:false,message:"success!"})
    })

    app.post('/api/getnewupsates', async (req, res) => {
        try {
            console.log(req.body)
            const data = await updatePages(req.body.length ? req.body : [])
            res.send(data)   
        } catch (error) {
            res.status(400).send({error:true,message:error}) 
        }
    })

    app.post('/api/delete', async (req, res) => {
        await db.read()

        const query = db.data.channels.findIndex(o => o.id === req.body.id)
        if(query === -1){
            res.status(404).send({error:true,message:"id not found"})
        }else{
            db.data.channels = db.data.channels.filter(o => o.id != req.body.id)
            await db.write()
           res.send({error:false,message:"success!"})
        }
    })

    app.post('/api/update', async (req, res) => {
        await db.read()

        const query = db.data.channels.findIndex(o => o.id === req.body.id)
        if(query === -1){
            res.status(404).send({error:true,message:"id not found"})
        }else{
            db.data.channels[query] = {...db.data.channels[query], ...req.body}
            await db.write()
           res.send({error:false,message:"success!"})
        }
       

    })

    app.post('/api/trymeta', async (req, res) => {

        try {
            const sitecontent = await fetch(req.body.link)
            console.log(req.body.link,sitecontent.status)
            if(sitecontent.ok){
    
                    const text = await sitecontent.text()
                    const dom = new jsdom.JSDOM(text);
                    const thumb = dom.window.document.querySelector(`meta[property="og:image"]`)
                    const name = dom.window.document.querySelector(`meta[property="og:title"]`)
                    const meta:meta = {
                        thumb:thumb ? thumb.getAttribute("content") : "",
                        name:name ? name.getAttribute("content") : ""}
                    res.send(meta)
                    
    
            }else{
                res.status(404).send({error:true})
            }
    
        } catch (error) {
            res.status(404).send({error:true})
        }        

    })

    app.post('/api/new', async (req, res) => {

        try {
            await db.read()
            const sitecontent =  await ( (await fetch(req.body.link)).text());
            const observedItems = returnDomList(sitecontent,req.body.observeName,req.body.contains)
            const channel = {...req.body, updates:observedItems.length}
    
                const newchannelId = uniqid()
                channel.thumb = channel.thumb
    
                db.data.channels.push({
                    ...channel,
                    id: newchannelId
                })
    
    
                const postId = uniqid()

                const date = new Date()
                db.data.feeds.push({
                    title: `${channel.name} added!`,
                    content: `${channel.name} added, current replies:${channel.updates}`,
                    link: channel.link,
                    host:(new URL(channel.link)).hostname,
                    postid: postId,
                    image: channel.thumb ? channel.thumb : null,
                    date: date.toUTCString(),
                    channelid:newchannelId
                })
    
                db.data.news.push({
                    "postid":postId,
                    "channelid":newchannelId
                })
    
                await db.write()
                res.send({
                    ...channel,
                    id: newchannelId
                })
        } catch (error) {
            res.status(400).send({
                error:true,
                message:error
            })
        }
    })

    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`)
    })









