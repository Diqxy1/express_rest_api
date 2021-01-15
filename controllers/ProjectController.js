class ProjectController{
    async teste(request, response) {
        response.send({ 
            ok: true,
            user: request.userId 
        });
    }
}

module.exports = new ProjectController();