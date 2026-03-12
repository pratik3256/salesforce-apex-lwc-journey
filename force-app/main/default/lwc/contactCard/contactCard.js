import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.Account.Name';

const FIELDS = [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ACCOUNT_FIELD];

export default class ContactCard extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
    get email() {
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }
    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }
    get accountName() {
        return getFieldValue(this.contact.data, ACCOUNT_FIELD);
    }
    get hasError() {
        return this.contact.error;
    }
}