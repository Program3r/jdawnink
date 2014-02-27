if (Meteor.isClient) {


    jsonFlickrFeed = function (json) {
        var filtereditems = [];
        for (i = 0; i < json.items.length; i++) {
            var desc = json.items[i].description
            var photo = json.items[i].media.m.replace('_m', '_b');
            var jdesc = $('<div></div>');
            var stamp = new Date().getTime();

            jdesc.append(desc);
            $(jdesc.find('p')[0]).remove();
            $(jdesc.find('p')[1]).remove();
            jdesc.find('a').parent().append(jdesc.find("img"));
            jdesc.find('a').remove();
            $('.image-container').isotope('reLayout');
            //jdesc.find('img').attr('width', '').attr('height', '').attr('onload', 'Meteor.call("reLayout")');
            filtereditems.push({
                src: photo,
                desc: jdesc.html()
            });
        }
        Session.set('photos', filtereditems);

    }


    Template.image.srcM = function(){
        return this.src.replace('_b', '_n');
    }
    Template.image.id = function(){
        return this.src.substring(this.src.lastIndexOf("/")+1, this.src.lastIndexOf("."));
    }
    Template.imageDisplay.images = function () {
        return Session.get('photos');
    }

    Meteor.methods({
        'reLayout': function () {
            $('.image-container').isotope('reLayout');
        }
    })

    Meteor.startup(function () {


        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?id=117221625@N07&format=json';
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {},
            error: function (e) {}
        });

    });

    Template.imageDisplay.rendered = function () {
            this.rendered = true;
            $('.image-container').isotope({
                itemSelector: '.profile-image',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 1
                }
            });
    }

    Template.image.rendered = function () {

    }
}