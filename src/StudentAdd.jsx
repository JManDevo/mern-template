export default class StudentAdd extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.studentAdd;
        this.props.createStudent({
            belt: form.belt.value,
            name: form.name.value,
            appearances: form.appearances.value,
        });
        form.name.value = "";
        form.belt.value = "";
        form.appearances.value = "";
    }

    render () {
        return (
            <div>
                <form name="studentAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Students Name" />
                    <select name="belt">
                        <option value="">--- SELECT A GRADE ---</option>
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                    </select>
                    <input type="text" name="appearances" placeholder="Students Appearances" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}