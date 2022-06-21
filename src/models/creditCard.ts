import { DataTypes } from 'sequelize'
import { sequelize } from '../database/indexDatabase'
export const CreditCard = sequelize.define("credit_card", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    card_number: {
        type: DataTypes.STRING,
    },
    provider: {
        type: DataTypes.STRING
    },
    cvv: {
        type: DataTypes.STRING,
    },
    pin: {
        type: DataTypes.INTEGER,
    },
    date:{
        type:DataTypes.STRING
    },
    user_id:{
        type:DataTypes.INTEGER
    },
})

