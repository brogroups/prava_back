import { model, Schema } from "mongoose";

const TicketSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    questions: {
      lotin: { type: String },
      rus: { type: String },
      krill: { type: String },
    },
    answers: [
      {
        lotin: { type: String },
        krill: { type: String },
        rus: { type: String },
      },
      {
        lotin: { type: String },
        krill: { type: String },
        rus: { type: String },
      },
    ],
    izoh: {
      lotin: { type: String },
      krill: { type: String },
      rus: { type: String },
    },
    currentAnswer: { type: Number },
  },
  { timestamps: true }
);

const TicketModel = model("ticket", TicketSchema);
export default TicketModel;
