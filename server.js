import express from "express"
import cors from "cors"
import lowDb from "lowdb"
import FileSync from "lowdb/adapters/FileSync.js"
import {
    nanoid
} from "nanoid"
import fetch from "node-fetch"
const db = lowDb(new FileSync('db.json'))

db.defaults({
    channels: []
}).write()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 4000;

app.use('/', express.static('public'))

app.get('/query', (req, res) => {
    return (async () => {
        const foo = await (await (fetch(`http://localhost:${PORT}/channels`))).json()

        let allcontent = [];

        for (let index = 0; index < foo.length; index++) {
            const element = foo[index];
            try {
                const sitecontent = await (await (fetch(element.url))).text()
                allcontent.push({
                    data: {
                        ...element
                    },
                    content: sitecontent
                })
            } catch (error) {
                console.log(error)
            }

        }
        return res.json(allcontent)
    })()
})

app.get('/channels', (req, res) => {
    const data = db.get("channels").value()
    return res.json(data)
})

app.post('/channels/new', (req, res) => {
    const channel = req.body
    console.log(channel.id)

    if (channel.id) {


        db.get('channels')
            .find({
                id: channel.id
            })
            .assign({
                ...channel
            })
            .write()


    } else {

        db.get("channels").push({
            ...channel,
            id: nanoid()
        }).write()
        res.json({
            success: true
        })

    }
})

// app.post('/channels/delete', (req, res) => {
//     const channel = req.body
//     console.log(channel.id)

//     if (channel.id) {


//         db.get('channels')
//             .find({
//                 id: channel.id
//             })
//             .assign({
//                 ...channel
//             })
//             .write()


//     }
// })

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`)
})