const Sequelize = require("sequelize");
const ProfileModel = require("./models/profile");
const UserModel = require("./models/user");
const ImageModel = require("./models/image");
const PostModel = require("./models/post");
const FollowModel = require("./models/follow");

// const RecoverModel      = require('./models/recover');
// const LevelModel        = require('./models/level');
// const CountryModel      = require('./models/country');
// const SentimentalModel  = require('./models/sentimental');
// const AlbumModel        = require('./models/album');
// const PostImageModel    = require('./models/postimage');
// const HeartModel        = require('./models/heart');
const CommentModel      = require('./models/comment');
// const FriendModel       = require('./models/friend');
const ConversationModel = require('./models/conversation');
const MessageModel      = require('./models/message');
// const NotificationModel = require('./models/notification');
// const TeamModel         = require('./models/team');

const sequelize = new Sequelize("redsocial", "develoddy", "$$developer20", {
      host: "192.168.64.6",
      dialect: "mysql",
      define: {
            timestamps: false,
      },
});

const Profile = ProfileModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Image = ImageModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Follow = FollowModel(sequelize, Sequelize);
// const Recover     = RecoverModel(sequelize, Sequelize);
// const Level       = LevelModel(sequelize, Sequelize);
// const Country     = CountryModel(sequelize, Sequelize);
// const Sentimental = SentimentalModel(sequelize, Sequelize);
// const Album       = AlbumModel(sequelize, Sequelize);
// const PostImage   = PostImageModel(sequelize, Sequelize);
// const Heart       = HeartModel(sequelize, Sequelize);
const Comment     = CommentModel(sequelize, Sequelize);
// const Friend      = FriendModel(sequelize, Sequelize);
const Conversation= ConversationModel(sequelize, Sequelize);
const Message     = MessageModel(sequelize, Sequelize);
// const Notification= NotificationModel(sequelize, Sequelize);
// const Team        = TeamModel(sequelize, Sequelize);


// Users
const users = [
      {id: 1, name: "eddy",lastname: "",username: "eddylujan",email: "eddylujan@gmail.com",password: "$2a$10$pLDdShGtxluePFEIErqk.e3iXB5tEVbOLkXzqw0bW5CEDKYyVYo4S",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 2, name: "jordan",lastname: "",username: "jordan",email: "jordan@gmail.com",password: "$2a$10$oeq01oRVnhu7YQVoZdIWkOJ6DN3qsfJju5TCS1CRqu8Jo5JUQn/4G",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 3, name: "Pablo Lujan",lastname: "",username: "chingo",email: "chingo@gmail.com",password: "$2a$10$AWKpCGfdLgo/EHq9Z8Abrev9S7tFUVYPlG1Ucgxj6CtjwxO.ummO6",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 4, name: "Paola Lujan",lastname: "",username: "paola",email: "paola@gmail.com",password: "$2a$10$.F0KIcPCzFw7QCBQjrZ1huDsmGWDYoGuxgIO9fyJUMlyzf7rDz1ny",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 5, name: "Pepito Flores",lastname: "",username: "pepito",email: "pepito@gmail.com",password: "$2a$10$7RjAHKWor3zgni5foiGGFupeqSNZVCpfdoP6BPODVd9tg/7wy1JSe",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 6, name: "Juanito Perez",lastname: "",username: "juanito",email: "juanito@gmail.com",password: "$2a$10$tg4q7Q3GNmN5n/JtX4GjuOLBmsUZfEAtjHfNk2gzoFfq241VSN6XK",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 7, name: "Mendito Rodriguez",lastname: "",username: "mendito",email: "mendito@gmail.com",password: "$2a$10$aJyHRoKEv3NZAwib4rRt4uEfEa1Ar1pJQhPZzMwKoCF5HIJHdl9nO",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 8, name: "Paquito Avianca",lastname: "",username: "paquito",email: "mendito@gmail.com",password: "$2a$10$yFSEHej/Rzte4sh6Wc/sZen2EVwidgWJdvt3dnf/9wf4BfwwVShBe",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 9, name: "Lolita Castillo",lastname: "",username: "lolita",email: "lolita@gmail.com",password: "$2a$10$z5QRrsb5Sv9INVKzlBmQEO3sUC.NX4oDM6WP36A4APkUtgNxZz8py",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
      {id: 10, name: "Luna Mendieta",lastname: "",username: "luna",email: "luna@gmail.com",password: "$2a$10$FgT2Z4sZ8MMEEpvTBYGwIO8pqNAYLnOTB2n6.Nu0XzqwJTstM3YhW",code: "",is_active: 0,is_admin: 0,created_at: "2021-12-26 21:47:23",updated_at: "2021-12-26 21:47:23"},
];


// Profiles
const profiles = [
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "eddy.jpeg",
            title: "",
            bio: "Bio Eddy",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "eddylujan@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 1,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "jordan.jpeg",
            title: "",
            bio: "Bio Jordan",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "jordan@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 2,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "chingo.jpeg",
            title: "",
            bio: "Bio Chingo",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "chingo@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 3,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "paola.jpeg",
            title: "",
            bio: "Bio Paola",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "paola@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 4,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Pepito",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "pepito@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 5,
      },
     
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Juanito",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "juanito@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 6,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Mendito",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "mendito@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 7,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Paquito",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "paquito@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 8,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Lolita",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "lolita@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 9,
      },
      {
            day_of_birth: "2021-12-26 21:47:23",
            gender: "",
            country_id: 0,
            image: "",
            image_header: "profile.jpg",
            title: "",
            bio: "Bio Luna",
            likes: "",
            dislikes: "",
            address: "",
            phone: "",
            public_email: "luna@gmail.com",
            user_id: 1,
            level_id: 0,
            sentimental_id: 0,
            created_at: "2021-12-26 21:47:23",
            updated_at: "2021-12-26 21:47:23",
            userId: 10,
      },
];


// Images
const images = [
  { src:"public/posts/imga-01.jpg" , title:"imga-01.jpg" , content: "b02", user_id: 0, level_id: 0, album_id:0, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23",  }
]

// Follows
const follows = [
      // eddy sigue a 5 usuarios
      { user_id: 1, followed_id: 2, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 1, followed_id: 3, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 1, followed_id: 4, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 1, followed_id: 5, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 1, followed_id: 6, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },

      // Jordan sigue a 2 usuarios (eddy y paola)
      { user_id: 6, followed_id: 1, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 6, followed_id: 5, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },

      // Paola sigue a 3 usuarios (eddy, jordan y chingo)
      { user_id: 5, followed_id: 1, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 5, followed_id: 2, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
      { user_id: 5, followed_id: 6, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23" },
];

const conversations = [
      {sender_id: 1, receptor_id: 2, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23"},
      {sender_id: 2, receptor_id: 1, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23"}
]

const messages = [
      {content: "Hola Jordan, mi nombre es eddy", user_id: 0, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23", is_read: 0, conversationId: 1, userId: 1},
      {content: "Hola Jordan, Como te va sigo siendo eddy", user_id: 0, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23", is_read: 1, conversationId: 1, userId: 1},
      {content: "Hola Eddy, mi nombre es jordan", user_id: 0, created_at: "2021-12-26 21:47:23", updated_at: "2021-12-26 21:47:23", is_read: 0, conversationId: 2, userId: 2}      
];


const comments = [
      { type_id: 0, ref_id: 0, user_id: 0, content: "Hola eddy", comment_id: 0, created_at: "2021-12-26 20:47:23", updated_at: "2021-12-26 20:47:23", postId: 2, userId: 2, commentId: 1 }, 
      { type_id: 0, ref_id: 0, user_id: 0, content: "Hola jordan", comment_id: 0, created_at: "2021-12-26 20:47:23", updated_at: "2021-12-26 20:47:23", postId: 2, userId: 1, commentId: 1 },
      { type_id: 0, ref_id: 0, user_id: 0, content: "otro", comment_id: 0, created_at: "2021-12-26 20:47:23", updated_at: "2021-12-26 20:47:23", postId: 4, userId: 1, commentId: 1 },
];


// AUTHENTICATE
// Conectarse a la base de datos.
// Force true: DROP TABLES
sequelize
      .sync({ force: true })
      .then(() => {
            console.log(
                  "[ DATABASE ] => La conexion a la base de datos redsocial se ha realizado correctamente!"
            );
      })
      .then(() => {
            // Rellenar usuarios
            users.forEach((user) => User.create(user));
      })
      .then(() => {
            // Rellenar profiles
            profiles.forEach((profile) => Profile.create(profile));
      })
      .then(() => {
            // Rellenar posts
            //posts.forEach((post) => Post.create(post));
      })
      .then(() =>{
            // Rellenar images
            images.forEach((image) => Image.create(image));
      })
      .then(() =>{
            follows.forEach((follow) => Follow.create(follow));
      })
      .then(() =>{
            conversations.forEach((conversation) => Conversation.create(conversation));
      })
      .then(() => {
            messages.forEach((message) => Message.create(message) );
      })
      
      .then(async () => {

            let post1 = await Post.create(
                  {
                        title: "",
                        content: "Publicacion 1 de Eddy con 1 sola imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 1,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 1,

                        images: [{
                              src: "public/posts/imag-02.jpg",
                              title: "imag-02.jpg",
                              content: "69f",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post2 = await Post.create(
                  {
                        title: "",
                        content: "Publicacion 2 de Eddy con 2 imagenes, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 1,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 1,

                        images: [{
                              src: "public/posts/imag-03.jpg",
                              title: "imag-03.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }, {
                              src: "public/posts/imag-04.jpg",
                              title: "imag-04.jpg",
                              content: "b02",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post3 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 3 de Eddy con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 1,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 1,

                        images: [{
                              src: "public/posts/imag-05.jpg",
                              title: "imag-05.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post4 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 4 de Eddy con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 1,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 1,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post5 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 1 de Jordam con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 2,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 2,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post6 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 1 de Chingo con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 3,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 3,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post7 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 1 de Paola con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 4,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 4,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post8 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 2 de Paola con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 4,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 4,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );

            let post9 = await Post.create(
                  {
                        
                        title: "",
                        content: "Publicacion 3 de Paola con 1 imagen, haciendo pruebas para ver como se ve en el entorno de desarrollo y espero que les guste a todos.",
                        lat: 0,
                        lng: 0,
                        start_at: "2021-12-26 21:47:23",
                        finish_at: "2021-12-26 21:47:23",
                        receptor_type_id: 0,
                        author_ref_id: 4,
                        receptor_ref_id: 0,
                        level_id: 0,
                        post_type_id: 0,
                        created_at: "2021-12-26 21:47:23",
                        updated_at: "2021-12-26 21:47:23",
                        userId: 4,

                        images: [{
                              src: "public/posts/imag-06.jpg",
                              title: "imag-06.jpg",
                              content: "32b",
                              user_id: 0,
                              level_id: 0,
                              album_id: 0,
                              created_at: "2021-12-26 21:47:23",
                              updated_at: "2021-12-26 21:47:23",
                        }],
                        
                  },
                  {
                        include: [
                              {
                                    model: Image,
                              },
                        ],
                  }
            );
      })

      .catch((err) => {
            console.log("No se conecto a la Base de datos.");
      });

// 1a1
// Usuario tiene un Profile
// Añadir una clave forenea userId a la tabla Profile
User.hasOne(Profile);

// Añade una clave userId a la table Profile
Profile.belongsTo(User);


// 1aN
// Uno a muchos, 1 a N
// Un usuario tiene muchos posts
// Se añade una clave usrId a la tabla Posts
User.hasMany(Post);

// Se añade una clave userId a la tabla Posts
Post.belongsTo(User);


// NaN
// Un post pertenece o tiene varias imagenes
// Esto es crear una nueva tabla en la base de datos llamada post_image
// post.addImage post.getImage... etc
Post.belongsToMany(Image, { through: "post_image" });
Image.belongsToMany(Post, { through: "post_image" });


// Follow
// 1aN
// Un usuario va a tener muchos seguidores o seguidos
// Se agrega dos claves ("followed_id", "user_id") a la tabla Follow
User.hasMany(Follow, { foreignKey: "followed_id" });
User.hasMany(Follow, { foreignKey: "user_id" });

// Se añade dos claves ("followed_id", "user_id") a la tabla Follow
Follow.belongsTo(User, { foreignKey: "followed_id" });
Follow.belongsTo(User, { foreignKey: "user_id" });


// 1aN
// Una conversación tiene muchos mensajes
Conversation.hasMany(Message);

// Se añade una clave conversationId a la table Message
Message.belongsTo(Conversation);


// 1aN
User.hasMany(Message);
// Se añade una clave userId en la tabla Message
Message.belongsTo(User);


// 1aN
// Un usuario puede tener muchas conversaciones
User.hasMany(Conversation, {foreignKey: 'sender_id'});
User.hasMany(Conversation, {foreignKey: 'receptor_id'});

// Se añade clave a la table Conversation
Conversation.belongsTo(User, {foreignKey: 'sender_id'});
Conversation.belongsTo(User, {foreignKey: 'receptor_id'});

// 1aN
// Un post tiene muchos comentarios.
// Un usuario tiene muchos comentarios.
// Un comentario puede tener otro comentario (Se guarda el id del comentario superior).

Post.hasMany(Comment);
User.hasMany(Comment);
Comment.hasMany(Comment);

// Se añade una clave postId a la tabla Comment
// Se añade una clave userId a la tabla Comment
// Se añade una clave commentId a la tabla Comment
Comment.belongsTo(Post)
Comment.belongsTo(User);
Comment.belongsTo(Comment);

// EXPORTACION
module.exports = {
      Profile,
      Post,
      User,
      Image,
      Follow,
      Conversation,
      Message,
      Comment
};