(function () {
    'use strict';
    var likeComponent = Vue.extend({
        data: function(){
            return {
                count: 0
            }
        },
        template: '<button @click="countUp">Like {{ count }} </button>',
        methods: {
            countUp: function(){
                this.count++;
            }
        }
    }); 
    var vm = new Vue({
        el: '#app',
        data: {
            newItem: '',
            todos: []
        },
        components: {
            'like-component': likeComponent
        },
        watch: {
            todos: {
                handler: function(){
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            AddItem: function(){
                var item = {
                    title: this.newItem,
                    isDone: false
                };
                this.todos.push(item);
                this.newItem = '';
            },
            DeleteItem: function(index) {
                if (confirm('Are you sure?')){
                    this.todos.splice(index, 1);
                }
            },
            purge: function(){
            if (!confirm('delete finished?')) {
                return;
            }
            this.todos = this.remaining;
            }
        },
        computed:{
            remaining: function(){
                return this.todos.filter(function(todo){
                    return !todo.isDone;
                });
            }
        }
        
    });
})();