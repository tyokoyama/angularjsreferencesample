describe('ToDo Application', function() {
	var input;
	var todos;

	beforeEach(function () {
		browser.get('/1131/index.html');
		input = element(by.model('inputText'));

		todos = element.all(by.repeater('todo in todos'));
	});

	it('ToDoが追加できる', function() {
		expect(todos.count()).toEqual(0);

		input.sendKeys('new task!\n');

		expect(todos.count()).toEqual(1);
		expect(todos.get(0).getText()).toEqual('new task!');
	});
})