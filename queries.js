
// Users data //

db.users.insertMany([
  {
			userId: 1,
			name: "John Cena",
			email: "johncena@wwe.com",
			mentorId: 1
  },
  {
			userId: 2,
			name: "Rey Mysterio",
			email: "reymysterio@wwe.com",
			mentorId: 2
	},
  {
			userId: 3,
			name: "The Undertaker",
			email: "theundertaker@wwe.com",
			mentorId: 3
	},
  {
			userId: 4,
			name: "Big Show",
			email: "bigshow@wwe.com",
			mentoId: 3
  },
  {
			userId: 5,
			name: "Triple H",
			email: "tripleh@wwe.com",
			mentorId: 1
  },
  
])

// Codekata data //

db.codekata.insertMany([
  {
  		userId: 1,
			solvedProblems: 50
  },
  {
			userId: 2,
			solvedProblems: 77
	},
  {
			userId: 3,
			solvedProblems: 10
  },
  {
			userId: 4,
			solvedProblems: 20
  },
  {
			userId: 5,
			solvedProblems: 30
	}
])


// Attendance data //

db.attendance.insertMany([
    {
        userId: 1,
        topicId: 1,
        attended: true
    },
    {
        userId: 2,
        topicId: 2,
        attended: false
    },
    {
        userId: 3,
        topicId: 3,
        attended: false
    },
    {
        userId: 4,
        topicId: 4,
        attended: true
    },
    {
        userId: 5,
        topicId: 5,
        attended: true
    },
])


// Topics Data //

db.topics.insertMany([
    {
        topicId: 1,
        topic: "Javascript",
        topicDate: new Date("2020-10-5"),
    },
    {
        topicId: 2,
        topic: "HTML",
        topicDate: new Date("2020-10-10"),
    },
    {
        topicId: 3,
        topic: "CSS",
        topicDate: new Date("2020-10-15"),
    },
    {
        topicId: 4,
        topic: "React",
        topicDate: new Date("2020-10-20"),
    },
    {
        topicId: 5,
        topic: "MongoDB",
        topicDate: new Date("2020-10-25"),
    },
])


// Tasks Data //

db.tasks.insertMany([
    {
        taskId: 1,
        topicId: 1,
        userId: 1,
        taskName: "Javascript Task",
        dueDate: new Date("2020-10-5"),
        submitted: true
    },
    {
        taskId: 2,
        topicId: 2,
        userId: 2,
        taskName: "HTML Task",
        dueDate: new Date("2020-10-10"),
        submitted: false
    },
    {
        taskId: 3,
        topicId: 3,
        userId: 3,
        taskName: "CSS Task",
        dueDate: new Date("2020-10-15"),
        submitted: true
    },
    {
        taskId: 4,
        topicId: 4,
        userId: 4,
        taskName: "React Task",
        dueDate: new Date("2020-10-20"),
        submitted: false
    },
    {
        taskId: 5,
        topicId: 5,
        userId: 5,
        taskName: "MongoDB Task",
        dueDate: new Date("2020-10-25"),
        submitted: true
    },
])


// Company Drives Data //

db.companyDrives.insertMany([
    {
        userId: 1,
        driveDate: new Date("2020-10-04"),
        company: "Google"
    },
    {
        userId: 2,
        driveDate: new Date("2020-10-06"),
        company: "Microsoft"
    },
    {
        userId: 3,
        driveDate: new Date("2020-10-12"),
        company: "Apple"
    },
    {
        userId: 4,
        driveDate: new Date("2020-10-20"),
        company: "Amazon"
    },
    {
        userId: 5,
        driveDate: new Date("2020-10-24"),
        company: "Twitter"
    },
])

      // Mentors Data //

db.mentors.insertMany([
    {
        mentorId: 1,
        mentorName: "Brock Lesnar",
        mentorEmail: "brocklesnar@wwe.com",
        menteeCount: 15
    },
    {
        mentorId: 2,
        mentorName: "The Rock",
        mentorEmail: "therock@wwe.com",
        menteeCount: 10
    },
    {
        mentorId: 3,
        mentorName: "Jeff Hardy",
        mentorEmail: "jeffhardy@wwe.com",
        menteeCount: 20
    },
    {
        mentorId: 4,
        mentorName: "Gold Berg",
        mentorEmail: "goldberg@wwe.com",
        menteeCount: 14
    },
    {
        mentorId: 5,
        mentorName: "Steve Austin",
        mentorEmail: "stonecold@wwe.com",
        menteeCount: 35
    },
])

//----------------------------------------------------------------------------------------------------------------//

// 1. Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([
  {
			$lookup: {
									from: "tasks",
									localField: "topicId",
									foreignField: "taskId",
									as: "Tasks"
							 }
  },
  {
    	$match: {
									topicDate: {
																$gte: ISODate("2020-10-01"),
																$lte: ISODate("2020-10-31")	
														 }
							}
	}
])


// 2.  Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.companyDrives.find(
  {
    driveDate: {
									$gte: ISODate("2020-10-15"),
									$lte: ISODate("2020-10-31")
							 }
  }
)


// 3.  Find all the company drives and students who are appeared for the placement

db.companyDrives.aggregate([
  {
		$lookup: {
								from: "users",
								localField: "userId",
								foreignField: "userId",
								as: "Students"
						 }
	},
  {
		$project: {
								_id: 0,
								company: 1,
								"Students.userId": 1,
								"Students.name": 1,
								"Students.email": 1,
							}
  }
])


// 4.  Find the number of problems solved by the user in codekata

db.codekata.aggregate([
  {
		$lookup: {
								from: "users",
								localField: "userId",
								foreignField: "userId",
								as: "Problems_Solved"
						 }
  },
  {
		$project: {
								_id: 0,
								userId: 1,
								solvedProblems: 1,
								"Problems_Solved.name": 1
							}
  }
])



// 5.  Find all the mentors with who has the mentee's count more than 15

db.mentors.find({
			menteeCount: { $gt: 15 }
})


// 6.  Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020


db.attendance.aggregate([
    {
      $lookup: {
        from: "topics",
        localField: "topicId",
        foreignField: "topicId",
        as: "Topic",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "topicId",
        foreignField: "topicId",
        as: "Tasks",
      },
    },
    { $match: { $and: [{ attended: false }, { "Tasks.submitted": false }] } },
    {
      $match: {
        $and: [
          {
            $or: [
              { "Topics.topicDate": { $gte: ISODate("2020-10-15") , $lte: ISODate("2020-10-31") } }
               ],
          },
          {
            $or: [
              { "Tasks.dueDate": { $gte: ISODate("2020-10-15") , $lte: ISODate("2020-10-31") } },
               ],
          },
        ],
      },
    },
    {
      $count: "Absentees",
    },
  ]);
