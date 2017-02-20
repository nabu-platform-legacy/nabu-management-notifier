application.services.router.register({
	alias: "notifierList",
	enter: function() {
		return new application.views.NotifierList();
	},
	url: "/notifier"
});