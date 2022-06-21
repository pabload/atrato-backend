import { Request, request, Response, response } from "express";
import { generateCreditCard } from "../creditcardApi/indexcreditcardApi";
import { CreditCard } from "../models/creditCard";
import { User } from '../models/user'
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        const creditCards = await CreditCard.findAll();
        const usersData = users.map((user: any) => {
            const userCreditCard: any = creditCards.find((cd: any) => cd.user_id === user.id)
            const newData = { ...user.dataValues }
            newData.card_info = userCreditCard.dataValues;
            return newData;
        })
        return res.status(200).send(usersData);
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getUsersByStatus = async (req: Request, res: Response) => {
    try {
        if (req.params) {
            const { status } = req.params;
            const usersFound = await User.findAll({
                where: {
                    status
                }
            })
            const usersData = await Promise.all(
                usersFound.map(async (user: any) => {
                    const userCreditCard: any = await CreditCard.findOne({
                        where: {
                            user_id: user.id
                        }
                    })
                    const newData = {...user.dataValues}
                    newData.card_info = userCreditCard.dataValues;
                    return newData;
                })
            )
            return res.status(200).send(usersData);
        }
        res.status(500).send({
            message: "no params passed"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}
export const getUserById = async (req: Request, res: Response) => {
    try {
        if (req.params) {
            const { id } = req.params;
            const userFound:any = await User.findOne({
                where: {
                    id
                }
            })
            const userCreditCard: any = await CreditCard.findOne({
                where: {
                    user_id: userFound.id
                }
            })
            const newData = {...userFound.dataValues}
            newData.card_info = userCreditCard.dataValues;
            return res.status(200).send([
                newData
            ]);
        }
        res.status(500).send({
            message: "no params passed"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}
export const getUserByName = async (req: Request, res: Response) => {
    try {
        if (req.params) {
            const { name } = req.params;
            const usersFound = await User.findAll({
                where: {
                    name
                }
            })
            const usersData = await Promise.all(
                usersFound.map(async (user: any) => {
                    const userCreditCard: any = await CreditCard.findOne({
                        where: {
                            user_id: user.id
                        }
                    })
                    const newData = {...user.dataValues}
                    newData.card_info = userCreditCard.dataValues;
                    return newData;
                })
            )
            return res.status(200).send(usersData);
        }
        res.status(500).send({
            message: "no params passed"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}
export const addUser = async (req: Request, res: Response) => {
    try {
        const {
            email,
            telephone,
            name,
            second_name,
            surname,
            second_surname,
            birth,
            status,
            assigned_analyst,
        } = req.body;
        const cardData: any = await generateCreditCard();
        const newUser: any = await User.create({
            email,
            telephone,
            name,
            second_name,
            surname,
            second_surname,
            birth,
            status,
            assigned_analyst
        });
        const newCreditCard: any = await CreditCard.create({
            card_number: cardData.cardNumber,
            provider: cardData.type,
            cvv: cardData.cvv,
            pin: cardData.pin,
            date: cardData.date,
            user_id: newUser.id,
        })
        console.log(newUser);
        console.log(newCreditCard);

        res.status(200).send({
            message: "new user added"
        })

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }


}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
                id
            }
        })
        await CreditCard.destroy({
            where: {
                user_id: id
            }
        })
        res.status(200).send({
            message: "user deleted"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            email,
            telephone,
            name,
            second_name,
            surname,
            second_surname,
            birth,
            status,
            assigned_analyst,
        } = req.body;
        const userFound: any = await User.findByPk(id);
        userFound.email = email;
        userFound.telephone = telephone;
        userFound.name = name;
        userFound.second_name = second_name;
        userFound.surname = surname;
        userFound.second_surname = second_surname;
        userFound.birth = birth;
        userFound.status = status;
        userFound.assigned_analyst = assigned_analyst;
        await userFound.save();
        res.status(200).send({
            message: "user updated",
            user: userFound
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}


