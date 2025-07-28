import { Request, Response } from "express";
import TicketModel from "./ticket.model";

const CreateTikcet = async (req: Request, res: Response) => {
  try {
    const answers = req.body["answers"].map((i: any) => i);

    const body = {
      imgUrl: `/uploads/${req.file?.filename}`,
      questions: {
        lotin: req.body["questions"]["lotin"],
        rus: req.body["questions"]["rus"],
        krill: req.body["questions"]["krill"],
      },
      answers,
      currentAnswer: Number(req.body.currentAnswer),
      izoh: {
        lotin: req.body["izoh"]["lotin"],
        rus: req.body["izoh"]["rus"],
        krill: req.body["izoh"]["krill"],
      },
    };

    const ticket = await TicketModel.create(body);

    return res
      .status(200)
      .json({ success: true, message: "Ticket created", ticket });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await TicketModel.find({});

    return res
      .status(200)
      .json({ success: true, message: "list of tickets", tickets });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketModel.findOne({
      id: req.params.id,
    });

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "ticket not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "ticket found", ticket });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateTicketById = async (req: Request, res: Response) => {
  try {
    const existingTicket = await TicketModel.findById(req.params.id);
    if (!existingTicket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    const answers = req.body["answers"].map((i: any) => i);

    const questions = {
      lotin: req.body["questions[lotin]"],
      rus: req.body["questions[rus]"],
      krill: req.body["questions[krill]"],
    };

    const imgUrl = req.file
      ? `/uploads/${req.file.filename}`
      : existingTicket.imgUrl;

    const izoh = {
      lotin: req.body["izoh[lotin]"],
      rus: req.body["izoh[rus]"],
      krill: req.body["izoh[krill]"],
    };

    const body = {
      imgUrl,
      questions,
      answers,
      currentAnswer: Number(req.body.currentAnswer),
      izoh: !izoh ? existingTicket.izoh : izoh,
    };

    const updatedTicket = await TicketModel.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Ticket updated",
      ticket: updatedTicket,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketModel.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "ticket not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "ticket deleted", ticket });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  CreateTikcet,
  getTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
