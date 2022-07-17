import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";

let AddContact = () => {
    let navigate = useNavigate();

    let [state, setState] = useState({
        loading : false,
        contact : {
            name : '',
            photo : '',
            mobile : '',
            email : '',
            company : '',
            title : '',
            group : ''

        },
        groups : [],
        errorMessage : ''
    });

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name] : event.target.value
            }
            
        });
    }

    useEffect( () => {
        const fetchData = async ()=>{
            try {
                setState( {...state, loading: true});
                let response = await ContactService.getGroups();
                setState({
                    ...state,
                    loading : false,
                    groups: response.data
                })
                console.log(response.data)
            }
            catch (error) {

            }
        }
        fetchData()
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contact);
            if(response){
                navigate('/contacts/list',{replace: true});
            }
        } catch (error) {
            setState({...state, errorMessage: error.message});
            navigate('/contacts/add', {replace: false});
        }
    };
    

        let { loading, contact, groups, errorMessage} = state;
    return (
        <React.Fragment>
            
            <section className="add-contact p-3">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-success fw-bold">Create Contact</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quod delectus molestiae in natus quos saepe dolorem. Natus sit illo magnam voluptate. Dolores sunt laboriosam vitae fugiat temporibus, asperiores quaerat.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="name"
                                    value={contact.name}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Name"/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="photo"
                                    value={contact.photo}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Photo URL"/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="mobile"
                                    value={contact.mobile}
                                    onChange={updateInput}
                                    type="tel" className="form-control" placeholder="Mobile Number"/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="email"
                                    value={contact.email}
                                    onChange={updateInput}
                                    type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="company"
                                    value={contact.company}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Company"/>
                            </div>
                            <div className="mb-2">
                                <input 
                                    required={true}
                                    name="title"
                                    value={contact.title}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Title"/>
                            </div>
                            <div className="mb-2">
                                <select 
                                    required={true}
                                    name="group"
                                    value={contact.group}
                                    onChange={updateInput}
                                    className="form-control">
                                    <option value="">Select a Group</option>
                                    {
                                        groups.length > 0 &&
                                            groups.map(group => {
                                                return(
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                    }
                                </select>
                            </div>
                            <div className="mb-2">
                                <input type="submit" className="btn btn-success" value="Create"/>
                                
                                <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                               
                        
                            </div>
                            
                        </form>
                    </div>
                    <div className="col-md-6">
                    <img src={contact.photo} alt="" className="contact-img"/>
                </div>
                </div>
            </section>
        </React.Fragment>
    )

};

export default AddContact;