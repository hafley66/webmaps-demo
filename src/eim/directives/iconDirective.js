function IconDirective(mapManager) {
	return {
		link: function(scope, tElem, attr) {
			mapManager._getMap.then(function(map) {
				map.addIcon({
					key: attr.key,
					url: attr.url,
					node: tElem 
				});
			});
		}
	};
}
var $inline = ['eim.mapper', IconDirective];
export default $inline;

