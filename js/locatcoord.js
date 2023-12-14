// Définissez la projection source (EPSG:26191) et la projection cible (WGS84)
proj4.defs("EPSG:26191", "+proj=lcc +lat_1=33 +lat_2=36 +lat_0=32.5 +lon_0=-6 +x_0=500000 +y_0=300000 +ellps=clrk80 +units=m +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

function chercherCoordonnees() {
    // Récupérez les coordonnées depuis le champ de recherche
    var coordonneesInput = document.getElementById('coordonnees').value;
    var coordonnees = coordonneesInput.split(',');

    // Vérifiez si les coordonnées sont au format correct (EPSG:26191 X, EPSG:26191 Y)
    if (coordonnees.length === 2 && !isNaN(coordonnees[0]) && !isNaN(coordonnees[1])) {
        // Convertissez les coordonnées EPSG:26191 en coordonnées latitudinales/longitudinales (WGS84)
        var epsg26191X = parseFloat(coordonnees[0]);
        var epsg26191Y = parseFloat(coordonnees[1]);

        // Effectuez la conversion
        var coordWGS84 = proj4("EPSG:26191", "EPSG:4326", [epsg26191X, epsg26191Y]);

        // Ajoutez un marqueur à la carte à l'emplacement spécifié
        L.marker(coordWGS84.reverse()).addTo(map)  // Inversez les coordonnées (lat, lon)
            .bindPopup('Emplacement recherché').openPopup();
    } else {
        alert('Veuillez entrer des coordonnées valides au format "EPSG:26191 X, EPSG:26191 Y".');
    }
}






