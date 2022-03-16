
import { Router } from "express";
import { BooksBl } from "../bl/books.bl";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

const router: Router = Router();

const booksBl= new BooksBl()

router.get('/api/v1/books',async (req:IRequest,res:IResponse)=>{
    try{

            const books = await booksBl.read({});

            res.json({
                status : true,
                data : books
            })
        
    }catch{

    }
})

export const BookRouter = router;