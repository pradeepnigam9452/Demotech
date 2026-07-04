const mongoose = require("mongoose");

const RunningProject = require(
  "../models/RunningProject"
);
const Staff = require("../models/Staff");

module.exports.createRunningProject = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      clientName,
      projectUrl,
      githubUrl,
      startDate,
      deadline,
      priority,
      status,
      technologies,
    } = req.body;


    if (
      !title ||
      !description ||
      !startDate 
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, start date and deadline are required",
      });
    }


    const project =
      await RunningProject.create({
        title,

        description,

        clientName:
          clientName || "",

        projectUrl:
          projectUrl || "",

        githubUrl:
          githubUrl || "",

        startDate,

        deadline,

        priority:
          priority || "Medium",

        status:
          status || "Planning",

        technologies:
          Array.isArray(technologies)
            ? technologies
            : [],

        createdBy:
          req.user.id,
      });


    return res.status(201).json({
      success: true,

      message:
        "Running project created successfully",

      data:
        project,
    });

  } catch (error) {

    console.error(
      "Create project error:",
      error
    );


    return res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

module.exports.getAllRunningProjects = async (req, res) => {
  try {
    const projects = await RunningProject.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error(
      "Get running projects error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getRunningProjectById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid running project ID",
      });
    }

    const project =
      await RunningProject.findById(id)
        .populate(
          "createdBy",
          "name email"
        );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Running project not found",
      });
    }

    const staffList =
      await Staff.find({
        "runningProjects.project": id,
      }).select(
        "name email staffId designation category profileImage runningProjects"
      );

    const assignments =
      staffList.map((staff) => {
        const assignment =
          staff.runningProjects.find(
            (item) =>
              item.project.toString() ===
              id.toString()
          );

        return {
          staff: {
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            staffId: staff.staffId,
            designation:
              staff.designation,
            category:
              staff.category,
            profileImage:
              staff.profileImage,
          },

          assignmentId:
            assignment?._id,

          status:
            assignment?.status,

          adminMessage:
            assignment?.adminMessage,

          staffResponse:
            assignment?.staffResponse,

          requestedAt:
            assignment?.requestedAt,

          respondedAt:
            assignment?.respondedAt,

          removedAt:
            assignment?.removedAt,
        };
      });

    return res.status(200).json({
      success: true,

      data: {
        project,
        assignments,
      },
    });
  } catch (error) {
    console.error(
      "Get running project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.updateRunningProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      clientName,
      projectUrl,
      githubUrl,
      startDate,
      deadline,
      priority,
      status,
      technologies,
    } = req.body;

    const project = await RunningProject.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Running project not found",
      });
    }

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (clientName !== undefined) {
      project.clientName = clientName;
    }

    if (projectUrl !== undefined) {
      project.projectUrl = projectUrl;
    }

    if (githubUrl !== undefined) {
      project.githubUrl = githubUrl;
    }

    if (startDate !== undefined) {
      project.startDate = startDate;
    }

    if (deadline !== undefined) {
      project.deadline = deadline;
    }

    if (priority !== undefined) {
      project.priority = priority;
    }

    if (status !== undefined) {
      project.status = status;
    }

    if (technologies !== undefined) {
      project.technologies = Array.isArray(technologies)
        ? technologies
        : [];
    }

    await project.save();

    const updatedProject = await RunningProject.findById(
      project._id
    ).populate(
      "createdBy",
      "name email"
    );

    return res.status(200).json({
      success: true,
      message: "Running project updated successfully",
      data: updatedProject,
    });

  } catch (error) {
    console.error(
      "Update running project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports.deleteRunningProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await RunningProject.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Running project not found",
      });
    }

    // Remove deleted project from every staff member
    await Staff.updateMany(
      {
        "runningProjects.project": id,
      },
      {
        $pull: {
          runningProjects: {
            project: id,
          },
        },
      }
    );

    // Delete running project
    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Running project deleted and removed from all staff members successfully",
    });
  } catch (error) {
    console.error("Delete running project error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports.assignProjectToStaff = async (
  req,
  res
) => {
  try {
    const { projectId } = req.params;

    const {
      staffId,
      adminMessage,
    } = req.body;

    if (!staffId) {
      return res.status(400).json({
        success: false,
        message:
          "Staff ID is required",
      });
    }

    const project =
      await RunningProject.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Running project not found",
      });
    }

    const staff =
      await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message:
          "Staff member not found",
      });
    }

    const existingAssignment =
      staff.runningProjects.find(
        (item) =>
          item.project.toString() ===
          projectId.toString()
      );

    if (existingAssignment) {
      if (
        existingAssignment.status ===
        "Pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Assignment request already pending",
        });
      }

      if (
        existingAssignment.status ===
        "Accepted"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Project already assigned to this staff member",
        });
      }

      // Reassign after rejected or removed
      existingAssignment.status =
        "Pending";

      existingAssignment.adminMessage =
        adminMessage || "";

      existingAssignment.staffResponse =
        "";

      existingAssignment.assignedBy =
        req.user.id;

      existingAssignment.requestedAt =
        new Date();

      existingAssignment.respondedAt =
        null;

      existingAssignment.removedAt =
        null;

      await staff.save();

      return res.status(200).json({
        success: true,
        message:
          "Project assignment request sent again",
        data: existingAssignment,
      });
    }

    staff.runningProjects.push({
      project: projectId,

      status: "Pending",

      adminMessage:
        adminMessage || "",

      assignedBy:
        req.user.id,

      requestedAt:
        new Date(),
    });

    await staff.save();

    const updatedStaff =
      await Staff.findById(
        staff._id
      ).populate({
        path: "runningProjects.project",

        select:
          "title description clientName startDate deadline priority status technologies",
      });

    return res.status(201).json({
      success: true,
      message:
        "Project assignment request sent successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error(
      "Assign project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.getMyProjectRequests = async (
  req,
  res
) => {
  try {
    const staff = await Staff.findById(
      req.user.id
    ).populate({
      path:
        "runningProjects.project",

      select:
        "title description clientName projectUrl githubUrl startDate deadline priority status technologies",
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      count:
        staff.runningProjects.length,
      data:
        staff.runningProjects,
    });
  } catch (error) {
    console.error(
      "Get project request error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.respondToProjectRequest = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { action, staffResponse } = req.body;

    const normalizedAction = action?.toLowerCase();

    if (!["accept", "reject"].includes(normalizedAction)) {
      return res.status(400).json({
        success: false,
        message: "Action must be accept or reject",
      });
    }

    const staff = await Staff.findById(req.user.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const assignment = staff.runningProjects.id(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Project assignment request not found",
      });
    }

    // ============================
    // ACCEPT
    // Pending -> Accepted
    // Rejected -> Accepted
    // ============================

    if (normalizedAction === "accept") {
      if (
        !["Pending", "Rejected"].includes(
          assignment.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Cannot accept request with status ${assignment.status}`,
        });
      }

      assignment.status = "Accepted";

      assignment.staffResponse =
        staffResponse || "Project accepted";

      assignment.respondedAt = new Date();

      assignment.removedAt = null;

      await staff.save();

      return res.status(200).json({
        success: true,
        message: "Project accepted successfully",
        data: assignment,
      });
    }

    // ============================
    // REJECT
    // Pending -> Rejected
    // Accepted -> Rejected
    // ============================

    if (normalizedAction === "reject") {
      if (
        !["Pending", "Accepted"].includes(
          assignment.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Cannot reject request with status ${assignment.status}`,
        });
      }

      assignment.status = "Rejected";

      assignment.staffResponse =
        staffResponse || "Project rejected";

      assignment.respondedAt = new Date();

      await staff.save();

      return res.status(200).json({
        success: true,
        message: "Project rejected successfully",
        data: assignment,
      });
    }
  } catch (error) {
    console.error("Project response error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.unassignStaffFromProject = async (
  req,
  res
) => {
  try {
    const {
      projectId,
      staffId,
    } = req.params;

    const project =
      await RunningProject.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Running project not found",
      });
    }

    const staff =
      await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message:
          "Staff member not found",
      });
    }

    const assignment =
      staff.runningProjects.find(
        (item) =>
          item.project.toString() ===
          projectId.toString()
      );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message:
          "Project assignment not found",
      });
    }

    if (
      assignment.status !== "Accepted"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only accepted project can be removed",
      });
    }

    assignment.status = "Removed";
    assignment.removedAt = new Date();

    await staff.save();

    return res.status(200).json({
      success: true,
      message:
        "Project removed from staff successfully",
      data: assignment,
    });
  } catch (error) {
    console.error(
      "Unassign staff error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.deleteAssignmentRequest = async (
  req,
  res
) => {
  try {
    const {
      staffId,
      assignmentId,
    } = req.params;

    const staff =
      await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message:
          "Staff member not found",
      });
    }

    const assignment =
      staff.runningProjects.id(
        assignmentId
      );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message:
          "Assignment request not found",
      });
    }

    staff.runningProjects.pull(
      assignmentId
    );

    await staff.save();

    return res.status(200).json({
      success: true,
      message:
        "Assignment request deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete assignment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================================
// STAFF GET MY ACCEPTED RUNNING PROJECTS
// ======================================================
module.exports.getMyRunningProjects = async (
  req,
  res
) => {
  try {
    const staff = await Staff.findById(
      req.user.id
    ).populate({
      path: "runningProjects.project",

      select:
        "title description clientName projectUrl githubUrl startDate deadline priority status technologies createdAt updatedAt",
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const acceptedProjects =
      staff.runningProjects.filter(
        (item) =>
          item.status === "Accepted" &&
          item.project
      );

    return res.status(200).json({
      success: true,

      count:
        acceptedProjects.length,

      data:
        acceptedProjects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.addProjectWorkUpdate = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const {
      description,
      hoursWorked,
      workStatus,
    } = req.body;

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Work description is required",
      });
    }

    const staff = await Staff.findById(req.user.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    const assignment =
      staff.runningProjects.id(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Project assignment not found",
      });
    }

    if (assignment.status !== "Accepted") {
      return res.status(400).json({
        success: false,
        message:
          "You can add work updates only for accepted projects",
      });
    }

    // IMPORTANT FIX
    if (!Array.isArray(assignment.workUpdates)) {
      assignment.workUpdates = [];
    }

    assignment.workUpdates.push({
      description: description.trim(),

      hoursWorked:
        Number(hoursWorked) || 0,

      workStatus:
        workStatus || "In Progress",

      date: new Date(),
    });

    await staff.save();

    const newUpdate =
      assignment.workUpdates[
        assignment.workUpdates.length - 1
      ];

    return res.status(201).json({
      success: true,
      message:
        "Project work update added successfully",
      data: newUpdate,
    });
  } catch (error) {
    console.error(
      "Add project work update error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.removeProjectFromStaff = async (req, res) => {
  try {
    const { staffId, projectId } = req.params;

    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    const assignment = staff.runningProjects.find(
      (item) =>
        item.project.toString() ===
        projectId.toString()
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Project assignment not found",
      });
    }

    assignment.status = "Removed";
    assignment.removedAt = new Date();

    await staff.save();

    return res.status(200).json({
      success: true,
      message: "Employee removed from project successfully",
      data: assignment,
    });
  } catch (error) {
    console.error(
      "Remove employee from project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};