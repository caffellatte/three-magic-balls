// public/app.js

// Define a Todo model
var Todo = Backbone.Model.extend({
  defaults: {
    title: "",
    completed: false,
  },
});

// Define a collection of Todos
var TodoList = Backbone.Collection.extend({
  model: Todo,
  url: "/api/todos", // URL for fetching todos from the server
});

// Define a view for individual Todo items
var TodoView = Backbone.View.extend({
  tagName: "div",
  className: "item",

  template: _.template("<span><%= title %></span>"),

  events: {
    click: "toggleCompleted",
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  toggleCompleted: function () {
    this.model.set("completed", !this.model.get("completed"));
    this.$el.toggleClass("completed", this.model.get("completed"));
  },
});

// Define the main application view
var AppView = Backbone.View.extend({
  el: "#app",

  events: {
    "click #add-todo": "addTodo",
  },

  initialize: function () {
    this.input = this.$("#new-todo");
    this.list = this.$("#todo-list");
    this.todos = new TodoList();
    this.listenTo(this.todos, "add", this.renderTodo);
    this.todos.fetch(); // Fetch todos from the server on initialization
  },

  addTodo: function () {
    var title = this.input.val().trim();
    if (title) {
      this.todos.add(new Todo({ title: title }));
      this.input.val("");
    }
  },

  renderTodo: function (todo) {
    var view = new TodoView({ model: todo });
    this.list.append(view.el);
  },
});

// Start the application
$(function () {
  new AppView();
});
