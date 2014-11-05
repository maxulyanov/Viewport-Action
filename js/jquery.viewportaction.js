/*
 
*/

(function($){
    $.fn.viewportaction = function(options) {

        // Опции по умолчанию
        var options = $.extend({}, {
            effect: 'visible',
            offsetTop: 100,
            repeat: true,
            customClass: false
        }, options);

        // Запомним this и высоту страницу
        var elem = this,
            windowHeight =  $(window).height();

        this.unitElem = function() {
      
  			// Значения отступов
  			var scrollTop = $('body').scrollTop(),
				scrollBottom = (scrollTop + windowHeight);
			
            
            $(elem).each(function() {
                var obj = $(this),
                    objOpt = {};
                $.extend(objOpt, options);

                // Добавим кастомный класс
                $(obj).addClass(objOpt.customClass);

                // Если класс уже существует -  выход
                if($(obj).hasClass(objOpt.effect) && !objOpt.repeat){
                    return;
                }

                // Позиция элемента + смещение
                var elemTop =  Math.round($(obj).offset().top) + objOpt.offsetTop,
                    elemBottom = elemTop + ($(obj).height());

                // Применить эффект
                if((elemTop < scrollBottom) && (elemBottom > scrollTop)){
                    $(obj).addClass(objOpt.effect);
                    
                }
                
                // Удалить эффект, если параметр repeat == true 
                else if($(obj).hasClass(objOpt.effect) && (objOpt.repeat)){
                    $(obj).removeClass(objOpt.effect);
                }
            });
        
        };

        // Запуск метода unitElem при загрузке или скролле страницы
        $(window).on('load scroll touchmove', this.unitElem);
        
        this.unitElem();
        
        return this;
    };

})(jQuery);



