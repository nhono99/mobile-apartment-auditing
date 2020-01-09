import { RouterTestingModule } from '@angular/router/testing';
import { IAppointment } from './../shared/models/appointment.model';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  itemRef: AngularFireList<IAppointment>;
  appointments$: Observable<IAppointment[]>;
  constructor(
    private database: AngularFireDatabase
  ) {
    this.itemRef = this.database.list('/appointments');
    this.appointments$ = this.itemRef.snapshotChanges().pipe(
      map((res) => {
        return res.map(value => {
          const appointment: IAppointment = value.payload.val();
          const count = appointment.units.reduce(bedsAndBathsCalc, { beds: 0, baths: 0 });
          const label = statusLabel(appointment.status);
          const color = statusColor(appointment.status);
          const roomsAndBaths = `${count.beds} BD ${count.baths} BT`;
          return {
            ...appointment,
            key: value.key,
            label,
            color,
            roomsAndBaths
          };
        });
      }
      )
    );
}
}

function statusLabel(status) {
  return status === 'incomplete' ? 'Incomplete' : status === 'complete' ? 'Complete' : 'Not Started';
}

function statusColor(status) {
  return status === 'incomplete' ? 'danger' : status === 'complete' ? 'success' : 'primary';
}

function bedsAndBathsCalc(acc, curr) {
  if (curr.type === 'room') {
    acc.bed += 1;
  }

  if (curr.type === 'bath') {
    acc.baths += 1;
  }

  return acc;
}
