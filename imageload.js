if(Meteor.isClient){
    jsonFlickrFeed = function(json){
        var filtereditems=[];
        for (i=0;i<json.items.length;i++){
            var desc = json.items[i].description
            var photo = json.items[i].media.m.replace('_m','_b');
            var jdesc = $('<div></div>');
            var stamp = new Date().getTime();

            jdesc.append(desc);
            $(jdesc.find('p')[0]).remove();
            $(jdesc.find('p')[1]).remove();
            jdesc.find('img').attr('src',jdesc.find('img').attr('src').replace('_m','_n')+'?_='+stamp);
            jdesc.find('img').attr('width','').attr('height','').attr('onload','javascript:reload();');
            filtereditems.push({src:photo,desc:jdesc.html()});
        }
        Session.set('photos',filtereditems);
    }
    setTimeout(function(){
      $('.image-container').isotope('reLayout');
    },2000)
    Template.imageDisplay.images = function(){
        return Session.get('photos');
$('.image-container').isotope( 'reLayout');
    }



    Meteor.startup(function() {
            var url = 'http://api.flickr.com/services/feeds/photos_public.gne?id=117221625@N07&format=json';
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                },
                error: function(e) {
                }
            });
    });

    Template.imageDisplay.rendered = function(){
                $('.image-container').isotope({
                  itemSelector : '.profile-image',
                  layoutMode : 'masonry',
                  masonry: {
                    columnWidth:1
                  }
                });
    }

    Template.image.rendered = function(){

    }
}