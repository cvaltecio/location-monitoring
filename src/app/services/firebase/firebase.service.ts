import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private rtdb: AngularFireDatabase
  ) { }

  index(path: string) {
    const itemRef = this.rtdb.object(path);
    return itemRef.valueChanges();
  }

  get(path: string, id: string) {
    const itemRef = this.rtdb.object(`${path}/${id}`);
    return itemRef.valueChanges();
  }

  getQuery(path: string) {
    return this.rtdb.list(`/${path}`, ref => ref.orderByChild('timestamp').limitToLast(10)).valueChanges();
  }

  save(path: string, data: any) {
    return new Promise((resolve, reject) => {
      const itemRef = this.rtdb.object(`${path}/${uuidv4()}`);
      itemRef.set(data)
        .then((resp) => resolve({ msg: 'Salvo com sucesso!', data: resp }))
        .catch((err) => reject({ msg: 'Erro ao salvar!', err }));
    });
  }

  update() {

  }

  delete() {

  }

}
