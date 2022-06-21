import { DataTypes } from 'sequelize'
import {sequelize} from '../database/indexDatabase'
import { CreditCard } from './creditCard'
export const User = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING
    },
    telephone:{
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING
    },
    second_name:{
        type:DataTypes.STRING
    },
    surname:{
        type:DataTypes.STRING
    },
    second_surname:{
        type:DataTypes.STRING
    },
    birth:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.STRING
    },
    assigned_analyst:{
        type:DataTypes.STRING
    },
})

User.hasOne(CreditCard,{
    foreignKey:"user_id",
    sourceKey:"id"
})

CreditCard.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"id"
})
