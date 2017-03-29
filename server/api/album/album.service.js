import Album from './album.model';
import Service from '../../utilities/service';
import { dateDaySearch } from '../../utilities/generic';
import rq from 'request-promise';

class AlbumService extends Service {
  /*
  * Create a object if _id doesn't exist, if not updates old
  * @param {Object} object
  * @return {Object} created/updated
  */
  async createOrUpdate(album) {

    // Update album if albums exists for today
    let updated = await Album.findOneAndUpdate(
      {
        _id: album._id,
        date: dateDaySearch(album.date)
      },
      album,
      {
        upsert: false,
        new: true
      }
    ).exec();

    // If no album updated create new album
    if (updated){
      return updated;
    } else {
      return this.create(album);
    }

  }
}

module.exports = AlbumService;