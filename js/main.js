'use strict'

function onInit() {
    console.log('Init')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    const elTodos = document.querySelector('.todo-list')
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
    </li>`)
    elTodos.innerHTML = strHTMLs.join('')

    document.querySelector('.total-count').innerText = getTodosCount()
    document.querySelector('.active-count').innerText = getActiveTodosCount()
    userMessage()

}

function onAddTodo(ev) {
    ev.preventDefault()
    
    const elTxt = ev.target[0]
    const elImportance = ev.target[1]

    
    if(!elTxt.value||elImportance.value <1 ||elImportance.value >3 ){
        elTxt.value = ''
    elImportance.value = ''
        return alert('not valid input!')
    } 
    addTodo(elTxt.value,elImportance.value)
    renderTodos()

    elTxt.value = ''
    elImportance.value = ''
}

function onRemoveTodo(ev, todoId) {
    console.log('Removing', todoId)
    ev.stopPropagation()
    if(!confirm('are u sure?')) return
    removeTodo(todoId)
    renderTodos()
}
function onToggleTodo(todoId) {
    console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering by: ', filterBy);
    setFilter(filterBy)
    renderTodos()
}

function onSetSortTodo(sortBy){
    console.log('sorting by: ',sortBy);
    sortTodoBy(sortBy);
    renderTodos()
}