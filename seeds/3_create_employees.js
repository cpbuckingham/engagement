exports.seed = function(knex, Promise) {
  return knex("employees").del()
    .then(function() {
      return Promise.all([
        knex("employees").insert({
          id: 1,
          first_name: "Jon",
          last_name: "Reed",
          username: "jreed",
          email: "client1@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 1,
          avatar: "https://octodex.github.com/images/droidtocat.png"
        }),
        knex("employees").insert({
          id: 2,
          first_name: "Andrew",
          last_name: "Pearson",
          username: "apearson",
          email: "client2@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 1,
          avatar: "https://octodex.github.com/images/twenty-percent-cooler-octocat.png"
        }),
        knex("employees").insert({
          id: 3,
          first_name: "Rita",
          last_name: "Butcher",
          username: "rbutcher",
          email: "client3@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 1,
          avatar: "https://octodex.github.com/images/poptocat_v2.png"
        }),
        knex("employees").insert({
          id: 4,
          first_name: "Bruce",
          last_name: "Learner",
          username: "blearner",
          email: "client4@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 3,
          project_id: 1,
          avatar: "https://octodex.github.com/images/luchadortocat.png"
        }),
        knex("employees").insert({
          id: 5,
          first_name: "Joe",
          last_name: "Ripper",
          username: "jripper",
          email: "client5@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 2,
          avatar: "https://octodex.github.com/images/gobbleotron.gif"
        }),
        knex("employees").insert({
          id: 6,
          first_name: "Jack",
          last_name: "Zhang",
          username: "jzhang",
          email: "client6@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 2,
          avatar: "https://octodex.github.com/images/privateinvestocat.jpg"
        }),
        knex("employees").insert({
          id: 7,
          first_name: "Layne",
          last_name: "McNish",
          username: "lmcnish",
          email: "client7@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 1,
          project_id: 3,
          avatar: "https://octodex.github.com/images/gracehoppertocat.jpg"
        }),
        knex("employees").insert({
          id: 8,
          first_name: "Claire",
          last_name: "Jones",
          username: "cjones",
          email: "client8@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 1,
          project_id: 3,
          avatar: "https://octodex.github.com/images/hanukkat.png"
        }),
        knex("employees").insert({
          id: 9,
          first_name: "Dean",
          last_name: "Morrow",
          username: "dmorrow",
          email: "client9@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 3,
          avatar: "https://octodex.github.com/images/mcefeeline.jpg"
        }),
        knex("employees").insert({
          id: 10,
          first_name: "Angela",
          last_name: "Hart",
          username: "ahart",
          email: "client10@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 3,
          project_id: 3,
          avatar: "https://octodex.github.com/images/maxtocat.gif"
        }),
        knex("employees").insert({
          id: 11,
          first_name: "Sanjay",
          last_name: "Gupta",
          username: "sgupta",
          email: "client11@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 2,
          project_id: 3,
          avatar: "https://octodex.github.com/images/dinotocat.png"
        }),
        knex("employees").insert({
          id: 12,
          first_name: "Frank",
          last_name: "Fork",
          username: "ffork",
          email: "client12@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 1,
          project_id: 4,
          avatar: "https://octodex.github.com/images/adventure-cat.png"
        }),
        knex("employees").insert({
          id: 13,
          first_name: "Yuri",
          last_name: "Steinschreiber",
          username: "ystein",
          email: "client13@gmail.com",
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          user_id: 3,
          project_id: 1,
          avatar: "https://octodex.github.com/images/carlostocat.gif"
        })
      ]);
    });
};
