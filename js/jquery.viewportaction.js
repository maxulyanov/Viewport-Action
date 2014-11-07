/*
 
*/

(function($){
    $.fn.viewportaction = function(options) {

        // Опции по умолчанию
        var options = $.extend({}, {
            effect: false,
            offsetTop: 100,
            repeat: true,
            customClass: false,
            oneRowViewport: false,
            scrollSpeed: 400
        }, options);

        // Запомним this и высоту страницу
        var elem = this,
            body = $('body'),
            windowHeight =  $(window).height();

        this.unitElem = function() {
      
  			// Значения отступов
  			var scrollTop = $(body).scrollTop(),
				scrollBottom = (scrollTop + windowHeight);
			
            
            $(elem).each(function() {
                var obj = $(this),
                    objOpt = {};
                $.extend(objOpt, options);

                // Добавим кастомный класс
                $(obj).addClass(objOpt.customClass);

                // Если класс уже существует -  выход
                if($(obj).hasClass(objOpt.effect) && !objOpt.repeat) {
                    return;
                }

                // Позиция элемента + смещение
                var elemTop =  Math.round($(obj).offset().top) + objOpt.offsetTop,
                    elemBottom = elemTop + ($(obj).height());

                // Применить эффект
                if((elemTop < scrollBottom) && (elemBottom > scrollTop)) {
                    $(obj).addClass(objOpt.effect);
                    
                }
                
                // Удалить эффект, если параметр repeat == true 
                else if($(obj).hasClass(objOpt.effect) && (objOpt.repeat)) {
                    $(obj).removeClass(objOpt.effect);
                }

                // Блоки на высоту экрана
                if(objOpt.oneRowViewport) {
                    $(this).height(windowHeight);
                }
            });
        
        };

        // функция определения в какую сторону был скролл
        var onMouseWheel = function(event) {

            event = event.originalEvent;
            var delta = event.wheelDelta > 0 || event.detail < 0 ? 1 : -1;
            var top = $(this).scrollTop();

            if(options.oneRowViewport) {
                startScroll(delta, top);
                return false;  
            }       
        };

        // Функция исполнения скроллинга
        function startScroll(where, top) {
            if(where > 0) {
                 $(body).stop().animate({
                    scrollTop: top - windowHeight
                }, options.scrollSpeed);
            }
            else {
                 $(body).stop().animate({
                    scrollTop: top + windowHeight
                }, options.scrollSpeed);
            }
        };

        /***
            Обработка событий
        ***/

        // Запуск метода unitElem при загрузке, скролле или таче страницы
        $(window).on('load scroll touchmove', this.unitElem);
  
        // Перерасчет высоты по ресайзу окна
        $(window).resize(function() {
            windowHeight = $(window).height();
        });

        // Запуск функции при движении колеса мыши
        $(body).on('mousewheel DOMMouseScroll', onMouseWheel);
        
        this.unitElem();
        
       return this;
    };

})(jQuery);


