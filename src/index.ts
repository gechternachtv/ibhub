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


    const app = express();
    app.use(cors());
    app.use(express.json());
    const PORT = process.env.PORT;
    app.use('/', express.static('frontend/dist'));




	
    //methods
    
    const returnDomList = (sitecontent:string,observeName:string,contains:string) => {

        const dom = new jsdom.JSDOM(sitecontent);
        const rawobservedItems = Array.from(dom.window.document.querySelectorAll(observeName))
        return (contains != "") ? rawobservedItems.filter((item:HTMLBodyElement) => item.innerText.includes(contains)) : rawobservedItems

    }

    const updatePages = async () => {

        await db.read()

        await Promise.all(db.data.channels.map(async (singlePage) => {

            if(!singlePage.dead){

                const request = await (fetch(singlePage.link))

                if (!request.ok) {
                    singlePage.dead = true


                    const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                    db.data.channels[query] = {...db.data.channels[query], ...singlePage}

                    await db.write()

                } else {

                    const sitecontent = await request.text();
                    const observedItems = returnDomList(sitecontent,singlePage.observeName,singlePage.contains)

                    observedItems.forEach(async itemToObserve => {
                        if (singlePage.updates != observedItems.length) {

                            singlePage.dead = (observedItems.length === 0)
                            console.log(singlePage.dead)
                            console.log("item updated!")
                            singlePage.updates = observedItems.length

                            const query = db.data.channels.findIndex(o => o.id === singlePage.id)
                            db.data.channels[query] = {...db.data.channels[query], ...singlePage}

                            const lastPost = singlePage.newestOnTop ? observedItems[0] : observedItems[observedItems.length - 1]
                            const postId = uniqid()
                            
                            
                            db.data.feeds.push({
                                title: singlePage.dead ? `[dead thread] ${singlePage.name}` : `[thread update] ${singlePage.name}`,
                                content: singlePage.dead ? `[dead thread]` : lastPost.textContent,
                                link: singlePage.link,
                                postid: postId,
                                image: singlePage.dead ? singlePage.thumb : (lastPost.querySelector('img') ? lastPost.querySelector('img').src : singlePage.thumb),
                                date: new Date().toString(),
                            })

                            db.data.news.push(postId)
                            await db.write()


                        }

                    })

                }

            }

        }));

        return {channels:db.data.channels,news: db.data.news}


    }

    await updatePages()
    console.log("updated!")


    //endpoints:

    app.get('/rss',async (req, res) => {
        res.header("Content-Type", "application/xml");

        await updatePages()

        const rssfeed = new RSS({
            title: 'chansub',
            description: 'get your imageboard feeds on rss!',
            feed_url: `http://localhost:${PORT}/rss`,
            site_url:`http://localhost:${PORT}`,
            image_url:"http://pm1.narvii.com/6330/ed1b1e37cf8bc7e7d9c21556b459427b8c2e2d17_00.jpg"
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

    app.get('/channels',async (req, res) => {
        await db.read()
        res.send(db.data.channels)
    })

    app.get('/feed', async (req, res) => {
        await db.read()
        console.log(db.data.feeds)
        res.send(db.data.feeds)
    })

    app.get('/update', async (req, res) => {
        const data = await updatePages()
        res.send(data)
    })

    app.post('/channels/delete', async (req, res) => {
        await db.read()
        db.data.channels = db.data.channels.filter(o => o.id === req.body.id)
        await db.write()
       res.send({success:true})
    })


    app.post('/channels/update', async (req, res) => {
        await db.read()

        const query = db.data.channels.findIndex(o => o.id === req.body.id)
        db.data.channels[query] = {...db.data.channels[query], ...req.body}

        await db.write()
       res.send({success:true})
       

    })


    app.post('/channels/new', async (req, res) => {
        await db.read()
        const sitecontent =  await ( (await fetch(req.body.link)).text());
        const observedItems = returnDomList(sitecontent,req.body.observeName,req.body.contains)
        const channel = {...req.body, updates:observedItems.length}

            const newId = uniqid()
            channel.thumb = channel.thumb

            db.data.channels.push({
                ...channel,
                id: newId
            })


            const postId = uniqid()
            db.data.feeds.push({
                title: `${channel.name} added!`,
                content: `${channel.name} added, current replies:${channel.updates}`,
                link: channel.link,
                postid: postId,
                image: channel.thumb ? channel.thumb : null,
                date: new Date().toString(),
            })

            db.data.news.push(postId)

            await db.write()
            res.send({
                ...channel,
                id: newId
            })
        
    })


    app.get('/getnews', async (req, res) => {
        await db.read()
        res.send(db.data.news)
        
    })

    app.get('/readallnews',async (req, res) => {
        await db.read()
        db.data.news = []
        await db.write()
       res.send({success:true})
    })






    app.listen(PORT, () => {
        console.log(`Backend is running on http://localhost:${PORT}`)
    })









