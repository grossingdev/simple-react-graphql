class User {
  constructor(args) {
    if (args) {
      const keys = Object.keys(args);
      keys.map(key => (this[key] = args[key]));
    }
  }
}

const users = [{
  name: 'test',
  email: 'test@gmail.com',
  photo: 'http://res.cloudinary.com/hlnhnov17/image/upload/v1461184864/Simon_r2nwwr.jpg',
  verified: false,
}].map((item, i) => {
  const user = new User();
  user.id = `${i}`;
  user.name = item.name;
  user.email = item.email;
  user.photo = item.photo;
  user.verified = item.verified;
  return user;
});

export { User, users };
