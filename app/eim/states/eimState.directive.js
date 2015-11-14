function StateDirective(states) {
	return {
		link: function(scope, tElem, attr) {
			// TODO: allow for transcluded content or template for this node.
			states.add({
				key : attr.key,
				val: attr.val, 
				icon: {
					url: attr.iconUrl,
					node: "" // TODO: Place transcluded content/domnode here.
				}
			});
		}
	};
}
var stateDirectiveInline = ['eim.s.states', StateDirective];
export default stateDirectiveInline;

