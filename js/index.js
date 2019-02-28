(function(){
  
  var demo = {
    
    defaultOptions: {
      $container: $('.container-masonry'),
      $template: $('#item-template'),
      gutter: 20,
      imgWidth: 236,
      itemSelector: '.item',
      count: 20,
    },
    
    options: {},

    data: data,
    
    items: [],
    
    init: function(options) {
      var self = this;
      self.options = $.extend({}, self.defaultOptions, options);
      console.log(self.data);
      self.getData(self.data, function(){
        var $container = self.options.$container;
        var html = self.generateHtml(self.options.$template, self.items);
        $container.append(html);
        self.startMasonry($container);
        self.loadImageMasonry($container);
      });
    },
    
    getData: function(data, callback) {
      for (var i = 0; i < data.length; i++) {
        // var imageHeight = this.getRandomIntInclusive(10, 45) * 10;
        this.items.push({
          image: 'images/' + data[i].id.toString() + '.jpg',
          title: data[i].title,
          source: data[i].desc,
          pinCount: "$ " + data[i].price.toString(),
        });
      }
      if (callback) callback();
    },
    
    generateHtml: function($selector, items) {
      var source   = $selector.html();
      var template = Handlebars.compile(source);
      return template({items: items});
    },
    
    startMasonry: function($container) {
      $container.masonry({
        itemSelector: this.options.itemSelector,
        columnWidth: this.options.itemWidth +  this.options.gutter,
        fitWidth: true,
      });
    },
    
    loadImageMasonry: function($container) {
      $container.imagesLoaded().progress(function() {
        $container.masonry('layout');
      });
    },
    
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    loadJSON: function (file, callback) {   

      var xobj = new XMLHttpRequest();
          xobj.overrideMimeType("application/json");
      xobj.open('GET', file, true);
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);  
   }

  };
  
  demo.init();
  
})();