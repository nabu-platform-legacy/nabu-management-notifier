application.initialize.modules.push(function() {
	application.services.vue.menu.push({
		title: "Notifier",
		children: [{
			title: "View",
			handle: function() {
				application.services.router.route("notifierList");
			}
		}]
	});
});