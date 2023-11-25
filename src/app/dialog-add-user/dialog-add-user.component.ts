import { Component, inject } from '@angular/core';
import { Firestore , collection, doc, setDoc  } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
  providers: [MessageService]
})

export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User(); 
  birthDate: Date | undefined;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>,private messageService: MessageService) {}

  saveUser() {
    this.loading = true;
    this.user.birthDate =  this.birthDate ? this.birthDate.getTime() : 0;
    console.log(this.user);
    const aCollection = collection(this.firestore, 'users');
    setDoc(doc(aCollection),{user: this.user.toJSON()}).then(() => this.loading = false);
    this.dialogRef.close();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
