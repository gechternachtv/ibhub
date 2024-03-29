import express from "express";
import cors from "cors";
import jsdom from "jsdom";
import RSS from "rss";
import { nanoid } from 'nanoid'
import PocketBase from 'pocketbase';

import dotenv from "dotenv";
dotenv.config();


console.log("port:",process.env.PORT);
console.log("pocketbase at:",process.env.POCKETBASE);
console.log("host at:",process.env.IBHUB);
console.log("email:", process.env.EMAIL)

const pb = new PocketBase(process.env.POCKETBASE);
await pb.admins.authWithPassword(process.env.EMAIL, process.env.PASSWORD);

console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore.model.id);


const returnDomList = (sitecontent, observeName, contains) => {
    const dom = new jsdom.JSDOM(sitecontent);
    const rawobservedItems = Array.from(dom.window.document.querySelectorAll(observeName));
    return (contains.length > 0) ? rawobservedItems.filter((item) => contains.some(x => item.innerHTML?.includes(x))) : rawobservedItems;
};
const updatePages = async (user, host = "") => {
    const pageResult = await pb.collection("channel").getList( 1, 50, {
        filter: `user = "${user}"`,
    });
    console.log("host-:",host)
    const channels = pageResult.items.filter(singlePage => singlePage.host.includes(host));
    console.log(channels.map(e => e.name))

    await Promise.all(channels.map(async (singlePage) => {

        console.log(singlePage.name)
        if(!singlePage.dead){
            const request = await (fetch(singlePage.link));
            if (request.ok) {
                //-----html
                if(request.headers.get('content-type')?.includes('text/html') || request.headers.get('content-type')?.includes('text/xml')){
                    const isRss = request.headers.get('content-type')?.includes('text/xml')
                    const sitecontent = await request.text();
                    const observedItems = returnDomList(sitecontent, singlePage.observeName === "" ? (isRss ? "item" : "body") : singlePage.observeName, singlePage.contains);
                    const lastPost = isRss ? observedItems[0] : (singlePage.newestOnTop ? observedItems[0] : observedItems[observedItems.length - 1]);
                    if (singlePage.updates != observedItems.length || lastPost.textContent != singlePage.laspost) {
                        const postid = nanoid().substring(0, 15);
                        //updatelastposthere
                        const channelupdate = await pb.collection("channel").update(singlePage.id, {
                            laspost: lastPost.textContent,
                            dead: (observedItems.length === 0),
                            updates: observedItems.length
                        });
                        //createnews
                        const feedcreate = await pb.collection("feeditem").create( {
                            title: `${(observedItems.length === 0) ? `[target selector count is 0]` : `[page update]`} ${singlePage.name}`,
                            content: (observedItems.length === 0) ? `Check if the target selector is right or if the page is still up` : lastPost.textContent,
                            channel: singlePage.id,
                            id: postid,
                            user: user
                        });
                        const newscreate = await pb.collection("news").create({
                            channel: singlePage.id,
                            feeds: postid,
                            user: user
                        });
        
                        console.log(channelupdate,feedcreate,newscreate)
                    }
                }else if(request.headers.get('content-type')?.includes('application/json') && singlePage.contains.length > 0){
                //-----json (with key)
                    const foo = await request.json();

                    function strval(str) {
                        const keys = str.split(/[\.\[\]'"]/).filter(e => e);
                        let ret = foo;
                        
                        try {
                          keys.forEach(key => {
                            console.log(key)
                            if(key === "lastchild"){
                              ret = ret[ret.length - 1];
                            }else if(key === "totext"){
                              ret = JSON.stringify(ret)
                            }else{
                              ret = ret[key];
                            }
                          });
                          return ret;
                        } catch(e) {
                          return undefined;
                        }
                      }


                        const jsonupdates = singlePage.contains.map(item => {
                            return `${item}:${String(strval(item))}`
                        }).join("\n")
                        console.log(jsonupdates)

                        if(jsonupdates != singlePage.laspost){
                            const postid = nanoid().substring(0, 15);
                            //updatelastposthere
                            const channelupdate = await pb.collection("channel").update(singlePage.id, {
                                laspost: jsonupdates,
                                dead: false,
                                updates: 1
                            });
                            //createnews
                            const feedcreate = await pb.collection("feeditem").create({
                                title: `${singlePage.name}(application/json) key update`,
                                content: jsonupdates,
                                channel: singlePage.id,
                                id: postid,
                                user: user
                            });
                            const newscreate = await pb.collection("news").create({
                                channel: singlePage.id,
                                feeds: postid,
                                user: user
                            });
                        }

                    
                }else if(request.headers.get('content-type')?.includes('text/plain') || request.headers.get('content-type')?.includes('application/json')){
                //-----plain text and json (without key)
                    const textcontent = await request.text();
                    if (textcontent.replaceAll(/[^a-zA-Z0-9+-; ^\n\r]/g, '') != singlePage.laspost) {
                        const postid = nanoid().substring(0, 15);
                        //updatelastposthere
                        const channelupdate = await pb.collection("channel").update( singlePage.id, {
                            laspost: textcontent.replaceAll(/[^a-zA-Z0-9+-; ^\n\r]/g, ''),
                            dead: false,
                            updates: 1
                        });
                        //createnews
                        const feedcreate = await pb.collection("feeditem").create( {
                            title: `${singlePage.name}(text/plain) update`,
                            content: textcontent.replaceAll(/[^a-zA-Z0-9+-; ^\n\r]/g, ''),
                            channel: singlePage.id,
                            id: postid,
                            user: user
                        });
                        const newscreate = await pb.collection("news").create({
                            channel: singlePage.id,
                            feeds: postid,
                            user: user
                        });
                    } 
                }

            }
        }
    }));
};
//endpoints:
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/getrsslink/:user', (req, res) => {
    try {
        res.send({rss:`${process.env.IBHUB}/rss/${req.params.user}`});
    }
    catch (error) {
        console.log("error",error)
        res.status(400).send({ error: true, message: error });
    }
  });
app.use('/', express.static('frontend/public'));

app.get('/rss/:user', async (req, res) => {
    const host = req.query.host
    console.log("host:",host ? host : "")
    res.header("Content-Type", "application/xml");
    await updatePages(req.params.user, host ? host : "");
    const rssfeed = new RSS({
        title: `ibhub ${host ? ` - ${host}` : "" }`,
        description: 'get your pages updates on rss!',
        feed_url: `${process.env.IBHUB}/rss/${req.params.user}`,
        site_url: `${process.env.IBHUB}`,
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAACzCAYAAADCFC3zAAAM8klEQVR4nO2de0wVyx3HzwEEVOAK+AB8QAxHEWxBxRRMbYX2gjdCbURFLJggPsAXGquNWPlDBOOjEdqqiI+bUPVeFY0VDCCKjxo1EcUXFg7GXq2IFh+AtCKoND/L3G6PFDyPPXv8ne8nmTizZ3fmt7Nf1pnZmd+oOzo6VABwwEZpAwAwFRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRYjZnt7+zY7O7u3ImRlZaUpbRP4D1VVVQHSZ0OhsLAwWmm7dLFT2gDB+/fvbd69e2crTStrEZAifTZER0eHWjlrugaCAWyAmAEbIGbABogZsEGt1D6AO3fuTDl+/PgvRbqsrOxLaafC19f33vDhw+9TPC8vb4G3t/cDRQy1UlatWrXl1q1bP6R4S0uL06VLlyZIfx8zZkzlgAEDGmxsbN4XFxd/pZihEhQbzaiurvY7depUhEhTxVHFUPzQoUOxGRkZ6+7du+er6qxMpey0VioqKoLPnTs3SdX5Yrlz585o8Rs9G3pGFLe1tX2npJ1SLGZozt/f/66oGE9Pz3ql7QH/xcHB4U1AQECVSLu5ub1Q1qKuQZsZsAFiBmyAmAEbzNpmfvjw4TDRcbh27dq4T71u3759cz08PJ64urq+nDdv3h5ZjbRi6JmUl5eHqzqf1adcQ9MOtmzZsoriI0aM0E6dOvXPctv5/zDr0NzZs2fDwsPDy0U6MTHx68DAwJsUX7Zs2e/VavUHY27fvv0DUam5ubnJNPJBcY1GU6vVakeYzWArIycnJ3X58uXZIr127dpMGn5zd3d/Hh8fv18cp+cohu3S09PXNzc3u1A8JibmaEFBwXSFzP8wYcRsoby8PIyKFKGgoCCmp2siIiJKxfkajUZrTnutLWRnZ6dKn49Wq9X0dI2Hh0e9OD8mJqZASfvRZgZsgJgBGyBmwAaIGbABYgZsgJgBGyBmwAbZvwCuW7cu4/Hjx14Ur6+v9zQmr6dPnw5KSkraKz2WkpKyMzg4uMJYO60R+no3f/783SJNq7CNyY++IOo+n8zMzLX09daYfD8V2b8A0tTBu3fv+os0fQFcvXr1ZooHBQXdGDRo0NPurqd5tc+fP3eneF1d3WDdyjpy5MiM6dOnF8h3B3x5+/atXa9evdqlx6h+Z8yYcYTiEydO/EufPn3+1V0e9DWwra3NnuIXL1788YYNG34r/b2mpmYkfeaW5w7+F7PPZ/by8nocGRlZ+qnnS9+6tbW1GtkMAx8YOXJkjT7PJyws7KyIK72IAm1mwAaIGbABYgZsMHmbmdq11GkT6aampi9MXYYU6nS0t7f3ovisWbO+FdNIQddcvXp1vFgorOtySw6KioqiaE2ni4tL85QpU07KWZbJRzN27NixaPHixdulx5YuXfoHWhRJ8bFjx16Pi4v7xpC8nz171n/Tpk2/EWma83z9+vWxIk2iJqd+xt0Bb5KTk3N37dq1UKRJZAsWLMgTaRLcpEmTzhmSN81Dz8/PnyPShw8fnikm+dOCZWOH/nrE1HNKt2/fvkg6J5ZCY2PjF3LMX01NTc2WltPe3m6n9JxgSw8LFy7MldaZt7f3d3KVFRYWVi7K8ff3r5L73tBmBmyAmAEbIGbABogZsMEkQ3M0iiB6qo8ePRpiijwN4caNG0E0mkE9dOF0EahUtHr6/v37wyku5rmYm9bWVkd6PhSn+ThyuGAziZgbGhr6k1dIkabv++Rs7/tCZBouo+EeMXZJw3Tjx4+/SvGoqKjCwsLCX8hR5ufI5cuXQydPnlwi0lRPAwcO/AfFxb9yEBIScoUmKtGEptLS0kihkbS0tCyaTWfyAk0xJNI5xfP74Z7MzMw0cw850RCTKD8qKuqE0kNglhRKSkoipc/nxIkTUeYsn4ZmpeWnpaVlylGOSdrMHQr5eAZACjqAgA0QM2ADxAzYYJKJRrSW7OXLl64iTT3Y3r17vzY6Yz2g8sVGmLTbq7Oz8ytzlm/J0NCpcG5IUN1QHZmrfNqr5sWLF24iTdroaTmWISi2QQ8ApgbNDMAGi9mgx9w8ePDAmz4mKG2HqQkNDb1srdvMWa2YaV+72bNnH1TaDlNz8ODB2dYqZjQzABsgZsAGqx3NaGhoGEDedpS2w9TQJC/ah0RpO5TAasUM+IFmBmADxAzYADEDNkDMgA0GfzShbYOrq6tHUdzJyenVypUrf2dSyxQgOzt7eVNTUz/d49HR0SfIE5MyVlkeJ0+enFJRUTFe9/ioUaPuzpw587A+ee3evXt+XV2dl1qtVlPaz8/vr7GxsYcMMszQJSrTpk07KpbBeHl51Sm9NMgUwcfH52+63pgo7NmzJ0lp2ywppKSk7OiqngzZoTU4OPiqNA/SlaF2oZkB2KCXmMmjI23dQOHMmTM/k88s+SkuLv5K3IsIYu8VU3Ls2LFpuuVI536bA5qHIi3/woULP5GjnNOnT/9c915pQpc+eZCuxLWkN32u1avNTA/h5s2bgSJdUlIyedy4cddsbGze65OPJdDY2NhPei+qzg1mhg0b9lD3XCcnpxZDyyE/FbrlmMOVrJRXr145S21oampy6f6K7tm8efPq9evXp+seLywsjJ47d+4+6bE3b944dJdXWVnZl+SKQNVZ/+QSQdiq7x+9UbPm+vXr19i/f/9nxuRhSbi5ub3gdD9yQX/cXf2Bk/MdffMiDXUVN4QexUxzfsWbRKvVjjCmMAD0gfRGzuQpbmtr+47mand3fo9ipte+WD/m4+PznXTYxN3d/blpzDY/1JzQHQLq27fvP5Wz6PNnyJAhj3TrVJ+1mKQn6fX79++PF1ux0Vu/x10YehrucHFxaRLDJgkJCflKDwt9biEvL2++7hAWuTMzpw1KezQyNJDehM2kw57Ox9AcYAPEDNgAMQM2QMyADR+JOT09fT15nBGBfCtTL5OCMR8PrBVHR8dWUX8UqD6p1y/qNyEh4U9ylBsQEFAlyoiJiTkqtcHe3r79E7JQHNKbsJk+/Eh1STr96ALdHuGaNWuypD1f+lqkdK+WUwgMDLwhrd/Y2Nhv5SjH19e3VpQRGRlZovR9GxucnZ2bpfVGOtU9B80MwAardQJjKdBeI3v37k0ydb5SR4nWAsSsMLSXNQWl7eAAmhmADRAzYAOaGWaG1k6+fv26N8UrKyvHSOf/bty4cY10izN92bZt24r8/Pw5Ik0zHmlo0Focr0PMZobcZ4l4S0uLk/Q3mpVIKywMzVt3T7/AwMCb5t7BQEnQzABsgJgBGyBmwAaIGbABHUAL4sCBA7+iFcqqzpENmpTU3fm0ejkrKytNpM+fP/9Tc9hpqUDMCkIjG7QHiapTyOQnQviKyMjIWNeTmGlN3NatW38tPbZkyZI/Tpgw4ZKqcz9Eee/AsoCYFYQ83MfFxX2j6vQZQT7cjM2ThCzytDbQZgZsgJgBGyBmwAa0mS0E6gxGRkaWijQ5EBQdwMGDB9eNHj36jviNHCHSMiKasyy9hvD09Kw3s+mWg+7SEyybsozg6Oj4WjyDpKSkPdLfgoKCKuk4+ZNW2k5zBSybAlYFxAzY8FGbec6cOfmhoaGXRDoxMfHrtra2XhQPDw8/u2LFim3mNhJYJzQ/u7y8PIziarWafORFi980Gs093fM/ErOfn181BZGOj48/IBZHurq6GuU/FwB9oMULRUVFHwRMXkCjo6OLujsfzQzABgzNWShDhw79e1tbmz3FHRwc3kj3BiEPP97e3g9oyE5RIy0MiNlCke5SQH41aEmVSNN/v8Ysr+IKmhmADT2+mVNSUna2trY6qjod2eXk5KSK38hlv4eHxxO5jQTWwZMnTzxo9bpI01YdqampOapOB5Q9ZqDPV5j8/PwE6VeYK1eu/EjpL0PWEGiHWGm9V1ZWBiltkxyB9CS9T9KbPtejmQHYYFQHcNGiRTto/I961wUFBdNNZxawFpKTk3NrampGqkzh7FGf13hzc7OzVqvVUIiIiCjlthG8pQaa7CXqnUJra6uD0jaZKuhuBE+6EvdJetMnL73ezOTmSbh6ghd980H/+xmy++nnCOlKo9HUGnIt2syADQa3mcmPmfCV9jnv1AqUJSQk5ArtWS7SpCtD81JTWwMADqCZAdgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADRAzYAPEDNgAMQM2QMyADf8Glj6jv2IN9BwAAAAASUVORK5CYII="
    });

    const pageResult = await pb.collection("feeditem").getList( 1, 50, {
        filter: `user = "${req.params.user}"`,
        expand: "channel",
        sort: '-created'
    });
    const channels = pageResult.items/*.filter(feedItem => feedItem["expand"]?.channel?.host.includes(host ? host : "" ))*/;
    console.log("channels:",channels)
    channels.forEach(item => {
        rssfeed.item({
            title: item.title,
            description: `
                <h1>${item.title}</h1>
                <p>${item.content.replaceAll("\n","<br/>")}</p>
                <img src="${item["expand"]?.channel?.thumb}"/>
                <p><a href="${item["expand"]?.channel?.link}">${item["expand"]?.channel?.link}</a></p>
                <br/>
                <br/>
                <p><a href="${process.env.IBHUB}/#/new?id=${item["expand"]?.channel?.id}">
                <img style="width:62px" src="data:image/png;base64,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"/>ibhub</a></p>
                `,
            guid: item.postid,
            url: `${item.postid}-${item.created}`,
            date: new Date(item.created)
        });
    });
    res.send(rssfeed.xml());
});
app.post('/api/getnewsupdates', async (req, res) => {
    try {
        console.log("server host res:", req.body.host)
        await updatePages(req.body.user, req.body.host);
        res.send({ error: false });
    }
    catch (error) {
        console.log("error",error)
        res.status(400).send({ error: true, message: error });
    }
});
app.post('/api/trymeta', async (req, res) => {
    try {
        const sitecontent = await fetch(req.body.link);
        if (sitecontent.ok) {
            const text = await sitecontent.text();
            const dom = new jsdom.JSDOM(text);
            const thumb = dom.window.document.querySelector(`meta[property="og:image"]`);
            const name = dom.window.document.querySelector(`meta[property="og:title"]`);
            const meta = {
                thumb: thumb ? thumb.getAttribute("content") : "",
                name: name ? name.getAttribute("content") : ""
            };
            res.send(meta);
        }
        else {
            res.status(404).send({ error: true });
        }
    }
    catch (error) {
        console.log("error",error)
        res.status(404).send({ error: true });
    }
});
app.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
});
