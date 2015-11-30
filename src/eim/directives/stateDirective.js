function StateDirective(stateService) {
	return {
		scope: {
			value: '@',
			displayName: '@toString',
			icon: "@"
		}, 
		link: function(scope, tElem, attr) {
			stateService.addState({
				val: scope.value,
				icon: scope.icon,
				displayName: scope.displayName 
			});


		}
	};
}
var stateDirectiveInline = ['eim.states', StateDirective];
export default stateDirectiveInline;

