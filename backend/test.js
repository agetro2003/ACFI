import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);
const encrypt_password = await bcrypt.hash('admin', salt);

console.log(encrypt_password);