import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  share,
  map,
  tap,
  catchError,
} from 'rxjs/operators';
import { get, set, cloneDeep } from 'lodash-es';
import { httpService } from '../../services';
import { IObject, IImageMetadata } from '../../interfaces';
import BaseDataService from './base';

class ImagesDataService extends BaseDataService {
  private images: BehaviorSubject<IObject> = new BehaviorSubject<IObject>({});

  getHouseThumbnailUrl(id: string): string {
    return `${process.env.REACT_APP_IMAGE_SERVICE_URL}/house/${id}/thumbnail.jpg`;
  }

  getHouseImages(id: string): Observable<string[]> {
    if (!this.currentImages[id]) {
      this.fetchHouseImages(id).subscribe();
    }

    return this.images.asObservable()
      .pipe(
        map((images: IObject) => get(images, id) || []),
        share(),
      );
  }

  private get currentImages() {
    return cloneDeep(this.images.getValue());
  }

  private setHouseImages(id: string, images: IImageMetadata[] | null): void {
    const imagesMap = this.currentImages;

    if (!images) {
      set(imagesMap, id, images);
      this.images.next(imagesMap);

      return;
    }

    const preparedImages = images
      .sort((image: IImageMetadata) => (image.tags.includes('hero') ? -1 : 1))
      .map((image: IImageMetadata) => image.imagePath);

    set(imagesMap, id, preparedImages);
    this.images.next(imagesMap);
  }

  private fetchHouseImages(id: string): Observable<IImageMetadata[]> {
    this.setHouseImages(id, []);
    this.setWaitingStatus(true);

    return httpService.http<IImageMetadata[]>('get', {}, `/api/files/house/${id}/images`)
      .pipe(
        tap((data: IImageMetadata[]) => {
          this.setHouseImages(id, data);
          this.setWaitingStatus(false);
        }),
        catchError(() => {
          this.setWaitingStatus(false);
          return of([]);
        }),
      );
  }
}

export default new ImagesDataService();
