const Users = require("./studentModel")
const bcrypt = require("bcrypt")

const getusers = async (req, res) => {
    const user = await Users.find()
    res.send({ user })
}

const updateuser = async (req, res) => {
    const name = req.params.name;
    let user = await Users.findOneAndUpdate({ name: name }, req.body, { new: true })
    res.send({ user })
}

const register = async (req, res) => {
    try {
        const { name, age, email, phone_no, password } = req.body
        const hashedpassword = await bcrypt.hash(password, 10);
        const users = await Users.findOne({ email: email })
        if (users) {
           return res.send({ msg: "Already this email is used" })
        }

        const details = await Users.create({
            name,
            age,
            email,
            phone_no,
            password: hashedpassword
        })
        res.send({ msg: "Registered Successfully", details })

    }
    catch (err) {
        console.log(err)
        res.send({ msg: "Internal server error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await Users.findOne({ email: email })
        if (!users) {
            res.status(404).send({ msg: "User not found" })
        }
        const verify = await bcrypt.compare(password,users.password)
        if (verify) {
            res.status(200).send({ msg: "Login successfully" })
        }
        else {
            res.status(404).send({ msg: "Invalid password" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "Internal server error" })
    }
}

const deleteuser = async (req, res) => {
    const name = req.params.name;
    let user = await Users.findOneAndDelete({ email: name }, req.body, { new: true })
    res.send({ user })
}


module.exports = {getusers, updateuser, deleteuser, loginUser, register }