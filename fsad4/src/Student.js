import React from "react";

const studlist = [
  { slno: 1, name: "stud1", usn: "rvce1", tmarks: 150 },
  { slno: 2, name: "stud2", usn: "rvce2", tmarks: 145 }
];

class StudentRow extends React.Component {
  render() {
    const studl = this.props.studli;
    return (
      <tr>
        <td>{studl.slno}</td>
        <td>{studl.name}</td>
        <td>{studl.usn}</td>
        <td>{studl.tmarks}</td>
      </tr>
    );
  }
}
 
class StudentsTable extends React.Component {
  render() {
    const studrows = this.props.studlist.map((studli) => (
      <StudentRow key={studli.slno} studli={studli} />
    ));
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Student Name</th>
            <th>USN</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>{studrows}</tbody>
      </table>
    );
  }
}

class StudentAddSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.studAdd;
    const studli = {
      name: form.name.value,
      usn: form.usn.value,
      tmarks: form.tmarks.value,
    };
    console.log("studli - ", studli);
    this.props.CreateStudentAdd(studli);
    form.name.value = "";
    form.usn.value = "";
    form.tmarks.value = "";
  }

  render() {
    return (
      <form name="studAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" /><br />
        <input type="text" name="usn" placeholder="USN" /><br />
        <input type="text" name="tmarks" placeholder="Total Marks" /><br />
        <button>Add</button>
      </form>
    );
  }
}

class StudentListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newStudList: [] };
    this.CreateStudentAdd = this.CreateStudentAdd.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ newStudList: studlist });
    }, 5000);
    console.log("i have loaded the student add component also");
  }

  CreateStudentAdd(studli) {
    const studlength = this.state.newStudList.length + 1;
    studli.slno = studlength;
    const newstudlist1 = this.state.newStudList.slice();
    newstudlist1.push(studli);
    this.setState({ newStudList: newstudlist1 });
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <StudentsTable studlist={this.state.newStudList} />
        <hr />
        <StudentAddSubmit CreateStudentAdd={this.CreateStudentAdd} />
      </React.Fragment>
    );
  }
}

export default StudentListTable;