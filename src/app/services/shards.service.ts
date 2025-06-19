import {Injectable} from "@angular/core";
import {ExtendedFile} from '../interfaces/extendedFile';
import {Shard} from '../interfaces/shard';
import {ShatteredFile} from '../interfaces/shatteredFile';

@Injectable({
  providedIn: 'root'
})
export class ShardsService {

  shatterFile(file: ExtendedFile): ShatteredFile {
    let shards: Shard[] = [];

    file.name.split(" ").forEach((rawShard: string) => {
      shards.push({
        string: rawShard,
        length: rawShard.length,
        firstChar: rawShard[0],
        lastChar: rawShard[rawShard.length - 1]
      });
    })

    file.shards = shards;

    // conversion via unknown
    return <ShatteredFile><unknown>file;
  }

}
