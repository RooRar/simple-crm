import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User();


constructor(route: ActivatedRoute, public dialog: MatDialog) {
  if (!route.paramMap)
      return;
  route.paramMap.subscribe( (paramMap: { get: (arg0: string) => any; }) => {
  this.userId = paramMap.get('id');
});

  //  if(this.firestore)
  //    return;

    onSnapshot(doc(this.firestore, 'users',this.userId), (doc) => {
      const data = doc.data();
      
      if(!data || !this.userId)
        return;
      this.user = data['user'];
      this.user.id = this.userId;
  });
}

  editUserAddress() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
  }

  editUserProperties(){
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
  }
}