const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var options = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html', 'css'],
  index: false
};

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world' };

app.use(express.static(path.join(__dirname, 'public'), options));

app.get('/', function(req, res) {
  res.render('main');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(app.get('port'), function() {
  console.log('Started on port ' + app.get('port'));
});
