
import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema, "timesheet");

export default Timesheet;