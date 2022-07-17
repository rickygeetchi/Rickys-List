import React, {useState, useEffect} from "react";
import Spinner from '../../Spinner/Spinner'
import {Link} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import formatPhoneNumber from "../../../services/MobileFormat";

    let ContactList = () => {

        let [query , setQuery] = useState({
            text : ''
        });

        let searchContacts = (event) => {
            setQuery({...query, text : event.target.value});
            let theContacts = state.contacts.filter(contact =>{
                return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
            });
            setState({
                ...state,
                filteredContacts: theContacts
            });

        };

        let [state , setState] = useState({
            loading : false,
            contacts : [],
            filteredContacts : [],
            errorMessage : ''
        });

   


    useEffect(() => {
        const fetchData = async () => {
            try{ 
                setState({...state, loading: true});
                let response = await ContactService.getALLContacts();
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
            });
        }
        catch (error){
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }}
        
    fetchData()
        
            
        
        },[]);

        let {loading, filteredContacts, errorMessage} = state

        //delete contact
        let clickDelete = async (contactId) => {
            try {
                let response = await ContactService.deleteContact(contactId);
                console.log(response.data)
                if (response){
                    setState({...state, loading: true});
                    let response = await ContactService.getALLContacts();
                    setState({
                        ...state,
                        loading: false,
                        contacts: response.data,
                        filteredContacts: response.data
                });

            }} catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
                
            }
        }

    return (
        <React.Fragment>
            
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h2 fw-bold">Contact Manager  
                                    <Link to={'/contacts/add'} className="btn btn-primary ms-2 btn-sm">
                                        <i className="bi bi-patch-plus fa-lg"/> New</Link>
                                </p>
                                <p className="fst-italic fs-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum alias tempore fuga veniam voluptatibus laborum eius nemo. A harum consequatur illum corporis eum architecto nobis commodi tenetur? Porro, reiciendis libero.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input 
                                                name="text"
                                                value={query.text}
                                                onChange={searchContacts}
                                                type="text" className="form-control" placeholder="Search Names"/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="Search"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <React.Fragment> <section className="contact-list">
                <div className="container">
                    <div className="row">
                        {
                            filteredContacts.length > 0 &&
                                filteredContacts.map(contact => {
                                    return (
                                        <div className="col-md-6" key={contact.id}>
                                        <div className="card my-2">
                                            <div className="card-body">
                                               <div className="row align-items-center d-flex justify-content-around">
                                               <div className="col-md-4">
                                                    <img src={contact.photo} alt="" className="img-fluid contact-img"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <ul className="list-group">
                                                        <li className="list-group-item list-group-item-action">
                                                            Name : <span className="fw-bold">{contact.name}</span>
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                            Mobile : <span className="fw-bold">{formatPhoneNumber(contact.mobile)}</span>
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                            Email : <span className="fw-bold">{contact.email}</span>
                                                        </li>
                                                    </ul>
            
                                                </div>
                                                <div className="col-md-1 d-flex flex-column align-items-center">
                                                    <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                    <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                        <i className="fa fa-pen"></i>
                                                    </Link>
                                                    <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                        }
                       
                        
                    </div>
                </div>

            </section>
            </React.Fragment>

            }

           
        </React.Fragment>
    )


};

export default ContactList;