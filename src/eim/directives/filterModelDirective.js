import eim from 'eim/events';

function FilterModelDirective($rootScope, filterService) {
	return {
		restrict: "A",
		link: function(s,e,a){
			e.bind('click', function(){
				$rootScope.$emit(eim.filterChanged, {});
			});
		}
	}
}

var $inline = ['$rootScope', 'eim.filters', FilterModelDirective];
export default $inline;