import { MediaService } from "@/services/media.service";
import BaseError from "@/utils/base.error";
import { Request, Response, NextFunction } from "express";

export class MediaController {
  private mediaService: MediaService;

  constructor() {
    this.mediaService = new MediaService(); // Khởi tạo service
  }

  async getImageUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.mediaService.getImageUrl();
      res.send_ok("Get image url successfully", result);
    } catch (error) {
      throw new BaseError("UNKNOW", "Get video url failed");
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.send_badRequest("No file uploaded or file is too large.");
    }
    if (!req.params.fileName) {
      return res.send_badRequest("No file name provided.");
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.params.fileName;

      const result = await this.mediaService.uploadImage(
        fileName,
        tempFilePath
      );
      res.send_ok("Upload image successfully", result);
    } catch (error) {
      throw new BaseError("UNKNOWN", "Upload image failed");
    }
  }

  async uploadVideo(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.send_badRequest("No file uploaded or file is too large.");
    }
    if (!req.params.fileName) {
      return res.send_badRequest("No file name provided.");
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.params.fileName;

      const result = await this.mediaService.uploadVideo(
        fileName,
        tempFilePath
      );
      res.send_ok("Upload video successfully", result);
    } catch (error) {
      throw new BaseError("UNKNOWN", "Upload video failed");
    }
  }

  async getVideoUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.mediaService.getVideoUrl();
      res.send_ok("Get video url successfully", result);
    } catch (error) {
      throw new BaseError("UNKNOWN", "Get video url failed");
    }
  }
}
