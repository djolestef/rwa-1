import {
  startWorkWithCustomer,
  startWorkWithCustomera,
} from './services/pharmacist.services';
import {Medicine} from './Models/Medicine';
import {Pharmacist} from './Models/Pharmacist';
import {Customer} from './Models/Customer';
import {fetchRandomCustomer} from './services/customer.services';
import {fromEvent, from, zip, pipe, of, interval, merge} from 'rxjs';
import {buffer, take, map, takeLast, takeUntil} from 'rxjs/operators';

interval(1000)
  .pipe(
    map((x, i) => {
      return from((x = fetchRandomCustomer()));
    }),
    take(5)
  )
  .subscribe((x) =>
    x.subscribe((y) => {
      startWorkWithCustomer(y[0]);
    })
  );

// const source = interval(500);
// const clicks = fromEvent(document, 'click');
// const result = source.pipe(takeUntil(clicks));
// result.subscribe((x) => console.log(x));
