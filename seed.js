//const Sequelize = require('sequelize');

//require('./db');
///const sequelize = require('./db');
const Post = require('./models/post');
const User = require('./models/user');
const Profile = require('./models/profile');
const Image = require('./models/profile');


// Users
const users = [
    {name: "eddy", lastname: '' , username: '', email: 'eddy@gmail.com', password: '', code: '', is_active: 0, is_admin: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23'},
    {name: "jordan", lastname: '' , username: '', email: 'jordan@gmail.com', password: '', code: '', is_active: 0, is_admin: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23'},
  ];
  

// Profiles
const profiles = [
    {
        day_of_birth:  '2021-12-26 21:47:23', gender: '', country_id: 0, image: '',image_header: '', title: '', bio: 'Bio Eddy', likes: '', dislikes: '', address: '', phone: '', public_email: '', user_id: 1, level_id: 0, sentimental_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1,
    },
    {
      day_of_birth:  '2021-12-26 21:47:23', gender: '', country_id: 0, image: '',image_header: '', title: '', bio: 'Bio Jordan', likes: '', dislikes: '', address: '', phone: '', public_email: '', user_id: 1, level_id: 0, sentimental_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 2,
  },
  ];
  
// Posts
const posts = [
    {
        title: '', content: 'post 1 eddy', lat: 0, lng: 0, start_at: '2021-12-26 21:47:23', finish_at: '2021-12-26 21:47:23', receptor_type_id: 0, author_ref_id: 1, receptor_ref_id: 0, level_id:  0, post_type_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1
    },
    {
      title: '', content: 'post 2 eddy', lat: 0, lng: 0, start_at: '2021-12-26 21:47:23', finish_at: '2021-12-26 21:47:23', receptor_type_id: 0, author_ref_id: 1, receptor_ref_id: 0, level_id:  0, post_type_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1
    },
    {
      title: '', content: 'post 3 eddy', lat: 0, lng: 0, start_at: '2021-12-26 21:47:23', finish_at: '2021-12-26 21:47:23', receptor_type_id: 0, author_ref_id: 1, receptor_ref_id: 0, level_id:  0, post_type_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1
    }
];


const sequelize = require('./db');

sequelize.sync({force: false}).then(()=>{
    // Conexion establecida
    console.log("Conexion establecida....");
}).then(()=>{
    // Rellenar usuarios
    users.forEach(user => User.create(user));
}).then(()=>{
    // Rellenar profiles
    profiles.forEach(profile => Profile.create(profile));
}).then(()=>{
    // Rellenar posts
    posts.forEach(post => Post.create(post));
}).then(async() => {
    let image1 = await Image.create({
    src: "", title: "image 1", content: "", user_id: 0, level_id: 0, album_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23',
    posts: [
        {
        title: '', content: 'post 4 eddy', lat: 0, lng: 0, start_at: '2021-12-26 21:47:23', finish_at: '2021-12-26 21:47:23', receptor_type_id: 0, author_ref_id: 1, receptor_ref_id: 0, level_id:  0, post_type_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1
        },
        {
        title: '', content: 'post 5 eddy', lat: 0, lng: 0, start_at: '2021-12-26 21:47:23', finish_at: '2021-12-26 21:47:23', receptor_type_id: 0, author_ref_id: 1, receptor_ref_id: 0, level_id:  0, post_type_id: 0, created_at: '2021-12-26 21:47:23', updated_at: '2021-12-26 21:47:23', userId: 1
        }
    ]
    }, {
    include: [{
        model: Post
    }]
    });
});