import { createConnection , getManager, getConnection } from "typeorm";
import "reflect-metadata";

import express, {NextFunction, Request, Response} from "express";
import http from "http";
import bodyParser from "body-parser";
import {WorkItem} from "./entity/workItems";
import { nextTick } from "process";

createConnection();

const app = express();
const router = express.Router();

app.get("/",(req, res)=>{
    res.json({promote: "hello world"});
});
// query
app.get("/list", async (req, res,next)=>{
    const workItemRepository = getManager().getRepository(WorkItem);
    try{
        const workItems = await workItemRepository.find({order:{
            createAt:"DESC"
        }});
        res.json(workItems);
    }catch (error) {
        next(error);
    }

});

// create
app.post("", async (req,res,next) => {
    const workItem = new WorkItem();
    workItem.text = req.body.text;
    const workItemRepository = getManager().getRepository(WorkItem);
    try{
        res.json(await workItemRepository.save(workItem));
    }catch(error) {
        next(error);
    }
})
// update
app.put("/:id", async (req, res, next) => {
    const body = req.body;
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        await workItemRepository.update(req.params.id,{
            isChecked: body.isChecked
        });
        res.sendStatus(204);
    } catch(error) {
        next(error);
    }
});

// delete
app.delete("/:id", async (req, res,next) =>  {
    const workItemRepository = getManager().getRepository(WorkItem);
    try{
        await workItemRepository.delete(req.params.id);
        res.sendStatus(204);
    }catch(error) {
        next(error);
    }
});
app.use("/work-items", router);
app.use(bodyParser.json());

const server = http.createServer(app);
app.listen(3001);