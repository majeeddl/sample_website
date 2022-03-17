import { Router } from "express";
import { BooksBl } from "../bl/books.bl";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

const router: Router = Router();

const booksBl = new BooksBl();

router.get("/api/v1/books", async (req: IRequest, res: IResponse) => {
  try {
    console.log("read books");
    const books = await booksBl.read({});

    res.json({
      status: true,
      data: books,
    });
  } catch {}
});

router.get("/api/v1/books/:id", async (req: IRequest, res: IResponse) => {
  try {
    console.log("read books");
    const book = await booksBl.readById(req.params.id!);

    res.json({
      status: true,
      data: book,
    });
  } catch {}
});

router.post("/api/v1/books", async (req: IRequest, res: IResponse) => {
  try {
    const { title, description, image, author } = req.body;

    const books = await booksBl.create({
      title,
      description,
      author,
      image,
    });

    res.json({
      status: true,
      data: books,
    });
  } catch {}
});

router.put("/api/v1/books/:id", async (req: IRequest, res: IResponse) => {
  try {
    const { id } = req.params;
    const { title, description, image, author } = req.body;

    const books = await booksBl.update(id, {
      title,
      description,
      author,
      image,
    });

    res.json({
      status: true,
      data: books,
    });
  } catch {}
});

router.delete("/api/v1/books/:id", async (req: IRequest, res: IResponse) => {
  try {
    const { id } = req.params;
    const books = await booksBl.delete(id);

    res.json({
      status: true,
      data: books,
    });
  } catch {}
});

export const BookRouter = router;
