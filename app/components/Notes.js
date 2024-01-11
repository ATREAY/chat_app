// notes.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { firestore, auth } from '@/lib/firebase';

function Notes({ userId }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: ''});
  const user = auth.currentUser;

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && user) {
      // setItems([...items, newItem]);
      await addDoc(collection(firestore, 'items'), {
        userId: user.uid,
        name: newItem.name.trim(),
        
      });
      setNewItem({ name: '' });
    }
  };

  // Read items from database
  useEffect(() => {
    if (user) {
    const q = query(collection(firestore, 'items'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      return () => unsubscribe();
    });
  }
  }, [user]);

  // Delete items from database
  const deleteItem = async (id) => {
    if (user) {
    await deleteDoc(doc(firestore, 'items', id));
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
        <h1 className='text-4xl p-4 text-center'>User Notes</h1>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-white'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-5 p-3 border'
              type='text'
              placeholder='Enter Note'
            />
            
            <button
              onClick={addItem}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl ml-8'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-slate-950'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='normal-case'>{item.name}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-10 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </main>
  );
}

export default Notes;
