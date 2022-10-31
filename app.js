// required express
const express = require('express');
// made an instance of express
const app = express();
// importing our connectdb function 
const connectDB = require('./db/connect');
// require dotenv
require('dotenv').config();
// imorting our cookie parser
const cookieParser = require('cookie-parser');
//importing our error handler middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found')

//importing our middleware for passing json files.
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//imorting our routes.
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

//created our port
const PORT = process.env.PORT || 5000;

// creating our routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

// created a start function that connects to our db and port
const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`)
    });
}

start();