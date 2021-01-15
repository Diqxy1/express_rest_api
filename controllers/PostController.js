const Post = require('../models/Post');

class PostController {
    /* 
    * GET /api/posts 
    */
    async list(request, response) {
        try{
            const post = await Post.findById(request.params.id);
            if(!post) throw Error('Item not found');
            return response.status(200).json(post);
        }
        catch(err) {
            return response.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    /**
     * GET /api/posts
     */
    async list_all(request, response) {
        try{
            const post = await Post.find();
            if(!post) throw Error('No items');
            return response.status(200).json(post);
        }
        catch(err){
            return response.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    /*
     * POST /api/posts 
     */
    async create(request, response) {
        const newPost = new Post(request.body);

        try{
            const post = await newPost.save()
            if(!post) throw Error('Something went wrong while saveing the post');
    
            return response.status(200).json(post);
        }
        catch (err){
            return response.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    /* 
    * DELETE /api/posts
    */
    async delete(request, response) {
        try {
            const post = await Post.findByIdAndDelete(request.params.id)
            if(!post) throw Error('No post found');
            return response.status(200).json({ success: true })
        }
        catch(err) {
            return response.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    /* 
    * UPDATE /api/posts
    */
    async update(request, response) {
        try{
            const post = await Post.findByIdAndUpdate(request.params.id, request.body);
            if(!post) throw Error('Something went wrong while updating the post!')
            return response.status(200).json({ success: true });
        }
        catch(err) {
            return response.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}

module.exports = new PostController();