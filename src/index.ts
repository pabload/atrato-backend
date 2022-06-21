import { App } from "./app"
import { sequelize } from "./database/indexDatabase";
import "./models/user.ts"
import "./models/creditCard"
const main = async()=>{
    try {
        await sequelize.sync({force:true});
        const app = new App();
        await app.listen();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();