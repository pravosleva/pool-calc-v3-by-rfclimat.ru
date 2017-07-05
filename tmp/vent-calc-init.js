jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '; path=/',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

$(function () {

   // Set wrap/unwrap blocks
   
   $('.wrap-blk').each(function () {
      var block = $(this);
      var blockID = $(this).attr('id');
      var hdr = $(this).prev('.wrap-hdr');

      if ($.cookie(blockID)) {
         $(this).addClass('wrap-blk-close');
         hdr.addClass('wrap-hdr-close');
      }

      hdr.click(function() {
         block.toggleClass('wrap-blk-close');
         $(this).toggleClass('wrap-hdr-close');

         if (block.hasClass('wrap-blk-close'))
            $.cookie(blockID, "1", { expires: 365 });
         else
            $.cookie(blockID, null);
      });
   });

   // Set onChange Event
   $('#Calc').each(function () {   
      $(this).change(function() {
         calcVent();
      });   
   });
   
   // Initial 2 rooms
   $('#calc-L1-2 div.calc-group-brd').each(function () {
                  
      if ($(this).index('div.calc-group-brd') > 1) 
         $(this).css('display','none');
      else 
         $(this).css('display','block');               

   });   

   // Change room number
   $('#set-room-number input').each(function () {
      $(this).click(function() {
         var room_number = $(this).val();
                    
         $('#calc-L1-2 div.calc-group-brd').each(function () {

            if ($(this).index('div.calc-group-brd')+1 > room_number) 
               $(this).css('display','none');
            else 
               $(this).css('display','block');               
      
         });
      });
   });   
});
