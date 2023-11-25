import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Component, ViewChild, inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MtxGridColumn, MtxGrid  } from '@ng-matero/extensions/grid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent  {
  displayedColumns: string[] = ['Menu','Name','city','email'];
  user = new User(); 
  firestore: Firestore = inject(Firestore);
  aCollection = collection(this.firestore, 'users')
  allUsers: any[] = [];
  hover:boolean = true;
  isLoading:boolean = true;
  columnHideableChecked: 'show' | 'hide' = 'show';
  columns: MtxGridColumn[] = [
    { header: 'FirstName', field: 'firstName', minWidth: 20, maxWidth: 300, sortable: true },
    { header: 'LastName', field: 'lastName', minWidth: 20, maxWidth: 300, sortable: true },
    { header: 'Email', field: 'email', minWidth: 20, maxWidth: 300, sortable: true },
    { header: 'City', field: 'city', minWidth: 20, maxWidth: 300, sortable: true },
  ];

  trackByName(index: number, item: any) {
    return item.name;
  }

  verNotificacion(rowClick: any): void {
    this.router.navigate([`/user/${rowClick.rowData.id}`])
  }

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private router: Router) {

    onSnapshot(this.aCollection, (list) => {
      const dbAllUsers: User[] = [];
      list.forEach(element => {
        this.isLoading = true;
        const data = element.data();
        data['user'].id = element.id;
        dbAllUsers.push(data['user'] as User);
      });    
      this.allUsers = dbAllUsers;
      this.isLoading = false;
    });
  }
 
  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
  
  editUserProperties(user: any){
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(user);
  }

  editUserAddress(user: any) {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(user);
  }
}