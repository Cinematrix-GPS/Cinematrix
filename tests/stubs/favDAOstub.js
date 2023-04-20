class FavoritosDAOstub{
    #favoritos=[]

    constructor(){
        if(typeof FavoritosDAOstub.instance==='object')
            return FavoritosDAOstub.instance;
        
        FavoritosDAOstub.instance=this;
    }

    setDAOData(data){
        this.#favoritos=data;
    }

    async addFavByUser(user,peli){
        return this.#favoritos.some(f=>f.id_usuario===user && f.id_pelicula===peli);
    }


}

module.exports = FavoritosDAOstub;