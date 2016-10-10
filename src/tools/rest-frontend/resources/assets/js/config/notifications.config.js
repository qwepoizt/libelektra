(function() {

    'use strict';

    angular.module('elektra.rest.angular').config([
        'NotificationProvider',
        function(NotificationProvider) {

            NotificationProvider.setOptions({
				delay: 5000,
                startTop: 70,
                startRight: 10,
                verticalSpacing: 10,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top',
                templateUrl: 'templates/notification.html'
            });

        }
    ]);

})();