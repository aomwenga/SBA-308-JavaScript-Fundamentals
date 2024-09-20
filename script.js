// A CourseInfo object, which looks like this:
// let courseInfo = { id: number, name: string };

// An AssignmentGroup object, which looks like this:

// let assignmentGroup = {
//   id: number,
//   name: string,
// the ID of the course the assignment group belongs to
//   course_id: number,
// the percentage weight of the entire assignment group
//   group_weight: number,
//   assignments: [ {
// "id": number,
// "name": string,
// the due date for the assignment
// "due_at": //Date string,
// the maximum points possible for the assignment
// "points_possible": number,
//   }],
// };

// Each AssignmentInfo object within the assignments array looks like this:

//An array of LearnerSubmission objects, which each look like this:
// let learnerSubmission = {
// "learner_id": number,
// "assignment_id": number,
// "submission": {
//   "submitted_at": //Date string,
//   "score": //number
// }
// }
// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  const result = [];

  // Create list of learner_ids by looping through submissions
  const learners = [];
  for (let i = 0; i < submissions.length; i++) {
    const learnerId = submissions[i].learner_id;
    let learnerExists = false;

    // Check if the learnerId exists in the learners array
    for (let j = 0; j < learners.length; j++) {
      if (learners[j] === learnerId) {
        learnerExists = true;
        break; // Exit loop once we find a match
      }
    }

    // learnerId not in the learners array, add it
    if (!learnerExists) {
      learners.push(learnerId);
    }
  }

  // Process data
  for (let i = 0; i < learners.length; i++) {
    const learnerId = learners[i];
    const learnerData = { id: learnerId, avg: 0 };

    let totalScore = 0;
    let totalPointsPossible = 0;

    // Loop through submissions to find match the current learner
    for (let j = 0; j < submissions.length; j++) {
      if (submissions[j].learner_id === learnerId) {
        const assignmentId = submissions[j].assignment_id;
        const submissionScore = submissions[j].submission.score;

        // find assignment in the AssignmentGroup by looping
        for (let k = 0; k < ag.assignments.length; k++) {
          if (ag.assignments[k].id === assignmentId) {
            const pointsPossible = ag.assignments[k].points_possible;

            // individual assignment score as a percentage
            const percentage = submissionScore / pointsPossible;

            // Store the percentage 
            learnerData[assignmentId] = percentage;

            // Update total score and total points possible 
            totalScore += submissionScore;
            totalPointsPossible += pointsPossible;
          }
        }
      }
    }

    // Calculate the average score for this learner
    if (totalPointsPossible > 0) {
      learnerData.avg = totalScore / totalPointsPossible;
    }

    // Add the learnerData to the result array
    result.push(learnerData);
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// apologies ran out of time. I'll try harder from now on.

// console.log(result);

// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// the ID of the learner for which this data has been collected
// "id": number,

// the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.
// "avg": number,

// console.log(assignments.points_possible);

// each assignment should have a key with its ID,
// and the value associated with it should be the percentage that
// the learner scored on the assignment (submission.score / points_possible)
// <assignment_id>: number,
// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores

// average score with >= total of submitted assignments by learner otherwise error
// check dates of assigmnets
