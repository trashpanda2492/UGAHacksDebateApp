import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'projects.remove'(projectId) {
    const project = Projects.findOne(projectId);
    Projects.remove(projectId);
  },

  'projects.insert'(data) {
    Projects.insert({
      professor: data.professor,
      name: data.name,
      link: data.link,
      createdAt: new Date(),
      description: data.description,
      deadline: data.deadline,
      min_teammates: data.min_teammates,
      max_teammates: data.max_teammates,
      skills: data.skills,
      ungrouped: data.student_emails,
      groups: [],
    });
  },

  'projects.addGroupToProject'() {

  },

  'projects.removeStudentFromProject'() {

  },

  'projects.removeStudentFromGroup'(student_email, group_title, project_id) {
    Projects.update({_id: project_id, "groups.title": group_title}, {
      $pull:{
        'groups.$.student_emails': student_email
      }
    });

    Projects.update({_id: project_id, "groups.title": group_title}, {
        $pull:{
          "groups.$": {
            "student_emails": {$size: 0}
          }
        }
    });

    Projects.update({_id: project_id}, {
      $push:{
        "ungrouped": student_email
      }
    });
  },

  'projects.addStudentToProject'(student_email, project_id) {
    Projects.update({_id: project_id}, {
      $push:{
        "ungrouped": student_email
      }
    });

  },

  'projects.addStudentToGroup' (student_email, group_title, project_id) {
    Projects.update({_id:idSelector, "groups.title": group_title}, {
      $push:{
        "groups.$.student_emails": student_email
      }
    });

  }

});

export const Projects = new Mongo.Collection('projects');
