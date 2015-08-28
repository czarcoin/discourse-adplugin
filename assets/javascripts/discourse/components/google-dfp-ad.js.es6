import loadScript from 'discourse/lib/load-script';
//import PageTracker from 'discourse/lib/page-tracker';

var const_width = '';
var const_height = '';

var _loaded = false,
    _promise = null;

function splitWidthInt(value) {
    var str = value.substring(0, 3);
    return str.trim();
}

function splitHeightInt(value) {
    var str = value.substring(4, 7);
    return str.trim();
}

// This creates an array for the values of the custom targeting key
function valueParse(value) {
  var final = value.replace(/ /g,'');
  final = final.replace(/['"]+/g, '');
  final = final.split(',');
  return final;
}

//PageTracker.current().on('change', function(url) {
function loadGoogle(settings) {
  if (_loaded) {
    return Ember.RSVP.resolve();
  }

  if (_promise) {
    return _promise;
  }

  // The boilerplate code
  var dfpSrc = (('https:' == document.location.protocol) ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  _promise = loadScript(dfpSrc, { scriptTag: true }).then(function() {
    _loaded = true;
    if (window.googletag === undefined) {
      console.log('googletag is undefined!');
    }

    googletag.cmd.push(function() {
      if (settings.dfp_topic_list_top_code && !settings.dfp_show_topic_list_top && settings.topic_list_top_ad_sizes) {
        const_width = parseInt(splitWidthInt(settings.topic_list_top_ad_sizes));
        const_height = parseInt(splitHeightInt(settings.topic_list_top_ad_sizes));
        if (Discourse.Mobile.mobileView) {
          googletag.defineSlot(settings.dfp_topic_list_top_code, [320,50], 'div-gpt-ad-topic-list-top').addService(googletag.pubads());
        }
        else {
          googletag.defineSlot('/' + settings.dfp_publisher_id + '/' + settings.dfp_topic_list_top_code, [parseInt(splitWidthInt(settings.topic_list_top_ad_sizes)), parseInt(splitHeightInt(settings.topic_list_top_ad_sizes))], 'div-gpt-ad-topic-list-top')
          .setTargeting(settings.dfp_target_topic_list_top_key_code, valueParse(settings.dfp_target_topic_list_top_value_code))
          // This hardcoded code works: .setTargeting('category', ["clothes", "handbags", "makeup"])
          .addService(googletag.pubads());
        }
      }
      if (settings.dfp_topic_above_post_stream_code && !settings.dfp_show_topic_above_post_stream && settings.topic_above_post_stream_ad_sizes) {
        const_width = parseInt(splitWidthInt(settings.topic_above_post_stream_ad_sizes));
        const_height = parseInt(splitHeightInt(settings.topic_above_post_stream_ad_sizes));
        if (Discourse.Mobile.mobileView) {
          googletag.defineSlot(settings.dfp_topic_above_post_stream_code, [320,50], 'div-gpt-ad-topic-above-post-stream').addService(googletag.pubads());
        }
        else {
          googletag.defineSlot('/' + settings.dfp_publisher_id + '/' + settings.dfp_topic_above_post_stream_code, [parseInt(splitWidthInt(settings.topic_above_post_stream_ad_sizes)), parseInt(splitHeightInt(settings.topic_above_post_stream_ad_sizes))], 'div-gpt-ad-topic-above-post-stream')
          .setTargeting(settings.dfp_target_topic_above_post_stream_key_code, valueParse(settings.dfp_target_topic_above_post_stream_value_code))
          // This hardcoded code works: .setTargeting('category', ["clothes", "handbags", "makeup"])
          .addService(googletag.pubads());       
        }
      }
      if (settings.dfp_topic_above_suggested_code && !settings.dfp_show_topic_above_suggested && settings.topic_above_suggested_ad_sizes) {
        const_width = parseInt(splitWidthInt(settings.topic_above_suggested_ad_sizes));
        const_height = parseInt(splitHeightInt(settings.topic_above_suggested_ad_sizes));
        if (Discourse.Mobile.mobileView) {
          googletag.defineSlot(settings.dfp_topic_above_suggested_code, [320,50], 'div-gpt-ad-topic-above-suggested').addService(googletag.pubads());
        }
        else {
          googletag.defineSlot('/' + settings.dfp_publisher_id + '/' + settings.dfp_topic_above_suggested_code, [parseInt(splitWidthInt(settings.topic_above_suggested_ad_sizes)), parseInt(splitHeightInt(settings.topic_above_suggested_ad_sizes))], 'div-gpt-ad-topic-above-suggested')
          
          googletag.setTargeting(settings.dfp_target_topic_above_suggested_key_code, valueParse(settings.dfp_target_topic_above_suggested_value_code))
          // This hardcoded code works: .setTargeting('category', ["clothes", "handbags", "makeup"])
          googletag.addService(googletag.pubads());


        var Foo = function() {}
        Foo.prototype.bar = function() {
          // Stuff
          return this;
        }

        var f = new Foo();
        f.bar().bar().bar();
        f.bar();
        f.bar();
        f.bar();

        }
      }
      if (settings.dfp_post_bottom_code && !settings.dfp_show_post_bottom && settings.post_bottom_ad_sizes) {
        const_width = parseInt(splitWidthInt(settings.post_bottom_ad_sizes));
        const_height = parseInt(splitHeightInt(settings.post_bottom_ad_sizes));
        if (Discourse.Mobile.mobileView) {
          googletag.defineSlot(settings.dfp_post_bottom_code, [320,50], 'div-gpt-ad-post-bottom').addService(googletag.pubads());
        }
        else {
          googletag.defineSlot('/' + settings.dfp_publisher_id + '/' + settings.dfp_post_bottom_code, [parseInt(splitWidthInt(settings.post_bottom_ad_sizes)), parseInt(splitHeightInt(settings.post_bottom_ad_sizes))], 'div-gpt-ad-post-bottom')
          .setTargeting(settings.dfp_target_post_bottom_key_code, valueParse(settings.dfp_target_post_bottom_value_code))
          // This hardcoded code works: .setTargeting('category', ["clothes", "handbags", "makeup"])
          .addService(googletag.pubads());        
        }
      }

    // Page Level custom targeting goes here - needs an input section and also ad tags on the relevant pages      
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  });

  return _promise;
}


// Ember component - the class is the adblock and css
export default Ember.Component.extend({
  const_width: const_width,
  const_height: const_height,

  classNames: ['google-dfp-ad'],
  loadedGoogletag: false,

  // Part of the divID of the div part of the GPT
  divId: function() {
    return "div-gpt-ad-" + this.get('placement');
  }.property('placement'),

  adWrapperStyle: function() {
    return `width: ${this.get('const_width')}px; height: ${this.get('const_height')}px;`.htmlSafe();
  }.property('const_width', 'const_height'),

  adWrapperStyleMobile: function() {
    return `width: 320px; height: 50px;`.htmlSafe();
  },

  _initGoogleDFP: function() {
    var self = this;
    loadGoogle(this.siteSettings).then(function() {
      self.set('loadedGoogletag', true);
    });
  }.on('didInsertElement')
});
