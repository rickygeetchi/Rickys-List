import axios from 'axios';

export class ContactService{
    static serverURL = `http://localhost:9000`

    static getALLContacts(){
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL)
    }

    static getContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static getGroups(){
        let dataURL = `${this.serverURL}/groups`
        return axios.get(dataURL);
    }

    static getGroup(contact){
        let group = contact.group;
        let dataURL = `${this.serverURL}/groups/${group}`
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL,contact);
    }

    static editContact(contact, contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL,contact);

    }

    static deleteContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL, contactId);
    }
}