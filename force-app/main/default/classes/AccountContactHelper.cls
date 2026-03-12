public with sharing class AccountContactHelper {
    public static Map<String,Integer> getContactCountByAccount(List<String> accountNames) {

         if (!Schema.sObjectType.Account.isAccessible() || 
            !Schema.sObjectType.Contact.isAccessible() ||
            !Schema.sObjectType.Account.fields.Id.isAccessible() ||
            !Schema.sObjectType.Account.fields.Name.isAccessible() ||
            !Schema.sObjectType.Contact.fields.Id.isAccessible()) {
            throw new AuraHandledException('Insufficient permissions.');
        }
        
        Map<String,Integer> accountContactMap = new Map<String,Integer>();
        List<Account> accounts = [
            SELECT Id, Name, (SELECT Id FROM Contacts)
            FROM Account
            WHERE Name IN :accountNames
        ]; 
        for(Account acc : accounts){
            accountContactMap.put(acc.Name, acc.Contacts.size());
        }
        System.debug('Account Contact Map: ' + accountContactMap);
        return accountContactMap;
    }
}