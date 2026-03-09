/**
* Groups music tracks by year and returns sorted titles
* @param {Array} tracks - Array of track objects
* @returns {Object} - Object with years as keys and sorted title arrays as values
*/
function getMusicTitlesByYear(tracks) {
// Your implementation here
    let outputObject = {};

    for(let i=0; i<tracks.length; i++){
        if(tracks[i].year && typeof tracks[i].year === 'number'){
            let trackYear = tracks[i].year;

            if(!outputObject[trackYear]){
                outputObject[trackYear] = [];
            }
            outputObject[trackYear].push(tracks[i].title);
            outputObject[trackYear].sort();
        }
    }

    return outputObject;
}


/**
* Filters tracks by criteria and adds decade information
* @param {Array} tracks - Array of track objects
* @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
* @returns {Array} - Filtered and transformed track objects
*/
function filterAndTransformTracks(tracks, criteria) {
// Your implementation here
    for(let i=0; i<tracks.length; i++){
        let year = tracks[i].year;
        let min = Math.floor(year / 10) * 10;
        let decade = String(min) + 's';

        tracks[i]['decade'] = decade;
    }

    let output = tracks;
    
    if(criteria.artist){
        let result = output.filter(filterTracksA);

        function filterTracksA(outputElement){
            return outputElement.artist.toLowerCase() === criteria.artist.toLowerCase();
        }

        output = result;
    }

    if(criteria.minYear){
        let result = output.filter(filterTracksMin);

        function filterTracksMin(outputElement){
            return outputElement.year >= criteria.minYear;
        }

        output = result;
    }

    if(criteria.maxYear){
        let result = output.filter(filterTracksMax);

        function filterTracksMax(outputElement){
            return outputElement.year <= criteria.maxYear;
        }

        output = result;
    }

    console.log(output);
    return output;
}


module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};

const tracks = [
{ title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
{ title: 'Starboy', artist: 'The Weeknd', year: 2016 },
{ title: 'Levitating', artist: 'Dua Lipa', year: 2021 },
{ title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
];

filterAndTransformTracks(tracks, {minYear: 2015, maxYear: 2020});
