import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import {PostController, UserController, CommentController}  from './controllers/index.js'
import "dotenv/config";
import { handleValidationErrors, checkAuth } from './utils/index.js'

mongoose.connect(
    process.env.DB_MONGO
    ).then(() => console.log('DB OK'))
     .catch((err) => console.log('DB err: ', err))

const app = express()
 
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },   
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
}) 
  
const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.get('/posts', PostController.getAll)
app.get('/tags', PostController.getLastTags)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
    '/posts/:id', 
    checkAuth, 
    postCreateValidation, 
    handleValidationErrors, 
    PostController.update
    )
app.get('/', (req, res) => {
  res.send('Бекенд работает! 🚀');
});
app.post('/comments', checkAuth, handleValidationErrors, CommentController.createComment)
app.get('/comments',  handleValidationErrors, CommentController.getComment)

app.listen(process.env.PORT || 4444, (err) => {
    if(err){
        return console.log(err);
    }
    console.log('Server OK')
})
