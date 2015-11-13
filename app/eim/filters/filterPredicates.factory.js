import _ from 'lodash';

function filterPredicateFactory() {
	return function findPredicate(p){
		if(!!p){
			if(typeof p !== 'function'){
				if(p === 'in')
					p = _.intersection;
			}
		} else {
			// use default predicate of membership(p === 'in').
			p = _.intersection;
		}
		return p;
	}
}

export default filterPredicateFactory;