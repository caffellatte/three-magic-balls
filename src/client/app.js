// public/app.js

// Define a Todo model
var Ball = Backbone.Model.extend({
  defaults: {
    title: "",
    status: "", // dotted dashed solid
  },
});

// Define a collection of Todos
var BallList = Backbone.Collection.extend({
  model: Ball,
});

// Define a view for individual Todo items
var BallView = Backbone.View.extend({
  tagName: "div",
  className: "ball",

  template: _.template("<span><%= title %></span>"),

  events: {
    click: "toggle",
    dblclick: "reset",
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  reset: function () {
    var currentStatus = this.model.get("status");
    this.$el.removeClass(currentStatus);

    this.model.set("status", "");
  },

  toggle: function () {
    var currentStatus = this.model.get("status");
    var newStatus = "";

    switch (currentStatus) {
      case "":
        newStatus = "dotted";
        break;
      case "dotted":
        newStatus = "dashed";
        break;
      case "dashed":
        newStatus = "solid";
        break;
      case "solid":
        newStatus = "dotted";
        break;
    }

    this.model.set("status", newStatus);
    this.$el.removeClass(currentStatus);
    this.$el.addClass(newStatus);
  },
});

// Define the main application view
var AppView = Backbone.View.extend({
  el: "#app",

  events: {
    "click #add-ball": "addBall",
  },

  initialize: function () {
    this.list = this.$("#ball-list");
    this.balls = new BallList();
    this.listenTo(this.balls, "add", this.renderBall);
  },

  addBall: function () {
    var title = Math.round(Math.random() * 100).toString();
    if (title) {
      this.balls.add(new Ball({ title: title }));
    }
  },

  renderBall: function (ball) {
    var view = new BallView({ model: ball });
    this.list.append(view.el);
  },
});

// Start the application
$(function () {
  new AppView();
});
