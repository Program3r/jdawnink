if (Meteor.isClient) {
        Handlebars.registerHelper('page', function(defaultTemplate, containerId) {
            if(Session.get('page') == undefined){
                Session.set('page', defaultTemplate);
            }
            var page = Meteor.render(function(){
                return Template[Session.get('page')]();
            })

        });
}