'use strict';

const BaseDAO = require('./baseDAO');
const qComment = require('./queryComment');

class CommentDAO extends BaseDAO {
    async getCommentaries(id){
        return this.query(qComment.getCommentaries, [id]);
    }
	

    // async getActorsById(id){
    //     return this.query(qFilms.qGetFilmById, [id]);
    // }
}

module.exports = CommentDAO;