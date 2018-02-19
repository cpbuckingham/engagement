exports.seed = function(knex, Promise) {
  return knex("projects").del()
    .then(function() {
      return Promise.all([
        knex("projects").insert({
          id: 1,
          user_id: 1,
          name: "Anthem",
          description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
          status: "closed"
        }),
        knex("projects").insert({
          id: 2,
          user_id: 3,
          name: "American Express",
          description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
          status: "opportunity"
        }),
        knex("projects").insert({
          id: 3,
          user_id: 2,
          name: "Metlife",
          description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
          status: "engagement"
        }),
        knex("projects").insert({
          id: 4,
          user_id: 2,
          name: "Chase Bank",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          status: "closed"
        })
      ]);
    });
};
