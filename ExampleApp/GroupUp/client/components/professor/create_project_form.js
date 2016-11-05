import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import SkillsList from './skills_list';

let studentCSV = null;

export default class CreateProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = { skills: [] };
  }

  addSkill(e) {
    e.preventDefault();
    const allSkills = this.state.skills.concat([{text: this.refs.relevantSkills.value, id: Date.now() }]);
    this.refs.relevantSkills.value = '';
    this.setState({ skills: allSkills });
  }

  removeSkill(id) {
    const allSkills = this.state.skills;
    const index = allSkills.map((x) => {return x.id;}).indexOf(id);
    allSkills.splice(index, 1);
    this.setState({ skills: allSkills });
  }

  uploadCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      Meteor.call('parseCSV', reader.result, function(e, result) {
        studentCSV = result;
        console.log(studentCSV);
      });
    }
    reader.readAsText(file);
  }

  createGroup(e) {
    e.preventDefault();
    this.emails = studentCSV;
    //TODO map though the skills and pulling the text
    Meteor.call('projects.insert', {
      professor: Meteor.userId(),
      name: this.refs.name.value,
      description: this.refs.description.value,
      deadline: this.refs.deadline.value,
      min_teammates: this.refs.teammatesMin.value,
      max_teammates: this.refs.teammatesMax.value,
      skills: this.state.skills,
      student_emails: studentCSV,
    });
    browserHistory.push('/confirmation-create-project');
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-6">
            <Link to="/professor-dashboard">
              <button
                className="btn btn-raised btn-default">
                &larr; Back
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Once you create this new class, students will be able to group up together.</h4>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>Create a New Class Project</h3>
              </div>
              <div className="panel-body">
                <form className="col-sm-8 col-center">
                  <div className="form-group">
                    <label>Project Name:</label>
                    <input className="form-control" ref="name" />
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" ref="description" rows="3" />
                  </div>

                  <div className="form-group">
                    <label>Group Formation Deadline (mm/dd/yyyy):</label>
                    <input className="form-control" ref="deadline" />
                  </div>

                  <div className="form-group">
                  <label>Acceptable # of Teammates:</label>
                  <div className="row">
                    <div className="col-sm-5">
                      <input className="form-control" ref="teammatesMin" placeholder="Min teammates..."  />
                    </div>
                    <div className="col-sm-2">
                      <span>to</span>
                    </div>
                    <div className="col-sm-5">
                      <input className="form-control" ref="teammatesMax" placeholder="Max teammates..."  />
                    </div>
                  </div>
                  </div>

                  <div className="form-group">
                    <label>Relevant Skills Each Team Should Have:</label>
                    <p>Add some skills that would help students in this project. When joining this project, students will be able to check off which of these skills they have, to better balance teams.</p>
                    <div className="row">
                      <div className="col-sm-10">
                        <input className="form-control" ref="relevantSkills" placeholder="Skill name..."  />
                      </div>
                      <div className="col-sm-2">
                        <button
                          onClick={this.addSkill.bind(this)}
                          className="btn btn-raised btn-default float-right">
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <SkillsList
                          ref="skillsList"
                          skills={ this.state.skills }
                          removeSkill={ this.removeSkill.bind(this) }
                        />
                        {/*Add in a title and a button for each skill. See tutorial.*/}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Import Students Into Project (optional):</label>
                    <p>Create a CSV file with a single column containing the email addresses of students who will be allowed to use this website. In excel, you can save a spreadsheet as a CSV.</p>
                    <p>You can skip this step and manually add student emails, or upload the CSV later.</p>
                  </div>
                  <input onChange={this.uploadCSV.bind(this)} type="file" accept=".csv" />

                  <div className="form-group">
                    <hr />
                    <div className="row">
                      <div className="col-sm-6">
                        <Link to="/professor-dashboard">
                          <button
                            className="btn btn-raised btn-danger btn-block">
                            CANCEL
                          </button>
                        </Link>
                      </div>
                      <div className="col-sm-6">
                        <button
                          onClick={this.createGroup.bind(this)}
                          className="btn btn-raised btn-default btn-block">
                          CREATE GROUP
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
