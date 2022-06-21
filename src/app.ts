import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes/indexRoute";
import bodyParser from "body-parser";
export class App {
    private app:Application;
    constructor(){
        this.app=express();
        //settings always first
        this.settings();
        this.router();
    }
    settings(){
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(
            express.urlencoded({
                extended:true,
            })
        )
        this.app.use(cors())
    }
    router(){
      this.app.use(router);
    }
    async listen(){
        await this.app.listen(process.env.PORT || 4000);
        console.log("works")
    }
}
