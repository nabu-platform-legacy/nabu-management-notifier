application.configuration.modules.push(function($services) {
	$services.manager.menu({
		title: "Notifier",
		actions: [{
			title: "View",
			handler: function() {
				$services.router.route("notifierList");
			}
		}]
	});
	$services.router.register({
		alias: "notifierList",
		enter: function() {
			return new application.views.NotifierList();
		},
		url: "/notifier"
	});
});