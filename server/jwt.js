// Importing modules
const Users = require("./users.json");
// Import Express
const express = require("express");
// Import jsonwebtoken for JWT
const jwt = require("jsonwebtoken");
// Import dotenv to read .env file
require("dotenv").config();

const app = express();
app.use(express.json());

// Handling post request
app.post("/login", (req, res, next) => {
    let { email, password } = req.body;
    let existingUser = Users.find(u => u.email == email && u.password == password)
    if (!existingUser) {
        const error = Error("Wrong details please check at once");
        res.status(401).json({
            success: false,
            error: error.message
        })
    } else {
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                { userId: existingUser.id, email: existingUser.email },
                process.env.SECRET,
                { expiresIn: "1h" }
            );
        } catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
    }
});

// Handling post request
app.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = {
        id: 3,
        name,
        email,
        password,
    };
    console.log(newUser)
    try {
        // Business logic to insert new user into DB
        // Assuming, it was successful insertion
    } catch {
        const error = new Error("Error! Something went wrong.");
        next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new Error("Error! Something went wrong.");
        next(error);
    }

    res
        .status(201)
        .json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token
            },
        });
});


app.get('/accessResource', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    //Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(200).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }
    //Decoding the token
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (decodedToken) {
            res.status(200).json({
                success: true,
                data: {
                    userId: decodedToken.userId,
                    email: decodedToken.email
                }
            });
        } else {
            res.status(401).json({
                success: false,
                error: err.message
            });
        }
    });
})

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    //Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(200).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }
    //Decoding the token
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.token = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
}

app.get('/accessResource2', auth, (req, res) => {
    var decodedToken = req.token
    res.status(200).json({
        success: true,
        data: {
            userId: decodedToken.userId,
            email: decodedToken.email
        }
    });
})

app.listen(process.env.PORT || 3000, () => console.log('server is running!'))
