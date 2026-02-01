// Test hash generation
async function testHash() {
    const password = 'admin123';
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log('Password:', password);
    console.log('Correct Hash:', hash);
    console.log('Current DEFAULT_HASH: 63a9f0ea7bb98050796b649e85481845bb01b54c3903a57c600ad74fa29ae285');
    console.log('Match:', hash === '63a9f0ea7bb98050796b649e85481845bb01b54c3903a57c600ad74fa29ae285');
}

testHash();
