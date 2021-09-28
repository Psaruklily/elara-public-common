import { useEffect } from 'react';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export default function useSubscription<T>(
  entity: Subject<T> | BehaviorSubject<T> | Observable<T>,
  nextHandler: (value: T) => void | null = () => {},
): void {
  useEffect(() => {
    const subscription = entity.subscribe(
      nextHandler,
      (e) => console.log(e), // TODO: handle error
    );

    return () => subscription.unsubscribe();
  }, []);
};
