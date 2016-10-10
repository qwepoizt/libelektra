(function() {

    'use strict';

    angular.module('elektra.rest.angular')
        .service('EntryService', EntryService);

    EntryService.$inject = [
        'Logger', '$http', '$q', 'config.rest.basepath'
    ];

    function EntryService(Logger, $http, $q, configRestBasepath) {

        var service = this;

		this.cache = {
			formats: [],
			search: {
				cached: false,
				entries: {},
				params: {
					filter: "",
					filterby: "",
					sort: "",
					sortby: "",
					rows: 0,
					offset: 0
				}
			}
		};


        this.create = function(entry) {

            Logger.info('Attempting to create entry.');

            return $http.post(configRestBasepath + 'database', entry,{
				// custom options
			});

        };

		this.update = function(key, entry) {

			Logger.info('Attempting to update entry.');

			return $http.put(configRestBasepath + 'database/' + key, entry, {
				// custom options
			});

		};

		this.delete = function(key) {

			Logger.info('Attempting to delete entry.');

			return $http.delete(configRestBasepath + 'database/' + key, {
				// custom options
			});

		};

        this.get = function(key) {

            Logger.info('Attempting to download entry: ' + key);

            var deferred = $q.defer();

			if(key.length <= 1) {
				deferred.reject('Invalid key');
			} else {
				var url = configRestBasepath;
				url = url + 'database/' + key;
				$http.get(url).success(function(data) {
					deferred.resolve(data);
				}).error(function(data) {
					deferred.reject('Error loading data');
				});
			}

            return deferred.promise;

        }

		this.search = function(params, force) {

            Logger.info('Load entries');

            var deferred = $q.defer();

            if(!service.cache.search.cached || !angular.equals(service.cache.search.params, params) || force)
            {
                Logger.info('Loading entries');
                $http.get(configRestBasepath + 'database', {
					params: params
				}).success(function(data) {
                    service.cache.search.entries = data;
                    service.cache.search.params = params;
                    deferred.resolve(service.cache.search.entries);
                }).error(function(data) {
                    deferred.reject('Error loading data');
                });
            } else {
                deferred.resolve(service.cache.search.entries);
            }

            return deferred.promise;

        };

		this.hasSearchCache = function() {
			return this.cache.search.cached;
		};

        this.getSearchCache = function() {
            return this.cache.search.entries;
        };

        this.getSearchFilter = function() {
            return this.cache.search.params.filter;
        };


		this.loadAvailableFormats = function() {

			Logger.info('Attempting to load available formats.');

			var deferred = $q.defer();

			if(service.cache.formats.length > 0) {
				deferred.resolve(service.cache.formats);
			} else {
				$http.get(configRestBasepath + 'conversion/formats', {
					// custom options
				}).success(function(data) {
					service.cache.formats = data;
					deferred.resolve(service.cache.formats);
				}).error(function(data) {
					deferred.reject(data);
				});
			}

			return deferred.promise;

		};

    }

})();