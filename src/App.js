import React from "react"
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import NavBar from "./components/Navbar/NavBar";
import ContactList from "./components/Contacts/ContactList/ContactList";
import EditContact from "./components/Contacts/EditContact/EditContact";
import ViewContact from "./components/Contacts/ViewContact/ViewContact"
import AddContact from "./components/Contacts/AddContact/AddContact"
import Spinner from "./components/Spinner/Spinner";

let App = () => {
  return (
   <React.Fragment>
    
    <NavBar />
    <Routes>
      <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
      <Route path={'/contacts/list'} element={<ContactList/>}/>
      <Route path={'/contacts/add'} element={<AddContact/>}/>
      <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
      <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
    </Routes>

   </React.Fragment>
  );
}

export default App;
