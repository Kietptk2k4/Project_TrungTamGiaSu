package com.trungtangiasu.server.services;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public ImageUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) throws IOException {
        File uploadedFile = File.createTempFile("temp", file.getOriginalFilename());
        file.transferTo(uploadedFile);

        Map<?, ?> result = cloudinary.uploader().upload(
            uploadedFile,
            ObjectUtils.asMap(
                "folder", "NMCNPM" 
            )
        ); 
        return result.get("secure_url").toString();
    }
}
