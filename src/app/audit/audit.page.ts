import { IAppointment } from './../shared/models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  itemRef: AngularFireObject<IAppointment>;

  constructor(
    private database: AngularFireDatabase,
    private activatedRoute: ActivatedRoute
  ) {
    const params = this.activatedRoute.snapshot.params;
    this.itemRef = this.database.object<IAppointment>(`/appointments/${params.key}`);
    this.itemRef.valueChanges().subscribe(appointment => {
      console.log(appointment);
    });
  }

  ngOnInit() {
  }

}