import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'projects.remove'(projectId) {
        const project = Projects.findOne(projectId);
        Projects.remove(projectId);
    },

    'topics.insert'(data) {
        Topics.insert({
            title: data.title,
            chatrooms: data.chatrooms,
            description: data.description,
            pro: data.pro,
            con: data.con,
        });
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

export const Topics = new Mongo.Collection('topics');