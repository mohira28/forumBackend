import CommentModel from '../models/Comments.js'

export const createComment = async (req, res) => {
     try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            post: req.body.postId
        })

        const post = await doc.save()

        res.json(post)
     } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        })
     }
}

export const getComment = async (req, res) => {
    try {        
       const comments = await CommentModel.find().populate('user').exec()
        res.json(comments.reverse())
    } catch (error) {
       console.log(error);
       res.status(500).json({
           message: 'Не удалось создать комментарий'
       })
    }
}