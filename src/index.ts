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

    const pushNews = (singlePage:channel,feed:feed)=>{
            
        const postId = uniqid()
        const date = new Date()
        db.data.feeds.push({...feed, postid: postId,date: date.toLocaleString(),})
        db.data.news.push({
            "postid":postId,
            "channelid":singlePage.id
        })


    }

    const updatePages:(filterIds?:string[], ignoredead?:boolean, dead?:boolean) => Promise<pageupdateResponse> = async (filterIds = [],ignoredead = false, dead = null) => {
        console.log("filterIds:")
        console.log(filterIds)
        console.log("ignoredead")
        console.log(ignoredead)
        await db.read()

        const channels:channel[] = filterIds.length ? db.data.channels.filter((e:channel) => filterIds.includes(e.id)) : db.data.channels

        await Promise.all(channels.map(async (singlePage) => {


                if(!singlePage.dead || ignoredead){

                    const request = await (fetch(singlePage.link))
    
                    if (!request.ok) {
                        singlePage.dead = true
    
    
                        const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                        db.data.channels[query] = {...db.data.channels[query], ...singlePage}
    

                        pushNews(singlePage,{
                            title: `[page is down] ${singlePage.name}`,
                            content: `[page is down]`,
                            link: singlePage.link,
                            host:(new URL(singlePage.link)).hostname,
                            image: singlePage.thumb,
                            channelid:singlePage.id,
                            postid: "",
                            date: ""
                        })
                        


                        await db.write()
    
                    } else {
    
                        const sitecontent = await request.text();
                        const observedItems:Element[] = returnDomList(sitecontent,singlePage.observeName,singlePage.contains)
    
                        observedItems.forEach(async (itemToObserve:Element) => {
    
                            const lastPost = singlePage.newestOnTop ? observedItems[0] : observedItems[observedItems.length - 1]
    
                            lastPost.innerHTML = lastPost?.innerHTML?.replaceAll("<li>","• ").replaceAll("</li>","\n").replaceAll("<br>","\n") //basic list formating

                            if (singlePage.updates != observedItems.length || lastPost.textContent != singlePage.laspost) {

                                console.log(`${singlePage.name} updated!`)
                                singlePage.dead = (dead != null) ? dead : (observedItems.length === 0)  
                                singlePage.updates = observedItems.length
                                singlePage.laspost = lastPost.textContent
    
                                const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                                db.data.channels[query] = {...db.data.channels[query], ...singlePage}
    
                                if(!ignoredead){
                                    pushNews(singlePage,{
                                        title: `${singlePage.dead ? `[target selector count is 0]` : `[page update]`} ${singlePage.name}`,
                                        content: singlePage.dead ? `Check if the target selector is right or if the page is still up` : lastPost.textContent,
                                        link: singlePage.link,
                                        host:(new URL(singlePage.link)).hostname,
                                        image: singlePage.thumb,
                                        channelid:singlePage.id,
                                        postid: "",
                                        date: "",
                                    })
                                }
                                await db.write()
    
    
                            }
    
                        })
    
                    }
    
                }
                
        }));

        return {channels:channels,news: db.data.news}


    }


    await updatePages()
    console.log("all pages updated!")


    //endpoints:
    app.use('/', express.static('frontend/dist'));

    app.get('/rss',async (req, res) => {
        res.header("Content-Type", "application/xml");

        await updatePages()

        const rssfeed = new RSS({
            title: 'ibhub',
            description: 'get your pages updates on rss!',
            feed_url: `http://localhost:${PORT}/rss`,
            site_url:`http://localhost:${PORT}`,
            image_url:"data:image/png;base64,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"
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
        
        let data:channel[] = db.data.channels

        for (const property in req.query) {
            console.log(`${property}: ${req.query[property]}`);
            data = data.filter((ch:channel) => ch[property] === req.query[property])
          }
          
        res.status(data[0] ? 200 : 404).send(data)
    })

    app.get('/api/feed', async (req, res) => {
        await db.read()
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
            const dead = (req.body.dead != undefined ) ? req.body.dead : null
            const data = await updatePages(req.body.ids?.length ? req.body.ids : [], !!req.body.ignoredead, dead )
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









