import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import jsdom from "jsdom"
import RSS from "rss"

import lowDb from "lowdb"
import FileSync from "lowdb/adapters/FileSync.js"
import {
    nanoid
} from "nanoid"
// const Jsdom = jsdom.JSDOM

//express app









(async () => {

    const app = express()
    app.use(cors())
    app.use(express.json())
    const PORT = 4000;
    app.use('/', express.static('public'))

    //sync json

    const db = lowDb(new FileSync('db.json'))
    db.defaults({
        channels: [],
        feed: []
    }).write()


    const localData = db.get("channels").value()





    const updatePages = async () => {

        await Promise.all(localData.map(async (singlePage) => {

            try {

                const request = await (await (fetch(singlePage.link)))

                if (request.status === 404) {
                    const feedPostdata = {
                        content: "thread is ded, F",
                        link: singlePage.link,
                        postid: singlePage.id,
                        image: null
                    }


                    db.get('feed')
                        .find({
                            postid: singlePage.id,
                        })
                        .assign({
                            ...feedPostdata
                        })
                        .write()


                    singlePage.dead = true


                    db.get('channels')
                        .find({
                            id: singlePage.id
                        })
                        .assign({
                            ...singlePage
                        })
                        .write()

                } else {

                    const sitecontent = await request.text();
                    const dom = new jsdom.JSDOM(sitecontent);
                    const observedItems = dom.window.document.querySelectorAll(singlePage.observeName)

                    console.log(observedItems);

                    observedItems.forEach(async itemToObserve => {
                        if (singlePage.updates != observedItems.length) {

                            singlePage.dead = (observedItems.length == 0)
                            console.log(singlePage.dead)
                            console.log("item updated!")
                            singlePage.updates = observedItems.length

                            db.get('channels')
                                .find({
                                    id: localData.id
                                })
                                .assign({
                                    ...localData
                                })
                                .write()

                            const lastPost = singlePage.newestOnTop ? observedItems[0] : observedItems[observedItems.length - 1]

                            db.get("feed").push({
                                title: singlePage.dead ? `[dead thread] ${singlePage.name}` : `[thread update] ${singlePage.name}`,
                                content: singlePage.dead ? `[dead thread]` : lastPost.textContent,
                                link: singlePage.link,
                                postid: singlePage.id,
                                image: singlePage.dead ? singlePage.thumb : (lastPost.querySelector('img') ? lastPost.querySelector('img').src : singlePage.thumb),
                                date: new Date().toString()
                            }).write()




                        }

                    })

                }


            } catch (error) {
                console.warn(error)
            }
        }));

        return localData


    }

    await updatePages()
    console.log("updated!")

    app.get('/rss', (req, res) => {
        res.header("Content-Type", "application/xml");
        const rssfeed = new RSS({
            title: 'chansub',
            description: 'get your imageboard feeds on rss!',
            feed_url: 'http://localhost:4000/rss',
            site_url:'http://localhost:4000',
            image_url:"http://pm1.narvii.com/6330/ed1b1e37cf8bc7e7d9c21556b459427b8c2e2d17_00.jpg"
           });
        const feed = db.get("feed").value()
        feed.forEach(item =>{
            rssfeed.item({
                title:  item.title,
                description: `
                <h1>${item.title}</h1>
                <p>${item.content}</p>
                <img src="${item.image}"/>
                <p><a href="${item.link}">${item.link}</a></p>
                `,
                guid:item.postid
            });
        })
        
        res.send(rssfeed.xml())
    })

    app.get('/channels', (req, res) => {
        const data = db.get("channels").value()
        res.send(data)
    })

    app.get('/feed', (req, res) => {
        const data = db.get("feed").value()
        res.send(data)
    })

    app.get('/update', async (req, res) => {
        const data = await updatePages()
        res.send(data)
    })

    app.post('/channels/new', async (req, res) => {
        const channel = req.body
        console.log(channel.id)
        if (channel.id != "") {

            db.get('channels')
                .find({
                    id: channel.id
                })
                .assign({
                    ...channel
                })
                .write()

        } else {
            const newId = nanoid()
            channel.thumb = channel.thumb
            db.get("channels").push({
                ...channel,
                id: newId
            }).write()
            res.json({
                success: true
            })
            db.get("feed").push({
                title: `${channel.name} added!`,
                content: `${channel.name} added!`,
                link: channel.link,
                postid: nanoid(),
                image: channel.thumb ? channel.thumb : null,
                date: new Date().toString()
            }).write()


        }
    })




    app.listen(PORT, () => {
        console.log(`Backend is running on http://localhost:${PORT}`)
    })









})()