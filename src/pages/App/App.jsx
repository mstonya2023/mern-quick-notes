import * as notesApi from '../../utilities/notes-api';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  
  async function addNote() {
    const newNote = await notesApi.add(note)
    setNotes([...notes,newNote]);
    setNote('');
  }

  useEffect(()=>{
    async function getNotes() {
      const notes = await notesApi.getAll();
      setNotes(notes)
    }
    getNotes(); 
  },[]) 
  
  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <input type="text" name="text" value={note} onChange={(evt) =>setNote(evt.target.value) }/>
          <button onClick={addNote}>Add Note</button>
          {notes.length === 0 
            ? <p>No notes yet!</p>
            : notes.map((n, idx) => <p key={idx}>{n.text}</p>)}
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
