const Posts = require('../models/Posts')

exports.getPosts = async (req, res) => {
  const posts = await Posts.find({})
  
  res.status(200).send(posts)
}

exports.createPost = async (req, res) => {
  // Saaksite info kätta req.body -st


  const newPost = (req.body)

  const createdPost = new Posts(newPost)

  const savedPost = await createdPost.save()

  res.status(200).send(`yay ${savedPost._id}`)
}

exports.updatePost = async (req, res) => {

}

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const Post = await Posts.findOneAndDelete({ _id: id })


  res.status(200).send(`Successfully deleted the following post: \n ${Post}`)
}