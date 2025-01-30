import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true
  },
  {
    name: 'Nilesh Wani',
    email: 'nil@email.com',
    password: bcrypt.hashSync('nil@123', 10),
    isAdmin: true
  },
  {
    name: 'Udyan Suradkar',
    email: 'udy@email.com',
    password: bcrypt.hashSync('udy@123', 10),
    isAdmin: false
  },
  {
    name: 'Jay',
    email: 'jay@email.com',
    password: bcrypt.hashSync('jay@123', 10),
    isAdmin: false
  },
];

export default users;
