class FavoritosDAOstub{
    #favoritos=[]

    constructor(){
        if(typeof FavoritosDAOstub.instance==='object')
            return FavoritosDAOstub.instance;
        
        FavoritosDAOstub.instance=this;
    }

    /**
	 * 
	 * @param {[{id_pelicula, id_usuario}]} data 
	 */
    
    setDAOData(data){
        this.#favoritos=data;
    }

    async addFavByUser(user,peli){
        return this.#favoritos.filter(f=>f.id_usuario==user && f.id_pelicula==peli);
    }


}

module.exports = FavoritosDAOstub;