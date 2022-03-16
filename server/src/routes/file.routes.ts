import { Router } from "express";
import { GridFSBucket } from "mongodb";
import multer,{ diskStorage } from "multer";

import { createReadStream, existsSync, mkdirSync, unlinkSync } from "fs";

import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";
import { v1, v4 } from "uuid";
import { Database } from "../database/database";

const router = Router();

router.post("api/v1/file", async (req: IRequest, res: IResponse) => {
  try {
    const _path = "./upload/";

    if (!existsSync(_path)) {
      mkdirSync(_path);
    }

    let fileName = v1();
    let originalName = "";

    let storage = diskStorage({
      destination: (req, file, cb) => {
        cb(null, _path);
      },
      filename: function (req, file, cb) {
        if (req.params.type == "image") {
          if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
          ) {
            if (file.mimetype == "image/jpeg") {
              fileName = fileName + ".jpeg";
            } else if (file.mimetype == "image/jpg") {
              fileName = fileName + ".jpg";
            } else if (file.mimetype == "image/png") {
              fileName = fileName + ".png";
            }
            cb(null, fileName);
          } else {
            cb(new Error("mimetype"), "mime type is not correct");
          }
        } else {
          originalName = file.originalname;
          const splitted = originalName.split(".");
          fileName = fileName + "." + splitted[splitted.length - 1];
          cb(null, fileName);
        }
      },
    });

    let upload: any = multer({
      storage: storage,
      limits: {
        //10 MEGA Byte
        fileSize: 10485760,
      },
    });


upload.any()(req, res, async (err:any)=> {
            if(err){
                let message = "";
                let result = -1;
                if (err.code == 'LIMIT_FILE_SIZE') {
                    message = "file size should be less than 10 megabyte"
                } else if (err == "mimetype") {
                    message = "file type is not correct";
                }

                res.json({
                    result: result,
                    type: "error",
                    message: message
                });

            }else{

                let token = v4();
                const database = new Database();
                const db = await database.getMongoDb();

                const bucket = new GridFSBucket(db);

                  createReadStream(_path + fileName)
                    .pipe(
                      bucket.openUploadStream(fileName, {
                        metadata: {
                          type: req.params.type,
                          originalName: originalName,
                          token: token,
                        },
                      })
                    )
                    .on("error", function (error: any) {
                      db.close();

                      unlinkSync(_path + fileName);

                      res.json({
                        result: -1,
                        type: "error",
                        title: "",
                        message: "",
                      });
                    })
                    .on("finish", function () {
                      db.close();

                      unlinkSync(_path + fileName);
                      res.json({
                        status: true,
                        result: 0,
                        type: "success",
                        message: "file is uploaded successfully",
                        originalName: originalName,
                        fileName: fileName,
                        token: token
                      });
                    });
      
            }});

  } catch {}



});

export const FileRouter = router;
