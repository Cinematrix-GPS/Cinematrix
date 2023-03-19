class ResponseStub{

	constructor(){
		this.send = jest.fn();
		this.json = jest.fn();
		this.render = jest.fn();
	}
}

module.exports = ResponseStub;