import Album from '../../api/album/album.model';

import albums from './data/albums.json';

/**
	* generateCreator
	* Generate a creator for the given Model
	* The creator can be used to make a new document
	*/
let generateCreator = (Model,formatter) => {
	let creator = async (doc) => {
		if (formatter) formatter(doc);
		doc = new Model(doc);
		await doc.save();
		return doc;
	}
	return creator;
}

/**
	* createDocuments
	* Create given documents with the provided creator
	* Place all created documents back in the provided object
	*/
let createDocuments = async (documents,creator) => {
  let promises = Object.keys(documents).map(async (key) => {
    documents[key] = await creator(documents[key]);
  });
  await Promise.all(promises);
};

/**
	* removeCollections
	* Remove all documents from collections associated with Models
	*/
let removeCollections = async (Models) => {
	let promises = Models.map(
		async (Model) => Model.remove({}).exec()
	);
	await Promise.all(promises);
}

/**
	* createPoint
	* Create a point from coordinates
	*/
let createPoint = (coordinates) => ({ type: 'Point', coordinates: coordinates });

/**
	* seed
	* Seed script to remove documents then create locations, routes and albums
	*/
let seed = async () => {

	// Remove all data
	await removeCollections([Album]);

	// We are now seeding data from app

	// Create albums
	await createDocuments(albums,generateCreator(Album,albumFormatter));
	function albumFormatter(album){
		console.log(album)
	}

}

// Export seed script
module.exports = seed;