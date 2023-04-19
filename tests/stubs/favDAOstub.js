class FavDAOStub{
    #peliculas=[]
    #usuarios=[]

    constructor(){
        if(typeof FavDAOStub.instance==='object')
            return FavDAOStub.instance;
        
        FavDAOStub.instance=this;
    }


    async addFavByUser(peli,user){
        
    }





}