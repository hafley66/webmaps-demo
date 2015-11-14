import _ from 'lodash';

function StateService() {
	this.states = [];
	this.add = [].push.bind(this.states);
}

export default StateService;