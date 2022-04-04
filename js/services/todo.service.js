'use strict'
console.log('Hi');

var gTodos = []
_createTodos()

var gFilterBy = ''



function getTodosForDisplay() {
    if (!gFilterBy) return gTodos;
    console.log('here');
    const todos = gTodos.filter(todo => 
        todo.isDone && gFilterBy === 'done' ||!todo.isDone && gFilterBy === 'active')
        console.log(todos);
    return todos
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}
function userMessage(){
    var elMessege = document.querySelector('.messege')
    gTodos.length!==0? elMessege.style.display = 'none':elMessege.style.display= 'block'
  }
function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt,importance) {
    const todo = _createTodo(txt,importance)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}
function sortTodoBy(sortBy){
    
    if(sortBy==='importance') gTodos.sort((a,b)=>{
      return  a.importance-b.importance
    })
    else if(sortBy==='txt') gTodos.sort((a,b)=>{
      return  a.txt-b.txt
    })
    else if(sortBy==='createdAt') gTodos.sort((a,b)=>{
      return  a.createdAt-b.createdAt
    })
    console.log(gTodos);
}
////////////////////////////////////// defult todos on refresh
function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [_createTodo('Do the dishes',1), _createTodo('Learn Javascript',1)]
    }
    gTodos = todos
    _saveTodosToStorage()
}
/////////////////////////////// single todo
function _createTodo(txt,importance) {
    return {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
}
///// refreshes the gTodos array of Objects
function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}
/////// generates random id
function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
