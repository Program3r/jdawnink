Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home'
  });
  this.route('about', {
    path: '/about'
  });
  this.route('contact', {
    path: '/contact'
  });
});