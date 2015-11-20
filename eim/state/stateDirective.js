function StateDirective(mapManager) {
	return {
		// require: "eimMap",
		link: function(scope, tElem, attr) {
			// TODO: allow for transcluded content or template for this node.
			mapManager.map.addState({
				key : attr.key,
				val: attr.val, 
				icon: {
					url: attr.iconUrl,
					node: tElem // TODO: Place transcluded content/domnode here.
				}
			});
		}
	};
}
var stateDirectiveInline = ['eim.mapper', StateDirective];
export default stateDirectiveInline;

