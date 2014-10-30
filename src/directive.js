'use strict';
angular.module('gg.heatmap')
.directive('heatmap', function (HeatmapHelper, $window, $timeout) {
  return {
    template: '<div class="heatmap-container"></div>',
    replace: true,
    scope: {
      zeroColor: '@',
      colors: '=',
      matrix: '='
    },
    link: function (scope, elem) {
      var drawTimeout = null,
          drawDelay = HeatmapHelper.drawDelay;
      function draw() {
        //to avoid multiple draws, we'll alaways make sure no changes we're made within 300 ms until redrawing
        $timeout.cancel(drawTimeout);
        elem.addClass('heatmap-resizing');
        drawTimeout = $timeout(function () {
          console.log('Drawing');
          HeatmapHelper.renderMap(elem, scope.matrix, scope.colors, scope.colors.length);
          elem.removeClass('heatmap-resizing');
        }, drawDelay);
      }
      scope.$watch('colors', function (colors) {
        draw();
      }, true);

      scope.$watch('matrix', function (matrix) {
        draw();
      }, true);

      angular.element($window).bind('resize', function () {
        scope.$apply(draw);
      });

    }
  };
});
