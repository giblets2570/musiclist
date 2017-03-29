import { getObjectId, objectsEqual } from '../../utilities/generic';

import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';

class AlbumModel extends Model {

}

AlbumModel.schema = {
	rank: Number,
	album: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	listened: {
		type: Boolean,
		default: false
	}
}


module.exports = Mongo('Album',AlbumModel);