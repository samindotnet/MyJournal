import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc} from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  private get userId(){
    return this.auth.currentUser?.uid
  }

  private journalCollection(){
    return collection(this.firestore, `users/${this.userId}/journals`)
  }

  getJournals(): Observable<any[]>{
    return collectionData(this.journalCollection(), {idField: 'id'}) as Observable<any[]>
  }

  addJournal(entry:any){
    return addDoc(this.journalCollection(),entry)
  }

  updateJournal(id: string, entry:any){
    const journalRef = doc(this.firestore, `users/${this.userId}/journals/${id}`)
    return updateDoc(journalRef,entry)
  }

  deleteJournal(id: string){
    const journalRef = doc(this.firestore, `users/${this.userId}/journals/${id}`)
    return deleteDoc(journalRef)
  }
}
