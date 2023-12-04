const contacts = new Map();
contacts.set('Jessie', { phone: '213-555-1234', address: '123 N 1st Ave' });
contacts.get('Hilary'); // undefined
contacts.has('Jessie'); // true
contacts.delete('Raymond'); // false
