import { Sequelize } from "sequelize";
export  const sequelize = new Sequelize('atratodb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});