import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with given id');

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    if (!updatedPost) return res.status(404).send('Post not found');
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with given id');

  try {
    const post = await PostMessage.findById(_id);
    if (!post) return res.status(404).send('Post not found');
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with given id');

  try {
    const post = await PostMessage.findByIdAndRemove(_id);
    if (!post) return res.status(404).send('Post not found');
    res.status(200).json({ message: 'Post Deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with given id');

  try {
    const post = await PostMessage.findById(_id);
    if (!post) return res.status(404).send('Post not found');
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
