# tech-blog
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Useage](#useage)
  - [Contribute](#contribute)
  - [Test](#test)
  - [Questions](#questions)
  - [License](#license)
  ## Description
  Using mysql, express and handlebars I am recreating a blog site. Upon landing on the page you can view post by all users. If you sign up you can leave a comment and view your dashboard. The dashboard is where you can view all your post.

  This is a screenshot of what to expect from running the get route for categories.
  ![Screenshot](./public/images/tech-blogExample.png)


  This code snippet highlights how a controller is passing the data to the viewer. In this case its passing all the Post found in the database and parsing it to plain text. Once its handed to handlebars "homepage" it loops through the array to display each post. 
  ```javascript
  try {
        const postData = await Post.findAll({

            // include: [{ model: User }, { model: Comment }]
            include: [{ model: User, attributes: ["user_name"] },
            {
                model: Comment, attributes: ["post_text", "created_at"],
                include: [{ model: User, attributes: ["user_name"] }]
            }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);
        console.log("Logged in: " + req.session.logged_in);
        //gives handlebar the posts from the db
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
  }
  ```
  You can view the repo here:
  [Github](https://github.com/johnfrom209/tech-blog)

  ## Installation
  To run this program you will first need to run "npm install" to get the dependencies. Navigate to yor mysql shell and run "source schema.sql". After that go back to your text editor and run "npm run seed". This will populate the db with seeds. Lastly, you will have to run "node server.js" while inside root folder. That is all.
  ## Useage
  
  ## Contribute
  NA
  ## Test
  NA
  ## Questions
  Github repo: [!johnfrom209](https://github.com/johnfrom209)

  linkedin: https://www.linkedin.com/in/johnfrom209/

  ## License
  The license used for this project is MIT. Get more information by checking out the repo.
