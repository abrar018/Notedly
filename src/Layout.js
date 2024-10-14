import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import NoteList from "./NoteList";
import { v4 as uuidv4 } from "uuid";
import { currentDate } from "./utils";
import jwt_decode from "jwt-decode";

const localStorageKey = "lotion-v1";
const userStorageKey = "lotion-user";


function Layout() {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);

  

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(userStorageKey);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return {};
      }
    } else {
      return {};
    }
  });
 
  function call_back_response(response) {
    console.log("bla bla bla"+response.credential);
    var user_obj = jwt_decode(response.credential);
    console.log(user_obj);
    setUser(user_obj);
    localStorage.setItem(userStorageKey, JSON.stringify(user_obj));
    document.getElementById("sign_in_div").hidden = true;
    trying_func(user_obj.email,...notes.slice(0,1));
  }

  function sign_out_fun(event) {
    setUser({});
    localStorage.removeItem(userStorageKey);
    document.getElementById("sign_in_div").hidden = false;
  }


  

  function trying_func(note_id,a) {
    console.log("trying_func: " + note_id);
    console.log("trying_func: hababbabxdebdyedbedw: "+a);
  }
  useEffect(() => {
    if(Object.keys(user).length ===0){
    
    window.google.accounts.id.initialize
    ({
      client_id: "855097475632-0g17g51o9e1es3mufjop8elsitj63sr4.apps.googleusercontent.com",
      callback: call_back_response
    })
      window.google.accounts.id.renderButton(document.getElementById("sign_in_div"), 
      { theme: "outline", size: "large", text: "sign_in" });}
    
      }, []);


  useEffect(() => {
    // const height = mainContainerRef.current.offsetHeight;
    // mainContainerRef.current.style.maxHeight = `${height}px`;
    const existing = localStorage.getItem(localStorageKey);
    if (existing) {
      try {
        setNotes(JSON.parse(existing));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (currentNote < 0) {
      return;
    }
    if (!editMode) {
      navigate(`/notes/${currentNote + 1}`);
      return;
    }
    navigate(`/notes/${currentNote + 1}/edit`);
  }, [notes]);

  

  const saveNote = async (note, index) => {
    note.body = note.body.replaceAll("<p><br></p>", "");
    setNotes([
      ...notes.slice(0, index),
      { ...note },
      ...notes.slice(index + 1),
    ]);
    setCurrentNote(index);
    setEditMode(false);
    var res = await fetch(
      "https://ykutj5pwyqelgg34grai26kt7q0bobhm.lambda-url.ca-central-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "email": user.email,
          "token": user.access_token
        },
        body: JSON.stringify({...note, email: user.email}),
        
      }
    )
    const jsonRes = await res.json();
    console.log(jsonRes);
    
  };

  const deleteNote = async (index) => {
    const res = await fetch(
      "https://u7ex6rx73qlomn3pb62fcolamm0eeifu.lambda-url.ca-central-1.on.aws",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: notes[index].id, email: notes[index].email })
      }
    );

    const data = await res.text();

    if (res.ok) {
      console.log("Note deleted successfully");
    } else {
      console.error("Failed to delete note:", data.message);
    }
    
    setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
    setCurrentNote(0);
    setEditMode(false);

  };

  const addNote = () => {
    if(Object.keys(user).length !=0){
    setNotes([
      {
        id: uuidv4(),
        title: "Untitled",
        body: "",
        when: currentDate(),
      },
      ...notes,
    ]);
    setEditMode(true);
    setCurrentNote(0);}
    else{
      alert("Please Sign In to add notes");
    }
  };

  return (
    <div id="container">
      <header>
        <aside>
          <button id="menu-button" onClick={() => setCollapse(!collapse)}>
            &#9776;
          </button>
        </aside>
        <div id="app-header">
          <h1>
            <Link to="/notes">Lotion</Link>
            
          </h1>
          <div allign="right">
            {
            Object.keys(user).length !=0 
            &&
            <button onClick={(e) => sign_out_fun(e)}>Sign Out</button>
          }
          
          {user &&
            <div>
              <h3>{user.email}</h3>
              </div>
          }</div>
          <h6 id="app-moto">Like Notion, but worse.</h6>

        </div>
        <aside>&nbsp;</aside>
      </header>
      <div id="main-container" ref={mainContainerRef}>
        <aside id="sidebar" className={collapse ? "hidden" : null}>
          <header>
            <div id="notes-list-heading">
              <h2>Notes</h2>
              <button id="new-note-button" onClick={addNote}>
                +
              </button>
            </div>
          </header>
          <div id="notes-holder">
            <NoteList notes={notes} />
          </div>
        </aside>
        <div id="write-box">

          {notes.length === 0 || Object.keys(user).length !=0
            ? <div id="sign_in_div"></div>
            : <div></div>
          }
     
          
          

          <Outlet context={[notes, saveNote, deleteNote]} />
        </div>
      </div>
    </div>
  );
}
export default Layout;