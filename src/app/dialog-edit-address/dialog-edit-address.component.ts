import { Component, OnInit, inject } from '@angular/core';
import { getFirestore, Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  public user: User = new User(); 
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  db = getFirestore();

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}
  ngOnInit(): void {}

  saveUser() {
    console.log(" UserId" + this.user.id)
    this.loading = true;
    const docRef = doc(this.db, "users", this.user.id);
    const data = {user: this.user.toJSON()};
    console.log("save User:" + this.user);
    
    updateDoc(docRef, data).then(docRef => {
      console.log("A New Document Field has been added to an existing document");
    })
    .catch(error => {
      console.log(error);}).then(() => this.loading = false);
      this.dialogRef.close();
  } 
}