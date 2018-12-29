// Globals
var map;
var clientID;
var clientSecret;


function ViewModel() {
    var self = this;

    this.searchOption = ko.observable("");
    this.markers = [];

    // Populates the infowindow when the marker is clicked, allowing only one
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            // Foursquare API
            clientID = "ULWHF40HCQPBWB3FO512P5VZY3MSYWEIYMLC0JR2KFR2XDFA";
            clientSecret = "LBPSU302BIXDTH3PDK3OAQVJ5EFCUUAHVWVKT2N55UROIGUO";
            var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title + 
                '&v=20170708' + '&m=foursquare';

            // Utilize Jquery JSON functions
            $.getJSON(apiUrl).done(function(marker) {
                var response = marker.response.venues[0];
                self.street = response.location.formattedAddress[0];
                self.city = response.location.formattedAddress[1];
                self.zip = response.location.formattedAddress[3];
                self.country = response.location.formattedAddress[4];
                self.category = response.categories[0].shortName;

                self.htmlContentFoursquare =
                    '<h5 class="subtitle">(' + self.category +
                    ')</h5>' + '<div>' +
                    '<h6 class="address_title"> Address: </h6>' +
                    '<p class="address">' + self.street + '</p>' +
                    '<p class="address">' + self.city + '</p>' +
                    '<p class="address">' + self.zip + '</p>' +
                    '<p class="address">' + self.country +
                    '</p>' + '</div>' + '</div>';

                infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
            }).fail(function() {
                // Send alert
                alert(
                    "The Foursquare API failed to load. Please try again in a moment by refreshing the page."
                );
            });

            this.htmlContent = '<div>' + '<h4 class="title">' + marker.title +
                '</h4>';

            infowindow.open(map, marker);

            // InfoWindow Close listener
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

    // Populate info window and animate marker
    this.populateAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
    };

    // Initialize Map (center/zoom/styles) and iterate Markers
    this.initMap = function() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(40.7413549, -73.9980244),
            zoom: 13,
            styles: multiBrandNetwork
        };
        // Create Map object
        map = new google.maps.Map(mapCanvas, mapOptions);

        // Set InfoWindow
        this.largeInfoWindow = new google.maps.InfoWindow();
        for (var i = 0; i < locations.length; i++) {
            this.markerTitle = locations[i].title;
            this.markerLat = locations[i].lat;
            this.markerLng = locations[i].lng;
            // Google Maps marker setup
            this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.markerLat,
                    lng: this.markerLng
                },
                title: this.markerTitle,
                lat: this.markerLat,
                lng: this.markerLng,
                id: i,
                animation: google.maps.Animation.DROP
            });
            this.marker.setMap(map);
            this.markers.push(this.marker);
            this.marker.addListener('click', self.populateAndBounceMarker);
        }
    };

    this.initMap();

    // Location list filter
    this.locationsFilter = ko.computed(function() {
        var result = [];
        for (var i = 0; i < this.markers.length; i++) {
            var markerLocation = this.markers[i];
            if (markerLocation.title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                result.push(markerLocation);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return result;
    }, this);
}

// Provide error message if Map fails to load.
loadError = function loadError() {
    alert(
        'Google Maps failed to load. Please refresh the page to try again.'
    );
};

// Initialize the ViewModel once Map is loaded
function initialize() {
    ko.applyBindings(new ViewModel());
}
