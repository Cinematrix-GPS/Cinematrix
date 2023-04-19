class FavoritosDAOstub{
    #favoritos=[]

    constructor(){
        if(typeof FavoritosDAOStub.instance==='object')
            return FavoritosDAOStub.instance;
        
        FavDAOStub.instance=this;
    }

    setDAOData(data){
        this.#favoritos=data;
    }

    async addFavByUser(user,peli){
        return this.#favoritos.filter(f=>f.id_usuario==user && f.id_pelicula==peli);
    }


}

module.exports = FavoritosDAOstub;